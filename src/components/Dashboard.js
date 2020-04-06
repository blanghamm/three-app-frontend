import React, { useState } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import io from "socket.io-client";
import Card from "./Card";
import Empty from "./Emptycard";
import Modal from "react-modal";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

Modal.setAppElement("#root");

const Main = styled.div`
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

const Pop = styled(Modal)`
  width: 21.0625em;
  height: 17.5em;
  background-color: black;
  justify-content: center;
`;

const Dashboard = () => {
  const [show, setShow] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  const OpenModal = () => {
    setIsOpen(true);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };
  const Exit = () => {
    console.log("clicked");
    setShow(false);
  };

  return (
    <Main>
      {show ? (
        <Card title="sliders" content={<Drag socket={socket} />} exit={Exit} />
      ) : (
        <Empty open={OpenModal} />
      )}
      <Card title="draggable" content={<Dragvert socket={socket} />} />
      <Pop isOpen={modalIsOpen} onRequestClose={CloseModal}></Pop>
    </Main>
  );
};

export default Dashboard;
