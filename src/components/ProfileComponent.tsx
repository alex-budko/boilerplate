// ProfileComponent.tsx
import React from 'react';
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
  Box,
  VStack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { User } from '../utils/types';

interface ProfileComponentProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgGradient="linear(to-r, green, black)">
        <ModalHeader color='white'>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody color='white'>
          {user ? (
            <VStack spacing={4}>
              <Text>Name: {user.displayName}</Text>
              <Text>Email: {user.email}</Text>
            </VStack>
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
  );
};

export default ProfileComponent;
