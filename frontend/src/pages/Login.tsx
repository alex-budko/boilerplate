import { Box, Button, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { db, auth } from "../firebase/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  getRedirectResult
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";

import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const githubProvider = new GithubAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGithub = () => {
    signInWithRedirect(auth, githubProvider);
  };

  const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
  };

  useEffect(() => {
    document.body.classList.remove("hero-page");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, { tokens: 0 });
        }

        navigate("/generate");
      }
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          navigate("/generate");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <VStack
      w="100%"
      h="100vh"
      display="flex"
      position="fixed"
      alignItems="center"
      bgGradient="linear(to-r, black, gray)"
      justifyContent="center"
      flexDirection="column"
      spacing={'5'}
    >
      <Heading mb="2" color="gray.200">
        Sign In
      </Heading>
      
      <Button
        onClick={signInWithGithub}
        colorScheme="teal"
        leftIcon={<Icon as={AiFillGithub} />}
        mb={3}
      >
        Login with GitHub
      </Button>
      <Button
        onClick={signInWithGoogle}
        colorScheme="red"
        leftIcon={<Icon as={FaGoogle} />}
      >
        Login with Google
      </Button>
      <Text mb="6" color="gray.300">
        (GitHub is preferred for best experience)
      </Text>
    </VStack>
  );
};

export default Login;
