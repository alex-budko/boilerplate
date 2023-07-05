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
        Boilerplate.AI is the brainchild of Alex Budko, an innovative
        undergraduate at the University of Pennsylvania.
      </Text>

      <Divider my={6} color="white" />

      <Text fontSize="1xl" color="white" textAlign="center">
        This application is designed to streamline your coding workflow by
        generating project boilerplate code. The magic lies in its AI engine
        that leverages a language model trained on extensive data sets to
        generate reliable code. This means your project setup becomes as easy as
        entering a prompt!
      </Text>

      <Text fontSize="1xl" color="white" textAlign="center">
        Boilerplate.AI generates a GitHub repository containing all the
        necessary files tailored to your new project's needs. No more fretting
        about the correct file structure or basic setup – we've got you covered.
      </Text>

      <Divider my={6} color="white" />

      <Tooltip rounded='2xl' boxShadow='dark-lg' label="This is the best way to reach out for any queries or contributions!">
        <Text fontSize="1xl" color="white" textAlign="center">
          Interested in contributing or have any questions? Please feel free to
          reach out or contribute on our
          <Link
            href="https://github.com/AlexBudko/Boilerplate.AI"
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
