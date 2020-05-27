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
import { MeshToonMaterial, Points } from "three";

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

function Main({ props, client, position }) {
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { x, y, z } = position;
  const particles = useMemo(() => {
    const { input } = position;
    let radius = 5.5;
    let angle = 0;
    let step = Math.PI / 5;

    const temp = [];
    for (let i = 0; i < input; i++) {
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = 0;
      temp.push({ x, y, z });
      angle += step;
    }

    return temp;
  });

  const mesh = useRef();
  const orbit = useRef();
  const colorthings = 2 * 0xffffff;

  const rotation = 0.03;

  // const distance = useMemo(() =>{
  // })

  // useFrame(() => {

  //     const { x, y, z } = particle;
  //     dummy.position.set(x, y, z);
  //     dummy.scale.set(0.5, 0.5, 0.5);
  //     dummy.updateMatrix();
  //     mesh.current.setMatrixAt(i, dummy.matrix);
  //   });
  //   mesh.current.instanceMatrix.needsUpdate = true;
  // });

  // useFrame(() => {
  //   mesh.current.rotation.set(
  //     Math.floor(Math.random()) * 0.05,
  //     Math.floor(Math.random()) * 0.02,
  //     Math.floor(Math.random()) * 5.09
  //   );
  //   mesh.current.needsUpdate = true;
  // });
  // const distance = useMemo(() => {
  //   const temp = [];
  //   client.map((value, i) => {
  //     const stuff = Object.values(client).map((value) => value.x);
  //     console.log("value ", stuff);
  //   });
  // }, []);

  const xValue = Object.values(client).map((value) => value.x);
  const yValue = Object.values(client).map((value) => value.y);
  console.log("value ", xValue);

  const points = [];
  for (let i = 0; i < xValue.length; i++) {
    points.push(new THREE.Vector3(xValue[i], yValue[i], 0));
    points.push(new THREE.Vector3(xValue[i], yValue[i], 0));
  }

  if (client.length - 1) {
    points.pop(new THREE.Vector3());
  }

  console.log("how vectors", points);

  const path = new THREE.CatmullRomCurve3(points);

  const geometry = new THREE.TubeBufferGeometry(path, 100, 0.1, 30, true);

  useFrame(() => {
    mesh.current.rotation.x += rotation;
    orbit.current.rotation.y += 0.05;
  });

  return (
    <group>
      <mesh geometry={geometry} onUpdate={(self) => self.updateMatrix()}>
        <meshStandardMaterial color="white" attach="material" />
      </mesh>
      <group ref={mesh} position={[x, y, z]}>
        <a.mesh ref={orbit}>
          <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.75}
            metalness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
          {particles.map((particle, i) => {
            const { x, y, z } = particle;
            return (
              <a.mesh key={i} position={[x, y, z]}>
                <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
                <meshStandardMaterial
                  attach="material"
                  color="white"
                  roughness={0.75}
                  metalness={0.2}
                  clearcoat={1}
                  clearcoatRoughness={0.2}
                />
              </a.mesh>
            );
          })}
        </a.mesh>
      </group>
    </group>
  );
}

// function Line() {
//   const points = [];
//   points.push(new THREE.Vector3(0, 0, 0));
//   points.push(new THREE.Vector3(50, 0, 0));
//   console.log(points);
//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   const material = new THREE.LineBasicMaterial({
//     color: new THREE.Color("blue"),
//   });

//   return (
//     <line
//       geometry={geometry}
//       material={material}
//       onUpdate={(self) => self.updateMatrix()}
//     />
//   );
// }

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
      <pointLight intensity={0.9} position={[150, 150, 150]} />
      <ambientLight intensity={0.2} position={[150, 150, 150]} />
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
  }, []);

  useEffect(() => {
    socket.on("updateArt", (clients) => {
      setClient(clients);
    });
  }, []);

  useEffect(() => {
    socket.on("clientsLeave", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("actionId", (clients) => {
      setClient(clients);
    });
  }, []);
  console.log("state ", client);

  return (
    <Canvas
      shadowMap
      camera={{ position: [0, 0, 25], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.setClearColor("black");
      }}
    >
      <group>
        {client.map((users, i) => (
          <Main key={i} position={users} client={client} />
        ))}
      </group>
      <Suspense fallback={null}>
        <Lights />
        {/* <Line /> */}

        <Controls />
      </Suspense>
      {/* <Effects /> */}
    </Canvas>
  );
}
