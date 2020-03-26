import React from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const Blob = styled(a.div)`
  width: 160px;
  height: 80px;
  background: blueviolet;
  border-radius: 16px;
  user-select: none;
  justify-content: center;
  align-items: center;
`;

const Dragvert = ({ socket }) => {
  const [{ y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [mx, my] }) =>
      set(
        { x: down ? mx : 0, y: down ? my : 0, immediate: down },
        socket.emit("outgoing", my / 1000),
        console.log("test" + my)
      ),
    { bounds: { left: 0, right: 200, top: 0, bottom: 20 } }
  );

  return (
    <Blob
      {...bind()}
      style={{
        y
      }}
    ></Blob>
  );
};

export default Dragvert;
