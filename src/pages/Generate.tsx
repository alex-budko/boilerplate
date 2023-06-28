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
import { code } from "../data/code";
import { animated, useSpring } from "react-spring";

interface CodeResult {
  title: string;
  code: string;
}

const Generate = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "Any",
  ]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [codeResults, setCodeResults] = useState<CodeResult[]>([]);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowResults(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
      setCodeResults(code);
    }, 4000);
    // navigate('/somewhere');
  };

  const props = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: showResults
      ? { opacity: 1, transform: "translate3d(0,0px,0)" }
      : { opacity: 0, transform: "translate3d(0,-40px,0)" },
    config: { mass: 1, tension: 280, friction: 60 },
  });

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
              key={result.title}
            >
              <Text fontSize="lg" mb="2">
                {result.title}:
              </Text>
              <Code
                fontSize="md"
                p="3"
                color="white"
                bg="gray.800"
                rounded={"3xl"}
                boxShadow={"2xl"}
              >
                <pre>
                  {result.code
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
