import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import * as THREE from "three";
import { useFrame, Dom, useThree } from "react-three-fiber";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";
import Controls from "./Controls";
import { SocketContext } from "../index";
import { Curves } from "three/examples/jsm/curves/CurveExtras";
import { MeshToonMaterial } from "three";

const Canvas = styled(c)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

function Starter({ client, count, props }) {
  let spline = new Curves.GrannyKnot();
  let track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true);
  const randomRings = useMemo(() => {
    let temp = [];
    let t = 0.4;
    for (let i = 0; i < count; i++) {
      t += 0.003;
      const pos = track.parameters.path.getPointAt(t);
      pos.multiplyScalar(2);
      const segments = track.tangents.length;
      const pickt = t * segments;
      const pick = Math.floor(pickt);
      const lookAt = track.parameters.path
        .getPointAt((t + 1 / track.parameters.path.getLength()) % 1)
        .multiplyScalar(15);
      const matrix = new THREE.Matrix4().lookAt(
        pos,
        lookAt,
        track.binormals[pick]
      );
      temp.push([pos, matrix]);
    }
    return temp;
  });

  console.log("new array", randomRings);

  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 10; i++) {
      const x = 20;
      const y = i + 1.05;
      const z = Math.cos(2);
      temp.push({ x, y, z });
    }

    return temp;
  }, []);

  console.log("testing particles ", particles);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.needsUpdate = true;
  });

  return (
    <group ref={mesh}>
      {/* {client.map((particle, i) => {
        const { x, y, z } = particle;
        return (
          <mesh ref={mesh} key={client[i].id} position={[x, y, z]}>
            <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
            <meshStandardMaterial
              attach="material"
              color="pink"
              roughness={0.75}
              metalness={0.6}
              clearcoat={1}
              clearcoatRoughness={0.2}
            />
          </mesh>
        );
      })} */}

      {/* {particles.map((testing, t) => {
        const { x, y, z } = testing;
        return (
          <mesh ref={mesh} key={t} position={[x, y, z]}>
            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial attach="material" />
          </mesh>
        );
      })} */}
      {particles.map((particle, p) => {
        const f = (Math.sin(p / 10) * Math.PI) / 200;
        return (
          <a.mesh
            key={p}
            position={particle}
            scale={[5 + p * 5 * f, 5 + p * 5 * f, 5 + p * 5 * f]}
          >
            <ringBufferGeometry attach="geometry" args={[1, 1.01, 64]} />
            <meshBasicMaterial attach="material" />
          </a.mesh>
        );
      })}
    </group>
  );
}

function Spinning({ props, client }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    client.map((particle, i) => {
      const { x, y, z } = particle;
      dummy.position.set(x, y, z);
      dummy.scale.set(0.5, 0.5, 0.5);
      // dummy.rotation.set(Math.random() * Math.PI, Math.sin(Math.random));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <a.instancedMesh
        {...props}
        ref={mesh}
        key={client}
        args={[null, null, 500]}
        dispose={null}
      >
        <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
        <a.meshStandardMaterial
          attach="material"
          roughness={0.75}
          metalness={0.6}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </a.instancedMesh>
    </group>
  );
}

function Main({ props, client }) {
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    let radius = 5.5;
    let angle = 0;
    let step = Math.PI / 5;

    const temp = [];
    for (let i = 0; i < 10; i++) {
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = 0;
      temp.push({ x, y, z });
      angle += step;
    }

    return temp;
  }, []);

  // console.log("in array ", particles);

  const mesh = useRef();
  const colorthings = 2 * 0xffffff;

  // useFrame(() => {

  //     const { x, y, z } = particle;
  //     dummy.position.set(x, y, z);
  //     dummy.scale.set(0.5, 0.5, 0.5);
  //     dummy.updateMatrix();
  //     mesh.current.setMatrixAt(i, dummy.matrix);
  //   });
  //   mesh.current.instanceMatrix.needsUpdate = true;
  // });

  useFrame(() => {
    mesh.current.rotation.set(
      Math.sin(Math.random()) * 1.05,
      Math.sin(Math.random()) * 0.02,
      Math.cos(Math.random()) * 0.09
    );
    mesh.current.needsUpdate = true;
  });

  return (
    <group ref={mesh}>
      {particles.map((particle, i) => {
        const { x, y, z } = particle;
        return (
          <a.mesh key={i} position={[x, y, z]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial
              attach="material"
              color="pink"
              roughness={0.75}
              metalness={0.6}
              clearcoat={1}
              clearcoatRoughness={0.2}
            />
          </a.mesh>
        );
      })}
    </group>
  );
}

function Lights() {
  return (
    <group>
      <rectAreaLight
        intensity={0.1}
        position={[10, 10, 10]}
        width={10}
        height={1000}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      {/* <pointLight intensity={0.3} position={[150, 150, 150]} /> */}
      <ambientLight intensity={0.1} position={[150, 150, 150]} />
    </group>
  );
}

export default function Box() {
  const socket = useContext(SocketContext);
  const [client, setClient] = useState([]);

  useEffect(() => {
    socket.on("updateOnLoad", (clients) => {
      console.log("already in the session ", clients);
      setClient(clients);
    });
  });

  useEffect(() => {
    socket.on("updateArt", (clients) => {
      setClient(clients);
    });
  });

  useEffect(() => {
    socket.on("clientsLeave", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  console.log("state ", client);

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 50], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <group>
        <Main client={client} />
        <Spinning client={client} />
      </group>
      <Suspense fallback={null}>
        <Lights />

        <Controls />
      </Suspense>
      <Effects />
    </Canvas>
  );
}
