import { Button, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// failing page
const Fail = () => {
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
          Error!
        </Heading>
        <Text fontSize="xl">Your operation was not successful.</Text>
        <Button as={Link} to="/" colorScheme="red" size="lg">
          Go to main page
        </Button>
      </VStack>
    </Box>
  );
};

export default Fail;
