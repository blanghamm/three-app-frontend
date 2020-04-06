import React, { useState } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import io from "socket.io-client";
import Card from "./Card";
import Empty from "./Emptycard";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

const Main = styled.div`
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

const Dashboard = () => {
  const [show, setShow] = useState(true);
  const Exit = () => {
    console.log("clicked");
    setShow(false);
  };
  return (
    <Main>
      {show ? (
        <Card title="sliders" content={<Drag socket={socket} />} exit={Exit} />
      ) : (
        <Empty />
      )}
      <Card title="draggable" content={<Dragvert socket={socket} />} />
      {/* <Title socket={socket} /> */}
      {/* <Drag socket={socket} /> */}
      {/* <Dragvert socket={socket} />
      <Para socket={socket} /> */}
    </Main>
  );
};

export default Dashboard;
