import React from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Title from "./Title";
import Para from "./Para";
import io from "socket.io-client";
import Card from "./Card";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

const Main = styled.div`
  height: 90vh;
  width: 90vw;
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Dashboard = () => {
  return (
    <Main>
      <Card title="sliders" content={<Drag socket={socket} />} />
      <Card title="draggable" content={<Dragvert socket={socket} />} />
      {/* <Title socket={socket} /> */}
      {/* <Drag socket={socket} /> */}
      {/* <Dragvert socket={socket} />
      <Para socket={socket} /> */}
    </Main>
  );
};

export default Dashboard;
