import { Button, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <Box
      bgGradient="linear(to-r, black, gray)"
      minH="94vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      color="white"
    >
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Congratulations!
        </Heading>
        <Text fontSize="xl">Your operation was successful.</Text>
        <Button as={Link} to="/" colorScheme="teal" size="lg">
          Go to main page
        </Button>
      </VStack>
    </Box>
  );
};

export default Success;
