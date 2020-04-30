import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree, extend } from "react-three-fiber";
import io from "socket.io-client";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";
import Controls from "./Controls";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

const Canvas = styled(c)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

function Content({ props, color, thing, count }) {
  const mesh = useRef();

  const [active, setActive] = useState(false);
  const colorthings = Math.floor(Math.random() * 0xffffff);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const funky = useSpring({
    scale: active ? [10, 10, 10] : [10, 10, 10],
    color: color ? "hotpink" : "hotpink",
  });

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < thing; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 1000;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [thing]);

  console.log(particles);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      dummy.position.set(
        (particle.mx / 10) * xFactor * a +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * yFactor * b +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 2) * factor) / 10,
        (particle.my / 10) * zFactor * b +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
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
      args={[null, null, 50]}
      onClick={(e) => setActive(!active)}
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

export default function Box() {
  const [thing, setThing] = useState(0);
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
  }, [thing]);

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 150], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <Lights />
        <Content thing={thing} color={color} count={150} />
        <Controls />
      </Suspense>
      <Effects />
      {/* <Controls /> */}
    </Canvas>
  );
}
