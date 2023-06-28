import React, { useLayoutEffect, useRef } from 'react';
import { Mesh } from "three";
import { degreesToRadians, mix } from "popmotion";

const StarComponent = ({ p }: { p: number }) => {
  const ref = useRef<Mesh>(null);

  const color = "#ffffff";

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

export default StarComponent;
