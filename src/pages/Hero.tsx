import { useEffect, useState } from "react";
import { Box, Center, VStack } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import SceneComponent from "../components/SceneComponent";
import MotionButtonComponent from "../components/MotionButtonComponent";
import HeadingComponent from "../components/HeadingComponent";
import AnimatedStepsComponent from "../components/AnimatedStepsComponent";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const checkScrollBottom = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const onClick = () => {
    navigate("login");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    document.body.classList.add("hero-page");

    return () => {
      document.body.classList.remove("hero-page");
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollBottom);

    return () => window.removeEventListener("scroll", checkScrollBottom);
  }, []);

  return (
    <Box
      position="fixed"
      bgGradient="linear(to-r, black, gray)"
      top="0"
      bottom="0"
      right="0"
      left="0"
    >
      <HeadingComponent />
      <Canvas gl={{ antialias: false }}>
        <SceneComponent />
      </Canvas>
      <Center>
        <AnimatedStepsComponent />
        <MotionButtonComponent onClick={onClick} showButton={showButton} />
      </Center>
    </Box>
  );
};

export default HeroPage;
