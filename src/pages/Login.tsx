import { Box, Button, Heading, Icon } from "@chakra-ui/react";
import { auth } from "../firebase/firebase";
import {
  GithubAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const provider = new GithubAuthProvider();

  const signInWithGithub = () => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    document.body.classList.remove("hero-page");

    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        navigate("/generate");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      position="fixed"
      alignItems="center"
      bgGradient="linear(to-r, black, gray)"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading mb="8" color="gray.200">
        Sign in with GitHub
      </Heading>
      <Button
        onClick={signInWithGithub}
        colorScheme="teal"
        leftIcon={<Icon as={AiFillGithub} />}
      >
        Login with GitHub
      </Button>
    </Box>
  );
};

export default Login;
