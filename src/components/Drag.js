import React, { useState, useEffect } from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const height = window.innerHeight;

const colors = [
  "#A2CCB6",
  "#FCEEB5",
  "#EE786E",
  "#e0feff",
  "lightpink",
  "lightblue",
];

const Blob = styled(a.div)`
  z-index: 2;

  text-align: center;
  overflow: hidden;
  outline-color: black;
  outline: none;
`;

const Text = styled.div`
  color: black;
  height: fit-content;
  font-size: 18px;
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
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);
  console.log(active);
  const [{ x, y, opacity }, set] = useSpring(() => ({
    config: {
      mass: 5,
      tension: 400,
      friction: 50,
      precision: 0.0001,
    },
    x: 0,
    y: 0,
  }));
  const bind = useDrag(
    ({ down, movement: [x, y], cancel }) =>
      set(
        { x: down ? x : 0, y: down ? y : 0, immediate: down },
        socket.emit(specificFromParent, (x + y) / 1000)
      ),
    {
      initial: () => [x.get(), 0],
      lockDirection: true,
    }
  );

  console.log("count", count);

  useEffect(() => {}, [count]);

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
    ></Blob>
  );
};

export default Drag;
