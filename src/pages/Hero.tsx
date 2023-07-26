import { useEffect } from "react";
import { Box, Center, VStack, Button, Heading } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import SceneComponent from "../components/SceneComponent";
import HowItWorks from "../root-page/HowItWorks";
import FAQ from "../root-page/FAQ";
import WhyUs from "../root-page/WhyUs";
import MotionButtonComponent from "../components/MotionButtonComponent";
import Reviews from "../root-page/Reviews";
import Typewriter from "react-ts-typewriter";

const HeroPage = () => {
  const navigate = useNavigate();

  const [ref, inView] = useInView({
    triggerOnce: false,
  });

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

  return (
    <VStack bgGradient="linear(to-r, black, gray)">
      <Heading>
        <Typewriter text="Welcome to Booilerplate.AI" speed={200} />
      </Heading>

      <HowItWorks />
      
      <Box h="100vh" w="97vw">
        <Canvas gl={{ antialias: false }}>
          <SceneComponent />
        </Canvas>
      </Box>

      <FAQ />

      <Box ref={ref}>
        <Center>
          <MotionButtonComponent onClick={onClick} />
        </Center>
      </Box>
    </VStack>
  );
};

export default HeroPage;
