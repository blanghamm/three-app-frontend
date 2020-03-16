import React, { useState } from "react";
import { useSpring, a } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const Text = styled(a.div)`
  width: 80px;
  align-content: center;
  height: 200px;
  user-select: none;
`;

const H1 = styled(a.a)`
  justify-content: center;
  text-decoration: none;
  font-family: tahoma;
  border-style: none !important;
  font-size: 20px;
  font-weight: bold;
`;

const Title = ({ socket }) => {
  const [count, setCount] = useState(0);
  const Test = () => {
    console.log("collab is pressed");
    setCount(0.05);
    socket.emit("outgoing", count);
  };
  return (
    <Text>
      <H1 onClick={Test}>COLLAB WITH ANYONE</H1>
    </Text>
  );
};

export default Title;
