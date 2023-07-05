import { Box, Text, Heading, Divider, Link } from "@chakra-ui/react";
import React from 'react';

function About() {
  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading mb={6}>About Boilerplate.AI</Heading>
      <Text fontSize="xl" mb={4}>
        This website was created by Alex Budko, an undergraduate student at the University of Pennsylvania.
      </Text>

      <Divider my={6} />

      <Text fontSize="xl" mb={4}>
        Boilerplate.AI is designed to simplify the process of setting up a new coding project. Here is how it works:
      </Text>
      <Text fontSize="xl" mb={4}>
        1. As a user, you enter a project prompt.
      </Text>
      <Text fontSize="xl" mb={4}>
        2. The website generates a GitHub repository with all the necessary files for your new project.
      </Text>

      <Divider my={6} />

      <Text fontSize="xl" mb={4}>
        Want to contribute or have any questions? Please feel free to reach out or contribute on <Link href="https://github.com/AlexBudko/Boilerplate.AI" color="teal.500" isExternal>GitHub</Link>.
      </Text>
    </Box>
  );
}

export default About;
