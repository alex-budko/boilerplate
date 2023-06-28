import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

interface User {
  displayName: string | null;
  email: string | null;
}

const NavigationBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box
      color="white"
      bgGradient="linear(to-r, black, gray)"
      p="2"
      h="40px"
      position="sticky"
      zIndex="1000"
    >
      <Flex alignItems="center">
        <ChakraLink as={Link} to="" _hover={{ textDecoration: "none" }}>
          <Text fontSize="3xl" fontWeight="bold">
            B.ai
          </Text>
        </ChakraLink>

        <Spacer />

        <Flex alignItems="center">
          <ChakraLink
            as={Link}
            to="/help"
            px={4}
            _hover={{ textDecoration: "none" }}
          >
            Help
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/pricing"
            px={4}
            _hover={{ textDecoration: "none" }}
          >
            Pricing
          </ChakraLink>
          <Box as="button" onClick={onOpen}>
            <Icon as={CgProfile} boxSize={6} />
          </Box>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bgGradient="linear(to-r, green, black)">
            <ModalHeader color='white'>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody color='white'>
              {user ? (
                <>
                  <Text>{user.displayName}</Text>
                  <Text>{user.email}</Text>
                </>
              ) : (
                <Text>No user is signed in.</Text>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={onClose}>
                Close
              </Button>
              {user ? (
                <Button colorScheme="red" onClick={() => {
                    onClose()
                    auth.signOut()
                }}>
                  Logout
                </Button>
              ) : (
                <Button as={Link} to="login" colorScheme="blue" onClick={onClose}>
                  Login
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default NavigationBar;
