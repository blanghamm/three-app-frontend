import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import * as THREE from "three";
import { useFrame, Dom } from "react-three-fiber";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";
import Controls from "./Controls";
import { SocketContext } from "../index";
import { Curves } from "three/examples/jsm/curves/CurveExtras";

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
    <group>
      {client.map((particle, i) => {
        const { x, y, z } = particle;
        return (
          <mesh ref={mesh} key={client[i].id} position={[x, y, z]}>
            <boxBufferGeometry attach="geometry" args={[1, 64, 64]} />
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
      })}
      {particles.map((testing, t) => {
        const { x, y, z } = testing;
        return (
          <mesh ref={mesh} key={t} position={[x, y, z]}>
            <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial attach="material" />
          </mesh>
        );
      })}
      {/* {randomRings.map(([pos, matrix], p) => {
        const f = (Math.sin(p / 10) * Math.PI) / 200;
        return (
          <mesh
            ref={mesh}
            key={p}
            position={pos}
            scale={[5 + p * 5 * f, 5 + p * 5 * f, 5 + p * 5 * f]}
            onUpdate={(self) => self.quaternion.setFromRotationMatrix(matrix)}
          >
            <ringBufferGeometry attach="geometry" args={[1, 1.01, 64]} />
            <meshBasicMaterial attach="material" />
          </mesh>
        );
      })} */}
    </group>
  );
}

function Content({ props, thing, client }) {
  // const particles = useMemo(() => {
  //   const temp = [];
  //   for (let i = 0; i < 150; i++) {
  //     const x = (i % 30) * 50.05;
  //     const y = Math.floor(i / 30) * 10.05;
  //     const z = 0;
  //     temp.push({ x, y, z });
  //   }

  //   return temp;
  // }, []);

  // console.log("in array ", particles);

  const mesh = useRef();
  const colorthings = 2 * 0xffffff;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    client.forEach((particle, i) => {
      const { x, y, z } = particle;
      dummy.position.set(x, y, z);
      dummy.scale.set(0.5, 0.5, 0.5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <a.instancedMesh
        {...props}
        key={client}
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
  const [thing, setThing] = useState(0);
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
      camera={{ position: [0, 0, 70], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
      }}
    >
      <Suspense fallback={null}>
        <Lights />
        {/* <Content thing={thing} count={150} client={client} /> */}
        <Starter client={client} count={30} />
        <Controls />
      </Suspense>
      <Effects />
    </Canvas>
  );
}
