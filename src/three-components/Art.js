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
  inputX,
  inputY,
  inputZ,
}) {
  const refs = useRef();
  const mesh = useRef();
  const group = useRef();
  const tempColor = new THREE.Color();

  const [active, setActive] = useState(0);

  const { spring } = useSpring({
    spring: input,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const { springX } = useSpring({
    springX: inputX,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const { springY } = useSpring({
    springY: scaleY,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const { springZ } = useSpring({
    springZ: scaleZ,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const time = clock.getElapsedTime();
  const scale = spring.to([0, 1], [1, 5 + time / 100]);
  const rotation = spring.to([0, 1], [0, Math.PI]);
  const position = spring.to([0, 1], [0, scaleX + time / 100]);

  const scaleUserX = springX.to([0, 1], [1, 5]);
  const scaleUserY = springY.to([0, 1], [1, 5]);
  // const scaleUserZ = springZ.to([0, 1], [1, 5]);

  useEffect(() => {
    setInterval(() => {
      setActive((active) => Number(!active));
    }, 3000);
  }, []);

  // useFrame(() => {
  //   if (active < 1) {
  //     group.current.position.y += 0.2;
  //   }
  //   if (active > 0) {
  //     group.current.position.y += -0.2;
  //   }
  // });

  return (
    <group ref={group}>
      <group position={[positionX, positionY, positionZ]}>
        <a.mesh
          ref={refs}
          scale-x={scaleUserX}
          scale-y={scaleUserY}
          scale-z={scaleUserY}
          rotation-x={rotation}
          rotation-x={scaleUserX}
          rotation-z={scaleUserY}
          // scale-z={scaleUserZ}
        >
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
              inputX={user.rotationX}
              inputY={user.rotationY}
              inputZ={user.rotationZ}
              input={user.input}
            />
          ))}
        </group>
      </group>
      <Effects />
    </Canvas>
  );
}
