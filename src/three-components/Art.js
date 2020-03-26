import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import io from "socket.io-client";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

const Canvas = styled(c)`
  position: absolute !important;
  margin: 0;
  padding: 0;
`;

function Content({ props, thing, color, count }) {
  const mesh = useRef();
  const [active, setActive] = useState(false);
  const funky = useSpring({
    scale: active ? [10, 10, 10] : [10, 10, 10],
    color: color ? "hotpink" : "hotpink"
  });

  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.x += thing;
  });

  return (
    <a.instancedMesh
      {...props}
      ref={mesh}
      scale={funky.scale}
      args={[null, null, 100]}
      onClick={e => setActive(!active)}
    >
      <torusBufferGeometry attach="geometry" args={[0.8, 0.28, 150, 32]} />
      <a.meshStandardMaterial
        attach="material"
        color={funky.color}
        roughness={0.75}
        metalness={0.6}
        clearcoat={1}
        clearcoatRoughness={0.2}
      />
    </a.instancedMesh>
  );
}

function Lights() {
  return (
    <group>
      <rectAreaLight
        intensity={1}
        position={[10, 10, 10]}
        width={10}
        height={1000}
        onUpdate={self => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <pointLight intensity={0.3} position={[150, 150, 150]} />
      <ambientLight intensity={0.5} position={[150, 150, 150]} />
      {/* <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */}
    </group>
  );
}

export default function Box({ count }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  const [thing, setThing] = useState(0.01);
  const [color, setColor] = useState(false);
  useEffect(() => {
    socket.on("three", x => {
      setThing(x);
    });
    if (thing > 0.04) {
      setColor(true);
    }
    if (thing < 0.04) {
      setColor(false);
    }
    console.log("state number " + thing);
  }, [thing]);

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 30], fov: 100 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.setClearColor(new THREE.Color("black"));
      }}
    >
      {/* <spotLight
        castShadow
        intensity={1}
        angle={Math.PI / 10}
        position={[10, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */}

      <Lights />
      <Content thing={thing} color={color} />
      <Effects />
      {/* <Colours /> */}
    </Canvas>
  );
}
