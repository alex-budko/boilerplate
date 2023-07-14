import { useEffect } from "react";
import { Box, Center, VStack, Button } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import SceneComponent1 from "../components/SceneComponent1";
import HowItWorks from "../root-page/HowItWorks";
import FAQ from "../root-page/FAQ";
import WhyUs from "../root-page/WhyUs";
import MotionButtonComponent from "../components/MotionButtonComponent";

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
      <HowItWorks />

      <Box h="100vh">
        <Canvas gl={{ antialias: false }}>
          <SceneComponent1 />
        </Canvas>
      </Box>
      <FAQ />
      <WhyUs />
      <Box ref={ref}>
        {inView && (
          <Center>
            <MotionButtonComponent onClick={onClick} showButton={inView} />
          </Center>
        )}
      </Box>
    </VStack>
  );
};

export default HeroPage;
