import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Para from "./Para";
import Scroll from "./Scroll";
import Title from "./Title";
import Text from "./Text";
import { SocketContext } from "../index";
import { Link } from "react-router-dom";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  user-select: none;
  background-color: #303033;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Dashboard = () => {
  const socket = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const textBoxSize = Math.floor(Math.random() * 10 + 2).toString() + "em";
  const removeTop = () => {
    setVisible(!visible);
  };

  let index = 0;
  const color = [
    {
      key: index++,
      number: "#cdb380",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#e8ddcb",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#033649",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#4B2F3C",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#1E3947",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#D82338",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#C39133",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#410B23",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#C86D6D",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#7fc7af",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#ff9e9d",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#ff3d7f",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
  ];

  return (
    <Main>
      {/* <input type="checkbox" checked={visible} onChange={removeTop}></input> */}
      {!visible && (
        <Main>
          <Title socket={socket} />
          <Text socket={socket} width={textBoxSize} height={textBoxSize} />

          {color.map((list) => (
            <Drag
              socket={socket}
              number={list.number}
              key={list.key}
              width={list.width}
              height={list.height}
            ></Drag>
          ))}
          <Para socket={socket} />
          {/* <Dragvert socket={socket} style={{ zIndex: 0 }} /> */}
        </Main>
      )}
    </Main>
  );
};

export default Dashboard;
