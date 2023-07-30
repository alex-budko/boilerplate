import React from "react";
import {
  Box,
  Text,
  Heading,
  Divider,
  Link,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

function About() {
  return (
    <VStack
      minW="94vw"
      minH="94vh"
      bgGradient="linear(to-r, black, gray)"
      p={8}
      spacing={6}
      align="center"
    >
      <Heading as="h1" fontSize="4xl" color="white">
        About Boilerplate.AI
      </Heading>
      <Text fontSize="1xl" color="white" textAlign="center">
        Boilerplate.AI is the brainchild of Alex Budko, an
        undergraduate at the University of Pennsylvania.
      </Text>

      <Divider my={6} color="white" />

      <Text fontSize="1xl" color="white" textAlign="center">
        Boilerplate.AI is designed to streamline your coding workflow by
        intelligently generating project boilerplate code. It leverages advanced AI models trained on a wealth of datasets to generate reliable, high-quality code. With Boilerplate.AI, setting up your new project is as simple as entering a prompt!
      </Text>

      <Text fontSize="1xl" color="white" textAlign="center">
        In addition to generating code, Boilerplate.AI also creates a GitHub repository containing all the necessary files tailored to your new project's needs. This means you don't have to worry about file structure or basic setup anymore – Boilerplate.AI has got you covered. Furthermore, we've recently introduced an interactive feature that prompts the user for specific inputs during the code generation process, making the generated code even more precise and relevant.
      </Text>

      <Divider my={6} color="white" />

      <Tooltip rounded='2xl' boxShadow='dark-lg' label="This is the best way to reach out for any queries or contributions!">
        <Text fontSize="1xl" color="white" textAlign="center">
          Interested in contributing or have any questions? Please feel free to
          reach out
          <Link
            href="https://github.com/alex-budko/"
            color="teal.500"
            isExternal
          >
            {" "}
            GitHub
          </Link>{" "}
          <InfoOutlineIcon w={3} h={3} color="teal.500" />.
        </Text>
      </Tooltip>
    </VStack>
  );
}

export default About;
