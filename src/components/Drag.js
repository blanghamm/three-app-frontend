import React, { useState } from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const height = window.innerHeight;

const Blob = styled(a.div)`
  z-index: 2;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  outline-color: black;
  outline: 0.325em solid;
`;

const Text = styled.div`
  color: black;
  font-size: 10px;
  margin: 0;
  line-height: 0.025em;
  font-weight: bold;
`;

const Drag = ({
  socket,
  text,
  number,
  width,
  height,
  movement,
  specificFromParent,
}) => {
  const [{ x, y, opacity }, set] = useSpring(() => ({
    config: { duration: 4000 },
    x: 0,
    y: 0,
  }));
  const bind = useDrag(
    ({ down, movement: [x, y], cancel }) =>
      set(
        { x: down ? x : 0, y: down ? y : 0, immediate: down },
        socket.emit(specificFromParent, Math.abs((x + y) / 100000))
      ),
    {
      initial: () => [x.get(), 0],
      lockDirection: true,
    }
  );

  return (
    <Blob
      {...bind()}
      style={{
        backgroundColor: number,
        x,
        y,
        width: width,
        height: height,
        opacity,
      }}
    >
      <Text>{text}</Text>
    </Blob>
  );
};

export default Drag;
