import React, { useState, useEffect } from "react";
import { a } from "react-spring";
import styled from "styled-components";
import Reward from "react-rewards";

const Text = styled(a.div)`
  width: 80px;
  align-content: center;
  user-select: none;
  color: black;
  transition-duration: 0.1s;
  :active {
    opacity: 0.5;
    color: red;
  }
  margin: 10em;
  position: absolute;
`;

const H1 = styled(a.a)`
  justify-content: center;
  text-decoration: none;
  border-style: none !important;
  font-size: 20px;
  font-weight: bold;
`;

const Title = ({ socket, TITLES, reward }) => {
  const [count, setCount] = useState(0.01);
  //Maybe remove the reward me shit as it's cheesy, but need.
  const Spawn = () => {
    setCount(count + 0.03 / Math.random() / 5);
  };
  useEffect(() => {
    socket.emit("updateUserScaleX", count);
    console.log(count);
  }, [count]);
  return (
    <Text>
      <Reward
        ref={(ref) => {
          reward = ref;
        }}
        type="confetti"
      >
        <H1 onClick={Spawn}>COLLECTIVE ART</H1>
      </Reward>
    </Text>
  );
};

export default Title;
