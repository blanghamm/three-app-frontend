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
import { useSprings, a, useSpring } from "react-spring/three";
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

const clock = new THREE.Clock();

const number = 35;
// const colors = [
//   "#A2CCB6",
//   "#FCEEB5",
//   "#EE786E",
//   "#e0feff",
//   "lightpink",
//   "lightblue",
// ];
const shapes = [
  "planeBufferGeometry",
  "planeBufferGeometry",
  "planeBufferGeometry",
];

const data = new Array(number).fill().map(() => {
  const shape = shapes[Math.round(Math.random() * (shapes.length - 1))];
  return {
    shape,
    // color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10],
  };
});

function Main({
  color,
  positionX,
  positionY,
  positionZ,
  input,
  scaleX,
  scaleY,
  scaleZ,
  rotationX,
  rotationY,
  rotationZ,
  client,
}) {
  const refs = useRef([client]);
  const mesh = useRef();
  const group = useRef();
  const tempColor = new THREE.Color();

  useFrame(() => {
    refs.current.position.set(positionX, positionY, positionZ);
    refs.current.scale.x = scaleX;
    refs.current.scale.y = scaleY;
    // refs.current.scale.z = scaleZ;
    refs.current.rotation.set(rotationX, rotationY, rotationZ);
    // });
  });

  return (
    <group ref={group}>
      <group position={[0, 0, 0]}>
        <a.mesh ref={refs}>
          <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
          <a.meshStandardMaterial attach="material" color={color} />
        </a.mesh>
      </group>
    </group>
  );
}

function Dolly() {
  useFrame(({ clock, camera }) => {
    camera.position.set([120, 120, 120]);
    camera.updateProjectionMatrix(
      void (camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30)
    );
  });
  return null;
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.9} />
      <ambientLight intensity={0.1} />
      <rectAreaLight
        intensity={0.5}
        lookAt={[0, 0, 20]}
        position={[0, 0, 200]}
        width={1000}
        height={500}
      ></rectAreaLight>
    </group>
  );
}

export default function Box() {
  const socket = useContext(SocketContext);
  const [client, setClient] = useState([]);
  //Initial loading, updating and leaving sockets
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
  //Incoming rotation sockets
  useEffect(() => {
    socket.on("userRotationX", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("userRotationY", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("userRotationZ", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  //Incoming movement sockets
  useEffect(() => {
    socket.on("updateMovementX", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("updateMovementY", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("updateMovementZ", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  //Incoming scale sockets
  useEffect(() => {
    socket.on("updateScaleX", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("updateScaleY", (clients) => {
      setClient(clients);
    });
  }, [socket]);
  useEffect(() => {
    socket.on("updateScaleZ", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("updateColor", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("actionId", (clients) => {
      setClient(clients);
    });
  }, [socket]);

  console.log("state", client);

  return (
    <Canvas
      concurrent
      camera={{ fov: 35, position: [120, 120, 120] }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl, scene }) => {
        // scene.rotation.set(0, 0, 0);
        scene.position.set(-40, -40, -40);
        gl.setClearColor("#f5f5f5");
        if (client.length > 5) {
          gl.setClearColor("black");
        }
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputEncoding = THREE.sRGBEncoding;
        gl.physicallyCorrectLights = true;
      }}
    >
      <Lights />
      <Controls />
      <group>
        <group>
          {client.map((user, i) => (
            <Main
              key={i}
              color={user.color}
              positionX={user.x}
              positionY={user.y}
              positionZ={user.z}
              scaleX={user.scaleX}
              scaleY={user.scaleY}
              scaleY={user.scaleZ}
              rotationX={user.rotationX}
              rotationY={user.rotationY}
              rotationZ={user.rotationZ}
              input={user.input}
              client={client}
            />
          ))}
        </group>
      </group>
      <Effects />
    </Canvas>
  );
}
