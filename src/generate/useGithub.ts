import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createRepoAndUploadFiles } from "./utils";

interface FileResult {
    filename: string;
    content: string;
}

export const useGithub = () => {
  const handleGitHubAction = async (files: FileResult[], repoName: string) => {
    const provider = new GithubAuthProvider();
    provider.addScope("repo");
    provider.addScope("read:user");

    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      if (token) {
        await createRepoAndUploadFiles(token, files, repoName);
      } else {
        console.error("Access token is undefined");
      }
    } else {
      console.error("Credential is null");
    }
  };

  return { handleGitHubAction };
};
