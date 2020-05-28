import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import * as THREE from "three";
import { useFrame, Dom, useThree, extend } from "react-three-fiber";
import { Canvas as c } from "react-three-fiber";
import styled from "styled-components";
import { useSpring, a } from "react-spring/three";
import Effects from "./Effects";
import Controls from "./Controls";
import { SocketContext } from "../index";
import niceColors from "nice-color-palettes";

const Canvas = styled(c)`
  box-sizing: border-box;
  height: 100;
  width: 100;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

function Main({ props, client, input, color }) {
  const refs = useRef([client]);
  const group = useRef();
  const tempColor = new THREE.Color();
  const colors = new Array(1000)
    .fill()
    .map(() => niceColors[10][Math.floor(Math.random() * 5)]);

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(1000)
          .fill()
          .flatMap((_, i) => tempColor.set(colors[i]).toArray())
      ),
    []
  );

  useEffect(() => {
    refs.current = refs.current.slice(0, client.length);
  }, [client]);

  console.log("refs test ", refs);

  const particles = useMemo(() => {
    const temp = [];
    //Need to assign the correct ref to the input
    let radius = 5.5;
    let angle = 0;
    let step = Math.PI / 5;

    for (let i = 0; i < input; i++) {
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const z = 0;
      temp.push({ x, y, z });
      angle += step;
    }

    return temp;
  });

  useFrame(({ clock }) => {
    client.map((user, i) => {
      const { rotation, input, aiMovement, id, scale } = user;
      refs.current[i].rotation.y += rotation;
      refs.current[i].scale.set(scale + 10, scale + 1, scale + 1);
      if (id === null) {
        // refs.current[i].rotation.y += aiMovement;
        // refs.current[i].rotation.x += aiMovement;
        // refs.current[i].rotation.z += aiMovement;
      }
    });
  });

  return (
    <group ref={group}>
      {client.map((users, i) => {
        const { x, y, z, name, color } = users;
        return (
          <a.mesh
            {...props}
            key={i}
            ref={(test) => (refs.current[i] = test)}
            position={[x, y, z]}
          >
            <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
            <meshStandardMaterial
              attach="material"
              color={color}
              roughness={1}
              clearcoat={0.5}
              clearcoatRoughness={1}
              flatShading={true}
              side={THREE.DoubleSide}
            />
          </a.mesh>
        );
      })}

      {particles.map((particle, i) => {
        const { x, y, z } = particle;
        return (
          <a.mesh
            key={i}
            ref={(test) => (refs.current[i] = test)}
            position={[x, y, z]}
          >
            <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
            <meshStandardMaterial
              attach="material"
              color="black"
              flatShading={true}
            />
          </a.mesh>
        );
      })}
    </group>
  );
}

function Dolly() {
  useFrame(({ clock, camera }) => {
    camera.updateProjectionMatrix(
      void (camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30)
    );
  });
  return null;
}

function BottomBox() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
      <meshStandardMaterial attach="material" color={"red"} />
    </mesh>
  );
}

function Lights() {
  const pointLight = useRef();
  return (
    <group>
      <pointLight
        ref={pointLight}
        intensity={600}
        position={[10, 50, 400]}
      ></pointLight>
      <ambientLight color="white" intensity={0.2} />
    </group>
  );
}

export default function Box() {
  const socket = useContext(SocketContext);
  const [client, setClient] = useState([]);
  const [color, setColor] = useState("#0101fd");

  useEffect(() => {
    socket.on("updateOnLoad", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateArt", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("clientsLeave", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("actionId", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("userIsRotating", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateMovement", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateNickName", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateNickName", (clients) => {
      client.map((user, i) => {
        setColor(user.color);
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateScale", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  console.log("state ", client);

  return (
    <Canvas
      concurrent
      camera={{ fov: 50, position: [10, 5, 10], near: 30, far: 1500 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl, scene }) => {
        // scene.rotation.set(Math.PI / 8, Math.PI / 4, 0);
        scene.position.set(-162, -168, -150);
        gl.setClearColor("#f5f5f5");
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.physicallyCorrectLights = true;
      }}
    >
      <Lights />
      {/* <Dolly /> */}
      <Controls />
      <Main client={client} color={color} />
      {/* <BottomBox /> */}
      <Effects />
    </Canvas>
  );
}
