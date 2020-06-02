import React, { useState, useEffect } from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const P1 = styled(a.p)`
  justify-content: center;
  text-decoration: none;
  user-select: none;
  border-style: none !important;
  z-index: 2;
  display: flex;
  padding: 1em;
  text-align: center;
  font-size: 20px;
  width: 28em;
  color: white;
  font-weight: normal;
  margin: 2em;
`;

const Para = ({ socket, toggle }) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, movement: [x, y] }) =>
      set({ x: down ? x : 0, y: down ? y : 0 }, setActive(x)),

    {
      lockDirection: true,
    }
  );
  const Spawn = () => {
    setCount(Number(!count));
  };
  useEffect(() => {
    socket.emit("updateUserScaleY", count);
    console.log(count);
  }, [count]);
  return (
    <P1 {...bind()} style={{ x }} onClick={Spawn}>
      This interactive art piece is focused around user interaction predefined
      controls, each open control page tab creates a shape in 3D space.
      <br />
      The coloured shapes visible above can be moved to manipulate 3D objects.
      <br />
      Locate the button that will open the 3D environment!
    </P1>
  );
};

export default Para;
