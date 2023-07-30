import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { getDoc, updateDoc, doc, increment } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useGithub } from "./useGithub";

interface FileResult {
  filename: string;
  content: string;
}

export const useSubmit = (
  user: any,
  text: string,
  selectedFrameworks: string[],
  projectName: string
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [codeResults, setCodeResults] = useState<FileResult[]>([]);
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);
  const toast = useToast();
  const { handleGitHubAction } = useGithub();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (user) {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists() && docSnap.data()?.tokens > 0) {
        setShowResults(false);
        setLoading(true);
        setShowUploadButton(false);

        const response = await fetch("http://localhost:5000/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            frameworks: selectedFrameworks,
            projectName: projectName.toLowerCase(),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCodeResults(data.codeResults[0].files);
          setShowResults(true);
          setShowUploadButton(true);

          await updateDoc(userRef, {
            tokens: increment(-1),
          });
        } else {
          toast({
            title: "An error occurred.",
            description: "Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setLoading(false);
      } else {
        toast({
          title: "Not enough tokens.",
          description: "You need at least 1 token to generate code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "User not authenticated.",
        description: "Please login to generate code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGitHubActionWrapper = async () => {
    setShowUploadButton(false);
    setLoading(true);
    await handleGitHubAction(codeResults, projectName);
    setLoading(false);
  };

  return {
    loading,
    showResults,
    codeResults,
    showUploadButton,
    handleSubmit,
    handleGitHubActionWrapper,
  };
};
