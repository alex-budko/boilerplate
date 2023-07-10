import { useEffect, useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import MotionButtonComponent from "../components/MotionButtonComponent";
import HeadingComponent from "../components/HeadingComponent";
import AnimatedStepsComponent from "../components/AnimatedStepsComponent";
import { useNavigate } from "react-router-dom";
import SceneComponent1 from "../components/SceneComponent1";
import SceneComponent2 from "../components/SceneComponent2";
import { InView } from 'react-intersection-observer';

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
      <InView threshold={0.5}>
        {({ ref, inView }) => (
          <div ref={ref} style={{ height: "100vh" }}>
            {inView && (
              <Canvas gl={{ antialias: false }}>
                <SceneComponent1 />
              </Canvas>
            )}
          </div>
        )}
      </InView>
      <InView threshold={0.5}>
        {({ ref, inView }) => (
          <div ref={ref} style={{ height: "100vh" }}>
            {inView && (
              <Canvas gl={{ antialias: false }}>
                <SceneComponent2 />
              </Canvas>
            )}
          </div>
        )}
      </InView>
      <Center>
        <AnimatedStepsComponent />
        <MotionButtonComponent onClick={onClick} showButton={showButton} />
      </Center>
    </Box>
  );
};

export default HeroPage;
