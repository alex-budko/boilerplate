import { motion } from "framer-motion";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const MotionButtonComponent = ({ onClick }: { onClick: any }) => {
   return (
    <Button
      fontSize={"5xl"}
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      variant="unstyled"
      size="lg"
      color="purple.400"
      _hover={{
        color: "purple.200",
        boxShadow: "3xl",
      }}
      onClick={onClick}
      m={'10'}
    >
      Click to Proceed <ArrowForwardIcon />
    </Button>
  );
};

export default MotionButtonComponent;
