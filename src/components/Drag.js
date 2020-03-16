import React from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const Blob = styled(a.div)`
  width: 80px;
  height: 80px;
  background: hotpink;
  border-radius: 16px;
`;

const Drag = ({ socket }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [mx, my] }) =>
      set(
        { x: down ? mx : 0, y: down ? my : 0, immediate: down },
        socket.emit("outgoing", mx / 1000),
        console.log("mx value " + mx)
      ),
    { bounds: { left: 0, right: 80, top: -50, bottom: 50 } }
  );

  return (
    <Blob
      {...bind()}
      style={{
        x
      }}
    />
  );
};

export default Drag;
