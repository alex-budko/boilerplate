import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const MotionButton = motion(Button);

const MotionButtonComponent = ({ showButton, onClick }: { showButton: boolean, onClick: any }) => {
   return (
    <MotionButton
      initial={{ opacity: 0 }}
      animate={{ opacity: showButton ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      position="fixed"
      fontSize={"3xl"}
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      variant="unstyled"
      size="lg"
      color="purple.700"
      _hover={{
        color: "purple.400",
        boxShadow: "3xl",
      }}
      onClick={onClick}
    >
      Click to Proceed <ArrowForwardIcon />
    </MotionButton>
  );
};

export default MotionButtonComponent;
