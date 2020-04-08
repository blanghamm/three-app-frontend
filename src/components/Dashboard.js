import React, { useState } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import io from "socket.io-client";
import Card from "./Card";
import Modal from "styled-react-modal";
import { ModalProvider } from "styled-react-modal";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

const Pop = Modal.styled`
  width: 22.0625em;
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState("");
  const [test, setTest] = useState(false);

  const OpenModal = () => {
    setIsOpen(true);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };

  const OptionSelected = () => {
    console.log(select);
    setTest(true);
    // CloseModal();
  };

  return (
    <ModalProvider>
      <Main>
        <Card
          title={select}
          content={<Drag socket={socket} />}
          openmodal={OpenModal}
          test={test}
        />
        <Card
          title={select}
          content={<Dragvert socket={socket} />}
          openmodal={OpenModal}
          test={test}
        />
        <Card title={select} openmodal={OpenModal} test={test} />

        <Pop isOpen={modalIsOpen} onBackgroundClick={CloseModal}>
          <List
            onMouseDown={() => setSelect("sliders")}
            onMouseUp={OptionSelected}
          >
            sliders
          </List>
          <List
            onMouseDown={() => setSelect("draggable")}
            onMouseUp={OptionSelected}
          >
            draggable
          </List>
          <List
            onMouseDown={() => setSelect("tilt")}
            onMouseUp={OptionSelected}
          >
            tilt
          </List>
          <List
            onMouseDown={() => setSelect("text convert")}
            onMouseUp={OptionSelected}
          >
            text convert
          </List>
          <List
            onMouseDown={() => setSelect("tapping")}
            onMouseUp={OptionSelected}
          >
            tapping
          </List>
        </Pop>
      </Main>
    </ModalProvider>
  );
};

export default Dashboard;
