import React, { useState, useEffect } from "react";
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
  let index = 0;
  const data = [
    { key: index++, label: "sliders" },
    { key: index++, label: "draggable" },
    { key: index++, label: "tilt" },
    { key: index++, label: "text convert" },
    { key: index++, label: "tapping" },
  ];

  const [modalIsOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState([]);
  const [selected, setSelected] = useState("");
  const [test, setTest] = useState(true);

  const OpenModal = () => {
    setIsOpen(true);
  };

  const CloseModal = () => {
    setIsOpen(false);
  };

  console.log(selected);

  return (
    <ModalProvider>
      <Main>
        <Card
          title={"select"}
          content={<Drag socket={socket} />}
          openmodal={OpenModal}
          test={test}
        />
        <Card
          title={"select"}
          content={<Dragvert socket={socket} />}
          openmodal={OpenModal}
          test={test}
        />
        <Card title={"select"} openmodal={OpenModal} test={test} />
        {/* fires the click handler a few too many times   */}
        <Pop isOpen={modalIsOpen} onBackgroundClick={CloseModal}>
          {data.map((list) => (
            <List key={list.key} onClick={() => setSelected(list.label)}>
              {list.label}
            </List>
          ))}
        </Pop>
      </Main>
    </ModalProvider>
  );
};

export default Dashboard;
