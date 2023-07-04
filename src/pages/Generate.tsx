import React, { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Spinner,
  VStack,
  Wrap,
  Center,
  Code,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { frameworks } from "../data/frameworks";
import { animated, useSpring } from "react-spring";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import axios from 'axios';
import 'firebase/auth';

interface FileResult {
  filename: string;
  content: string;
}

const Generate = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "Any",
  ]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [codeResults, setCodeResults] = useState<FileResult[]>([]);

  const navigate = useNavigate();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowResults(false);
    setLoading(true);

    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        frameworks: selectedFrameworks,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setCodeResults(data.codeResults[0].files);
      setShowResults(true);

      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          if (credential) {
            const token = credential.accessToken;
            if (token) {
              createRepoAndUploadFiles(token, data.codeResults[0].files, 'boilerplate-1');
            } else {
              console.error('Access token is undefined');
            }
          } else {
            console.error('Credential is null');
          }
        })
        .catch((error : any) => {
          console.error('Failed to sign in with Github:', error);
        });
    }

    setLoading(false);
  };

  const props = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: showResults
      ? { opacity: 1, transform: "translate3d(0,0px,0)" }
      : { opacity: 0, transform: "translate3d(0,-40px,0)" },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const auth = getAuth();

  const uploadFilesToRepo = async (token: string, files: FileResult[], repoName: string) => {
    for (const file of files) {
      try {
        const content = btoa(file.content);
        const user = auth.currentUser;

        if (!user) {
          console.error('No authenticated user');
          return;
        }

        await axios.put(`https://api.github.com/repos/${user.displayName}/${repoName}/contents/${file.filename}`, {
          message: `commit from firebase app`, 
          content: content,
          committer: {
            name: user.displayName,
            email: user.email
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });

        console.log(`Uploaded ${file.filename}`);
      } catch (error) {
        console.error(`Error uploading ${file.filename}`, error);
      }
    }
  };

  const createRepoAndUploadFiles = async (token: string, files: FileResult[], repoName: string) => {
    try {
      const repo = await axios.post(`https://api.github.com/user/repos`, {
        name: repoName, 
        description: 'Testing Boilerplate repo',
        homepage: 'https://github.com',
        private: false,
        is_template: true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        }
      });

      uploadFilesToRepo(token, files, repoName);
    } catch (error) {
      console.error('Error creating new repository', error);
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgGradient="linear(to-r, black, gray)"
    >
      <VStack
        mt={4}
        borderRadius="lg"
        boxShadow="lg"
        bg="gray.200"
        p={5}
        width={["90%", "85%", "80%", "60%"]}
      >
        <Text mb={4}>
          <b>
            Write a couple of sentences about what code you want to generate:
          </b>
        </Text>

        <Textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your sentences here..."
          size="sm"
          resize="vertical"
          mb={4}
          bg={"gray.800"}
          border={"1px"}
          rounded={"2xl"}
          fontWeight="bold"
          color="whatsapp.200"
        />

        {!loading && !showResults && (
          <Wrap spacing="2" mt={4}>
            {frameworks.map((framework) => (
              <Button
                rounded={"3xl"}
                boxShadow={"dark-lg"}
                key={framework}
                onClick={() => handleFrameworkSelect(framework)}
                colorScheme={
                  selectedFrameworks.includes(framework) ? "green" : "gray"
                }
              >
                {framework}
              </Button>
            ))}
          </Wrap>
        )}

        <Button
          onClick={handleSubmit}
          bg={loading ? "red.500" : "gray.800"}
          color="gray.100"
          mt={4}
          _hover={{ bgColor: "gray.700" }}
        >
          {loading ? "Cancel" : "Generate"}
        </Button>

        {loading && (
          <Center mt={5}>
            <Spinner
              thickness="5px"
              speed="0.65s"
              emptyColor="black"
              color="green.500"
              width={"60px"}
            />
          </Center>
        )}

        <animated.div style={props}>
          {codeResults.map((result) => (
            <Box
              p={4}
              color="white"
              mt="4"
              bg="gray.800"
              rounded="md"
              shadow="md"
              key={result.filename}
              w="100%" 
              overflowX="auto"
            >
              <Text fontSize="lg" mb="2">
                {result.filename}:
              </Text>
              <Code
                fontSize="md"
                p="3"
                color="white"
                bg="gray.800"
                rounded={"3xl"}
                boxShadow={"2xl"}
              >
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {result.content
                    .replace(/(?<!&)lt;/g, "&lt;")
                    .replace(/(?<!&)gt;/g, "&gt;")}
                </pre>
              </Code>
            </Box>
          ))}
        </animated.div>
      </VStack>
    </Box>
  );
};

export default Generate;
