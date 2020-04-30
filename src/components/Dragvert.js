import React from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

// const width =

const Blob = styled(a.div)`
  width: 25vw;
  height: 25vh;
  background: blueviolet;
  border-radius: 16px;
  z-index: 2;
  user-select: none;
  justify-content: center;
  align-items: center;
`;

const Dragvert = ({ socket, width, height }) => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [mx, my] }) =>
      set(
        { x: down ? mx : 0, y: down ? my : 0, immediate: down },
        socket.emit("outgoing", my / 1000),
        console.log("test" + my)
      ),
    { bounds: { left: 0, right: 257, top: 0, bottom: 144 } }
  );

  return (
    <Blob
      {...bind()}
      style={{
        x,
        y,
      }}
    ></Blob>
  );
};

export default Dragvert;
