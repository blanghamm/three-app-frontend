import React, { useState } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import io from "socket.io-client";
import Card from "./Card";
import Empty from "./Emptycard";
import Modal from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";

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

const Pop = Modal.styled`
  width: 21.0625em;
  height: 20em;
  background-color: #ea9393;
  border-radius: 20px 20px 20px 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  text-align: center;
  margin: 1em;
  color: white;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
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
    <ModalProvider>
      <Main>
        {show ? (
          <Card
            title="sliders"
            content={<Drag socket={socket} />}
            exit={Exit}
          />
        ) : (
          <Empty open={OpenModal} />
        )}
        <Card title="draggable" content={<Dragvert socket={socket} />} />
        <Pop isOpen={modalIsOpen} onBackgroundClick={CloseModal}>
          <List>sliders</List>
          <List>draggable</List>
          <List>tilt</List>
          <List>text convert</List>
          <List>tapping</List>
        </Pop>
      </Main>
    </ModalProvider>
  );
};

export default Dashboard;
