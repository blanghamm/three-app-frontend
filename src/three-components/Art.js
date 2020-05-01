import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from "react-three-fiber";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";
import Controls from "./Controls";
import { Geometry } from "three";
// import { socket } from "../socket/config";

const Canvas = styled(c)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

function Content({ props, color, thing, count, poo }) {
  const mesh = useRef();

  const [active, setActive] = useState(false);
  const colorthings = Math.floor(Math.random() * 0xffffff);
  const dummy = useMemo(() => new THREE.Object3D());
  const funky = useSpring({
    scale: active ? [10, 10, 10] : [10, 10, 10],
    color: color ? "hotpink" : "hotpink",
  });

  const particles = useMemo(() => {
    const temp = [];
    new Array(thing).fill().map((_, i) => {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 1000;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      const x = -20 + Math.random() * 40;
      const y = -20 + Math.random() * 40;
      const z = -20 + Math.random() * 40;
      temp.push({ x, y, z });
      if (thing < poo) {
        console.log("boom");
        temp.pop({ x, y, z });
      }
    });

    return temp;
  }, [thing]);
  console.log(particles);

  useFrame(() => {
    particles.forEach((particle, i) => {
      const { x, y, z } = particle;

      dummy.position.set(x, y, z);
      dummy.scale.set(0.5, 0.5, 0.5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <a.instancedMesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      args={[null, null, 500]}
      dispose={null}
    >
      <boxBufferGeometry attach="geometry" args={[5, 5, 10, 32]} />
      <a.meshStandardMaterial
        attach="material"
        color={colorthings}
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

export default function Box({ socket }) {
  const [thing, setThing] = useState(0);
  const [poo, setPoo] = useState(0);
  const [client, setClient] = useState("");
  const [color, setColor] = useState(false);
  useEffect(() => {
    socket.on("clientsJoined", (data) => {
      setThing(data);
      setPoo(data);
    });
    socket.on("clientsLeft", (data) => {
      setThing(data);
    });
  }, []);
  console.log("updated number: " + thing);

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 300], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Content thing={thing} color={color} count={150} poo={poo} />
        <Controls />
      </Suspense>
      <Effects />
      {/* <Controls /> */}
    </Canvas>
  );
}
