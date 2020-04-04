import React, { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import io from "socket.io-client";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

// extend({ OrbitControls });

const Canvas = styled(c)`
  position: fixed !important;
  margin: 0;
  padding: 0;
`;

function Content({ props, color, thing }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const [active, setActive] = useState(false);
  const funky = useSpring({
    scale: active ? [10, 10, 10] : [10, 10, 10],
    color: color ? "hotpink" : "hotpink",
  });

  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.x += 0.01;
  });

  return (
    <a.mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
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
    </a.mesh>
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
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
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

// const Controls = props => {
//   const { camera } = useThree();
//   const controls = useRef();
//   useFrame(() => controls.current && controls.current.update());
//   return <orbitControls ref={controls} args={[camera]} {...props} />;
// };

export default function Box() {
  const [thing, setThing] = useState(0.01);
  const [color, setColor] = useState(false);
  useEffect(() => {
    socket.on("three", (x) => {
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
      camera={{ position: [0, 0, 10], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Content thing={thing} color={color} />
      </Suspense>
      <Effects />
    </Canvas>
  );
}
