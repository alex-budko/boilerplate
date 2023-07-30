import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDisclosure } from "@chakra-ui/react";

interface QuestionPromptData {
  output: string;
}


export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [outputBuffer, setOutputBuffer] = useState<string>("");
  const [userResponse, setUserResponse] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.on("question_prompt", (data: QuestionPromptData) => {
      console.log(data);
      setOutputBuffer(data.output);
      setUserResponse("");
      onOpen();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [url, onOpen]);

  const handleModalSubmit = () => {
    if (socket) {
      socket.emit("user_response", { response: userResponse });
    }
    onClose();
  };

  return { socket, outputBuffer, userResponse, setUserResponse, isOpen, handleModalSubmit };
};
