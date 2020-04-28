import React, { useState } from "react";
import { a } from "react-spring";
import styled from "styled-components";
import Reward from "react-rewards";

const Text = styled(a.div)`
  width: 80px;
  align-content: center;
  user-select: none;
  color: white;
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
  const [count, setCount] = useState(0.001);
  const Test = () => {
    reward.punishMe();
    setCount(count + 0.001);
    if (count > 0.007) {
      setCount(count === 0.001);
    }
    socket.emit("outgoing", count);
    console.log("count number = " + count);
  };
  return (
    <Text>
      <Reward
        ref={(ref) => {
          reward = ref;
        }}
        type="confetti"
      >
        <H1 onClick={Test}>COLLECTIVE ART</H1>
      </Reward>
    </Text>
  );
};

export default Title;
