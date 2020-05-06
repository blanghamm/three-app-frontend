import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";
import Controls from "./Controls";
import { SocketContext } from "../index";

const Canvas = styled(c)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

function Content({ props, thing }) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < thing; i++) {
      const x = (i % 30) * 3.05;
      const y = Math.floor(i / 30) * 1.05;
      const z = 0;
      temp.push({ x, y, z });
    }

    return temp;
  }, [thing]);

  const mesh = useRef();
  const colorthings = 2 * 0xffffff;
  const dummy = useMemo(() => new THREE.Object3D(), []);

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
      key={particles}
      ref={mesh}
      args={[null, null, 500]}
      dispose={null}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
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
    </group>
  );
}

export default function Box() {
  const socket = useContext(SocketContext);
  const [thing, setThing] = useState(0);
  const [client, setClient] = useState("");

  useEffect(() => {
    socket.emit("subscribe", "art room");
  }, [socket]);
  useEffect(() => {
    socket.on("clientsJoined", (data) => {
      setThing(data);
    });
    socket.on("clientsLeft", (data) => {
      setThing(data);
    });
  }, [thing]);
  console.log(thing);

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
        <Content thing={thing} count={150} />
        <Controls />
      </Suspense>
      <Effects />
    </Canvas>
  );
}
