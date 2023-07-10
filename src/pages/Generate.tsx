import React, { useEffect, useState } from "react";
import JSZip from "jszip";
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
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { frameworks } from "../data/frameworks";
import { animated, useSpring } from "react-spring";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import "firebase/auth";
import { saveAs } from "file-saver";

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
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);
  const toast = useToast();

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
      setShowUploadButton(true);
      toast({
        title: "Code generation completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
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

      setTimeout(() => uploadFilesToRepo(token, files, repoName), 60000);
    } catch (error) {
      console.error("Error creating new repository", error);
    }
  };

  const handleGitHubAction = async () => {
    setShowUploadButton(false);
    setLoading(true);
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    provider.addScope("read:user");

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          if (token) {
            createRepoAndUploadFiles(token, codeResults, "boilerplate-1");
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

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgGradient="linear(to-r, black, gray)"
    >
      <VStack>
        <Text fontSize="3xl" color="white">
          What do you want to create?
        </Text>
        <Wrap>
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
        <Textarea
          placeholder="I want to build a blog with users and posts."
          size="lg"
          resize="none"
          rows={4}
          onChange={handleTextChange}
        />
        <Button onClick={handleSubmit} size="lg">
          Generate Code
        </Button>
        {loading && (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
        {showResults && (
          <animated.div style={props}>
            {codeResults.map((fileResult, i) => (
              <Code key={i} width="100%" p={4} overflowX="auto">
                {fileResult.content}
              </Code>
            ))}
            {showUploadButton && (
              <Box mt={5}>
                <Button onClick={handleGitHubAction} mt={2}>
                  Upload to GitHub
                </Button>
                <Button onClick={handleDownload} mt={2}>
                  Download Files
                </Button>
              </Box>
            )}
            {loading && (
              <Alert status="info" mt={5}>
                <AlertIcon />
                Uploading files to GitHub...
              </Alert>
            )}
          </animated.div>
        )}
      </VStack>
    </Box>
  );
};

export default Generate;
