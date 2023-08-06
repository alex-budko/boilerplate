import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, updateDoc, doc, increment } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import JSZip from "jszip";
import {
  Box,
  Textarea,
  Button,
  Spinner,
  VStack,
  Wrap,
  Center,
  Alert,
  AlertIcon,
  useToast,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
} from "@chakra-ui/react";
import { frameworks } from "../data/frameworks";
import { animated, useSpring } from "react-spring";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import "firebase/auth";
import { saveAs } from "file-saver";
import { io, Socket } from "socket.io-client";

interface FileResult {
  filename: string;
  content: string;
}

interface QuestionPromptData {
  output: string;
}

const Generate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userResponse, setUserResponse] = useState("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "Any",
  ]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [codeResults, setCodeResults] = useState<FileResult[]>([]);
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);
  const [outputBuffer, setOutputBuffer] = useState<string>("");
  const toast = useToast();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [user, load, error] = useAuthState(auth);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    setSocket(newSocket);

    newSocket.on("question_prompt", (data: QuestionPromptData) => {
      console.log(data);
      setOutputBuffer(data.output);
      setUserResponse("");
      onOpen();
    });

    newSocket.on("terminal_output", (data: { step: number }) => {
      setProgress(data.step);
    });

    return () => {
      newSocket.disconnect();
      return undefined;
    };
  }, []);

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleFrameworkSelect = (framework: string) => {
    if (framework === "Any") {
      setSelectedFrameworks(["Any"]);
    } else if (selectedFrameworks.includes(framework)) {
      setSelectedFrameworks(selectedFrameworks.filter((f) => f !== framework));
    } else {
      setSelectedFrameworks([
        ...selectedFrameworks.filter((f) => f !== "Any"),
        framework,
      ]);
    }
  };

  const props = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: showResults
      ? { opacity: 1, transform: "translate3d(0,0px,0)" }
      : { opacity: 0, transform: "translate3d(0,-40px,0)" },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists() && docSnap.data()?.tokens > 0) {
        setShowResults(false);
        setLoading(true);
        setShowUploadButton(false);

        const response = await fetch("http://localhost:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            frameworks: selectedFrameworks,
            projectName: projectName.toLowerCase(),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCodeResults(data.codeResults[0].files);
          setShowResults(true);
          setShowUploadButton(true);

          await updateDoc(userRef, {
            tokens: increment(-1),
          });
          toast({
            title: "Code Generated Successfully",
            description: "1 Token Removed",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "An error occurred.",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setLoading(false);
      } else {
        toast({
          title: "Not enough tokens.",
          description: "You need at least 1 token to generate code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "User not authenticated.",
        description: "Please login to generate code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const uploadFilesToRepo = async (
    token: string,
    files: FileResult[],
    repoName: string
  ) => {
    for (const file of files) {
      try {
        const content = btoa(file.content);
        const user = auth.currentUser;

        if (!user) {
          console.error("No authenticated user");
          return;
        }

        if (token) {
          try {
            const response = await axios.get("https://api.github.com/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const username = response.data.login;

            await axios.put(
              `https://api.github.com/repos/${username}/${repoName}/contents/${file.filename}`,
              {
                message: `commit from firebase app`,
                content: content,
                committer: {
                  name: user.displayName,
                  email: user.email,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                  Accept: "application/vnd.github+json",
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              }
            );

            console.log(`Uploaded ${file.filename}`);
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(`Error uploading ${file.filename}`, error);
      }
    }
  };

  const createRepoAndUploadFiles = async (
    token: string,
    files: FileResult[],
    repoName: string
  ) => {
    try {
      const repo = await axios.post(
        `https://api.github.com/user/repos`,
        {
          name: repoName,
          description: "Testing Boilerplate repo",
          homepage: "https://github.com",
          private: false,
          is_template: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      setTimeout(() => uploadFilesToRepo(token, files, repoName), 1000);
    } catch (error) {
      console.error("Error creating new repository", error);
    }
  };

  const handleGitHubAction = async () => {
    setShowUploadButton(false);
    setLoading(true);
    setUploadLoading(true);

    const user = auth.currentUser;
    if (user && user.providerData[0]?.providerId === "github.com") {
      const provider = new GithubAuthProvider();
      provider.addScope("repo");
      provider.addScope("read:user");

      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          if (credential) {
            const token = credential.accessToken;
            if (token) {
              createRepoAndUploadFiles(token, codeResults, projectName);
            } else {
              console.error("Access token is undefined");
            }
          } else {
            console.error("Credential is null");
          }
        })
        .catch((error: any) => {
          console.error("Failed to sign in with Github:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast({
        title: "User not authenticated with GitHub.",
        description: "Please login with GitHub to upload code to a repository.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      setShowUploadButton(true);
    }

    setUploadLoading(false);
  };

  const handleDownload = () => {
    let zip = new JSZip();
    codeResults.forEach((file) => {
      zip.file(file.filename, file.content);
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "generated_code.zip");
    });
  };

  const handleModalSubmit = () => {
    if (socket) {
      socket.emit("user_response", { response: userResponse });
    }
    onClose();
  };

  const stripAnsi = (string: string) => {
    const regex = /\x1B[[(?);]{0,2}(;?\d)*./g;
    return string.replace(regex, "");
  };

  return (
    <Center
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgGradient="linear(to-r, black, gray)"
    >
      <VStack spacing={10}>
        {!showResults && !loading && (
          <>
            <Heading fontSize="2xl" mt="3" color="white">
              What do you want to create?
            </Heading>
            <Input
              width={"80vw"}
              placeholder="Enter project name..."
              size="lg"
              color="purple.300"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Textarea
              placeholder="A blog with users and posts in React..."
              size="lg"
              resize="none"
              color="purple.300"
              rows={4}
              onChange={handleTextChange}
              width={"80vw"}
            />

            <Wrap width={"80vw"}>
              {frameworks.map((framework) => (
                <Button
                  key={framework}
                  onClick={() => handleFrameworkSelect(framework)}
                  colorScheme={
                    selectedFrameworks.includes(framework) ? "purple" : "gray"
                  }
                >
                  {framework}
                </Button>
              ))}
            </Wrap>

            <Button
              onClick={handleSubmit}
              size="lg"
              bgColor={"whatsapp.200"}
              _hover={{ bg: "whatsapp.300" }}
            >
              Generate Code
            </Button>
          </>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Input Required</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {outputBuffer.split("\n").map((line, index) => (
                <Text key={index} mb={4}>
                  {stripAnsi(line)}
                </Text>
              ))}
              <FormControl>
                <FormLabel>Please enter your response:</FormLabel>
                <Input
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleModalSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {loading && (
          <Center>
            <VStack spacing='10'>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Progress value={progress} size="md" width='40vw' shadow={'dark-lg'} rounded='3xl' height='32px' colorScheme="blue" />
            </VStack>
          </Center>
        )}

        {showResults && (
          <VStack>
            <Accordion
              allowToggle
              w="100%"
              mt="10"
              colorScheme="white"
              color="whatsapp.100"
            >
              {codeResults.map((result, index) => (
                <AccordionItem key={index}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {result.filename}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {result.content.split("\n").map((line, index) => (
                      <Text key={index} fontSize="sm" color="white">
                        {line}
                      </Text>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            <animated.div style={props}>
              {!uploadLoading && showUploadButton && (
                <Box mt={5}>
                  <Button
                    onClick={handleGitHubAction}
                    mt={2}
                    colorScheme="blue"
                    _hover={{ bg: "blue.500" }}
                  >
                    Upload to GitHub
                  </Button>
                  <Button
                    onClick={handleDownload}
                    mt={2}
                    colorScheme="green"
                    _hover={{ bg: "green.500" }}
                    ml={2}
                  >
                    Download Files
                  </Button>
                </Box>
              )}
              {uploadLoading && (
                <Alert status="info" mt={5}>
                  <AlertIcon />
                  Uploading files to GitHub...
                </Alert>
              )}
            </animated.div>
          </VStack>
        )}
      </VStack>
    </Center>
  );
};

export default Generate;
