import React, { useLayoutEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress } from "popmotion";
import StarComponent from "./StarComponent";

function SceneComponent({ numStars = 100 }) {
const color = "green";

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshPhongMaterial wireframe color={color} />
  </mesh>
);

const Torus = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.5, 0.2, 16, 100]} />
      <meshPhongMaterial wireframe color="orange" />
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
    <Icosahedron />
    <Torus />
    {stars}
    <ambientLight intensity={0.2} />
    <directionalLight
      color="white"
      intensity={1}
      position={[2, 2, 2]}
    />
    <pointLight
      color="white"
      intensity={1}
      position={[-2, -2, -2]}
    />
  </>
);
}

export default SceneComponent;