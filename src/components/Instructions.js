//Main route, shows initially with a brief introduction into what the project is about.

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
`;

const Title = styled.div`
  margin-left: 80px;
  justify-content: center;
  align-content: center;
`;

const Para = styled.div`
  margin-left: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-content: center;
  width: 250px;
`;

const Primary = styled.h1`
  font-weight: bolder;
  margin: 0;
`;

const Secondary = styled.h2`
  font-weight: normal;
  margin: 0;
`;

const Buttoncontainer = styled.div`
  margin-left: 80px;
  justify-content: center;
  align-content: center;
`;

const Button = styled(Link)`
  font-weight: bold;
  text-transform: lowercase;
  display: inline-block;
  text-decoration-line: none;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin-right: 1.5rem;
  width: 11rem;
  background: transparent;
  color: black;
  border: 2px solid black;
  outline-color: black;
  text-align: center;
`;

const Instructions = () => {
  return (
    <Main>
      <Title>
        <Primary>Collabrative Piece</Primary>
        <Secondary>Digital Media Design Final Year Project</Secondary>
      </Title>
      <Para>
        <p>
          Consectetur ex nulla voluptate dolore. Dolore dolor elit reprehenderit
          mollit mollit id fugiat in consequat nisi incididunt labore. Nisi duis
          ipsum exercitation eiusmod sit veniam anim eu consectetur eu nulla
          laborum. Veniam ex adipisicing ipsum eu ea commodo commodo tempor
          nostrud. Adipisicing ipsum anim tempor nulla ea in veniam qui in
          occaecat.
        </p>
      </Para>
      <Buttoncontainer>
        <Button to="/three">View Artwork</Button>
        <Button to="/dashboard">Make your mark</Button>
      </Buttoncontainer>
    </Main>
  );
};

export default Instructions;
