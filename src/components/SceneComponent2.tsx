import React, { useLayoutEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress } from "popmotion";
import StarComponent from "./StarComponent";

function SceneComponent2({ numStars = 100 }) {
  const color = "red";

  const Box = () => (
    <mesh rotation-x={0.35}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial wireframe color={color} />
    </mesh>
  );

  const Sphere = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
      }
    });
    return (
      <mesh ref={ref}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhongMaterial wireframe color="blue" />
      </mesh>
    );
  };

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

  useLayoutEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
  });

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<StarComponent p={progress(0, numStars, i)} />);
  }

  return (
    <>
      <Box />
      <Sphere />
      {stars}
      <ambientLight intensity={0.2} />
      <directionalLight color="white" intensity={1} position={[2, 2, 2]} />
      <pointLight color="white" intensity={1} position={[-2, -2, -2]} />
    </>
  );
}

export default SceneComponent2;
