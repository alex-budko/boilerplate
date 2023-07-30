import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
  Link as ChakraLink,
  Icon,
  useDisclosure,
  Button,
  Tooltip,
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
      p={2}
      h="60px"
      position="sticky"
      zIndex="1000"
    >
      <Flex alignItems="center">
        <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
          <Text fontSize="3xl" fontWeight="bold">
            B.ai
          </Text>
        </ChakraLink>

        <Spacer />

        <Flex alignItems="center">
          <ChakraLink
            as={Link}
            to="/about"
            mx={3}
            _hover={{ textDecoration: "none", color: "teal.200" }}
          >
            About
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/help"
            mx={3}
            _hover={{ textDecoration: "none", color: "teal.200" }}
          >
            Help
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/pricing"
            mx={3}
            _hover={{ textDecoration: "none", color: "teal.200" }}
          >
            Pricing
          </ChakraLink>
          <Tooltip label="Profile" fontSize="md">
            <Box as="button" onClick={onOpen}>
              <Icon as={CgProfile} boxSize={6} />
            </Box>
          </Tooltip>
        </Flex>

        <ProfileComponent user={user} isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  );
};

export default NavigationBar;
