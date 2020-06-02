import React, { useState, useEffect } from "react";
import styled from "styled-components";
import link, { Link } from "react-router-dom";

const Main = styled.div`
  width: 100vw;
  height: fit-content;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 50;
`;

const H1 = styled.h1`
  padding-left: 1em;
  cursor: pointer;
  transition-duration: 0.1s;
  :active {
    color: #ee786e;
  }
`;

const H2 = styled.h1`
  padding-left: 0.5em;
  transition-duration: 0.1s;
  :active {
    color: #ee786e;
  }
`;

const Header = ({ socket }) => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  //Maybe remove the reward me shit as it's cheesy, but need.
  const Spawn = () => {
    setCount(Number(!count));
    setNumber(number + 1);
  };
  useEffect(() => {
    socket.emit("spawn", count);
    console.log(count);
  }, [count]);
  return (
    <Main>
      <H1 onClick={Spawn}>Collective</H1>
      <Link
        style={{
          textDecorationLine: "none",
          textDecoration: "none",
          color: "white",
        }}
        to="/three"
        target="_blank"
      >
        <H2>Art</H2>
      </Link>
      {number === 0 ? (
        <div></div>
      ) : (
        <H1 onClick={(e) => setNumber(0)}>+{number}</H1>
      )}
    </Main>
  );
};

export default Header;
