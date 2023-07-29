import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  VStack,
  Avatar,
  Heading,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../utils/types";
import { FaRegUserCircle, FaCoins } from "react-icons/fa";

interface ProfileComponentProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [userTokens, setUserTokens] = useState(0);

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (user && user.uid) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserTokens(docSnap.data().tokens);
        }
      }
    };

    fetchUserTokens();
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user ? (
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bgColor="gray.800"
              rounded="3xl"
              boxShadow={"dark-lg"}
            >
              <VStack spacing={4} align="center">
                <Avatar
                  icon={<FaRegUserCircle />}
                  name={user.displayName || ""}
                  size="2xl"
                />
                <Heading size="lg" py={2}>
                  {user.displayName}
                </Heading>
                <Text><i>{user.email}</i></Text>
                <Stat>
                  <StatLabel>Tokens</StatLabel>
                  <StatNumber>{userTokens}</StatNumber>
                  <StatHelpText>
                    <IconButton
                      aria-label="Tokens"
                      icon={<FaCoins color="white" />}
                      variant="ghost"
                      isRound
                    />
                  </StatHelpText>
                </Stat>
              </VStack>
            </Box>
          ) : (
            <Text>No user is signed in.</Text>
          )}
        </ModalBody>
        <Center>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
            {user ? (
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  auth.signOut();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button as={Link} to="login" colorScheme="blue" onClick={onClose}>
                Login
              </Button>
            )}
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default ProfileComponent;
