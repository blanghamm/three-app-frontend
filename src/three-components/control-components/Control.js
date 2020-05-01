import React, {
  useRef,
  useState,
  useCallback,
  Suspense,
  useMemo,
  useEffect,
} from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";
import io from "socket.io-client";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import { useMousePosition } from "../../hooks/useMousePosition";

// const endpoint = process.env.REACT_APP_THREE_API_URL;
// const socket = io(endpoint);

// extend({ OrbitControls });

const Canvas = styled(c)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

function Content({ props, count, mouse }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [active, setActive] = useState(false);
  const funky = useSpring({
    scale: active ? [10, 10, 10] : [10, 10, 10],
    color: active ? "hotpink" : "orange",
  });

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 1000;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      particle.mx += (mouse.current[0] - particle.mx) * 0.02;
      particle.my += (-mouse.current[1] - particle.my) * 0.02;
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          Math.sin(t * 1) * factor * 0.02,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          Math.cos(t * 2) * factor * 0.02,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          Math.sin(t * 3) * factor * 0.02
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
      args={[null, null, count]}
      onClick={(e) => setActive(!active)}
    >
      <sphereBufferGeometry attach="geometry" args={[0.8, 0.28, 150, 32]} />
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
        intensity={0.5}
        position={[10, 10, 10]}
        width={10}
        height={1000}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <pointLight intensity={0.3} position={[150, 150, 150]} />
      <ambientLight intensity={0.5} position={[150, 150, 150]} />
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

export default function Control() {
  const [thing, setThing] = useState(0);
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }} onMouseMove={onMouseMove}>
      <Canvas
        shadowMap
        camera={{ position: [0, 0, 150], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("white");
          gl.toneMapping = THREE.Uncharted2ToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} intensity={1.2} />
        <pointLight position={[-100, -100, -100]} intensity={0.2} color="red" />
        <Suspense fallback={null}>
          <Lights />

          <Content mouse={mouse} count={150} />
          {/* <Effects /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
