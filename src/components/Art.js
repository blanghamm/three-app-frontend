import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import io from "socket.io-client";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

const Canvas = styled(c)`
  position: absolute !important;
  margin: 0;
  padding: 0;
`;

function Content({ props, thing }) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const funky = useSpring({
    scale: active ? [10, 10, 10] : [20, 20, 20],
    color: hovered ? "hotpink" : "orange"
  });

  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.x += thing;
  });

  return (
    <a.mesh
      {...props}
      ref={mesh}
      scale={funky.scale}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshStandardMaterial
        attach="material"
        color={funky.color}
        roughness={0.75}
        metalness={0.6}
      />
    </a.mesh>
  );
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

export default function Box() {
  const [thing, setThing] = useState(0);
  useEffect(() => {
    socket.on("three", x => {
      setThing(x);
    });
    console.log("state number " + thing);
  }, [thing]);

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 100], fov: 400 }}
      gl={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Lights />
      <Content thing={thing} />
    </Canvas>
  );
}
