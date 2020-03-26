import React, { useState } from "react";
import { a } from "react-spring";
// import { useDrag } from "react-use-gesture";
import styled from "styled-components";

const Text = styled(a.div)`
  width: 80px;
  align-content: center;
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

const Title = ({ socket, TITLES }) => {
  const [count, setCount] = useState(0.001);
  const Test = () => {
    setCount(count + 0.001);
    if (count > 0.007) {
      setCount(count === 0.001);
    }
    socket.emit("outgoing", count);
    console.log("count number = " + count);
  };
  return (
    <Text>
      <H1 onClick={Test}>COLLAB WITH ANYONE</H1>
    </Text>
  );
};

export default Title;
