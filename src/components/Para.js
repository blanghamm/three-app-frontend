import React, { useState } from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const P1 = styled(a.p)`
  justify-content: center;
  text-decoration: none;
  user-select: none;
  border-style: none !important;
  z-index: 0;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  color: white;
  margin: 2em;
`;

const Para = ({ socket, toggle }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [x] }) =>
      set({ x: down ? x : 0 }, socket.emit("outgoing", x)),

    { bounds: { left: 0, right: 80, top: -50, bottom: 50 } }
  );
  return (
    <P1
      {...bind()}
      style={{
        x,
      }}
    >
      Collective art is piece designed around interaction design and network
      relations, how we unknowingly collab with others through internet
      technologies.
    </P1>
  );
};

export default Para;
