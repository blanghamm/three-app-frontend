import React, { useState } from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const height = window.innerHeight;

const Blob = styled(a.div)`
  width: 20em;
  height: 20em;
  z-index: 2;
  justify-content: center;
  text-align: center;
`;

const Text = styled.h1`
  color: white;
  display: inline-block;
  font-size: 15vmin;
`;

const Drag = ({ socket, text, number }) => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, offset: [x, y], cancel }) =>
      set({ x, y, immediate: down }, socket.emit("outgoing", (x + y) / 1000)),
    {
      bounds: { left: height, right: 257, top: 0, bottom: 208 },
      lockDirection: true,
    }
  );

  return (
    <Blob {...bind()} style={{ backgroundColor: number, x, y }}>
      <Text>{text}</Text>
    </Blob>
  );
};

export default Drag;
