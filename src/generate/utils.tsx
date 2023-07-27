import { useEffect, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { auth } from "../firebase/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

export interface FileResult {
  filename: string;
  content: string;
}

export interface QuestionPromptData {
  output: string;
}

export const createSocket = (url: string, onQuestionPrompt: Function) => {
  const socket = io(url);
  socket.on("question_prompt", (data: QuestionPromptData) => {
    onQuestionPrompt(data);
  });
  return socket;
};

export const useSocket = (url: string, onQuestionPrompt: Function) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = createSocket(url, onQuestionPrompt);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export const generateCode = async (data: any) => {
  const response = await axios.post("http://localhost:5000/generate", data);
  return response.data;
};

export const authenticateWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  provider.addScope("repo");
  provider.addScope("read:user");

  const result = await signInWithPopup(auth, provider);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;

  return token;
};
