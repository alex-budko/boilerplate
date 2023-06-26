import "./styles.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { useTransform, useScroll, useTime, motion } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";
import { Mesh } from "three";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const color = "#111111";

const MotionButton = motion(Button);

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color={color} />
  </mesh>
);

const Star = ({ p }: { p: number }) => {
  const ref = useRef<Mesh>(null);

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

function Scene({ numStars = 100 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(0.3));

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />);
  }

  return (
    <>
      <Icosahedron />
      {stars}
    </>
  );
}

export default function App() {
  const [showButton, setShowButton] = useState(false);
  const checkScrollBottom = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollBottom);

    return () => window.removeEventListener("scroll", checkScrollBottom);
  }, []);

  return (
    <Box position="fixed" top="0" bottom="0" right="0" left="0">
      <Center>
        <Heading fontSize={"8xl"} top="-5" position={"fixed"}>
          Boilerplate.ai
        </Heading>
      </Center>
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>
      <Center>
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
          _hover={{
            color: 'gray.600',
            boxShadow: '3xl',
          }}
        >
          Click to Proceed <ArrowForwardIcon />
        </MotionButton>
      </Center>
    </Box>
  );
}
