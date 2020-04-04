//Main route, shows initially with a brief introduction into what the project is about.

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: orange;
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

const Button = styled.button`
  font-weight: bold;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin-right: 1.5rem;
  width: 11rem;
  background: transparent;
  color: black;
  border: 2px solid black;
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
        <Link to="/three">
          <Button>View Artwork</Button>
        </Link>
        <Link to="/dashboard">
          <Button>Make your mark</Button>
        </Link>
      </Buttoncontainer>
    </Main>
  );
};

export default Instructions;
