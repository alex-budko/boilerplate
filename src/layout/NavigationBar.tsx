import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import ProfileComponent from "../components/ProfileComponent";
import { User } from "../utils/types";

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
            to="/about"
            px={4}
            _hover={{ textDecoration: "none" }}
          >
            About
          </ChakraLink>
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

        <ProfileComponent user={user} isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
};

export default NavigationBar;
