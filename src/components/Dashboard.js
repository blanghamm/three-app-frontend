import React from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Title from "./Title";
import io from "socket.io-client";

const endpoint = "http://localhost:3005/";
const socket = io(endpoint);

const Main = styled.div`
  height: 90%;
  width: 90%;
  align-content: center;
`;

const Dashboard = () => {
  return (
    <Main>
      <Title socket={socket} />
      <Drag socket={socket} />
      <Dragvert socket={socket} />
    </Main>
  );
};

export default Dashboard;
