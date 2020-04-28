import React, { useState } from "react";
import styled from "styled-components";
import Control from "../three-components/control-components/Control";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Para from "./Para";
import io from "socket.io-client";
import Scroll from "./Scroll";
import colors from "nice-color-palettes";
import Title from "./Title";

const endpoint = process.env.REACT_APP_THREE_API_URL;
const socket = io(endpoint);

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

let randoms = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 100)
);

console.log("color " + colors[10]);

const Dashboard = () => {
  let index = 0;
  const color = [
    {
      key: index++,
      number: "#cdb380",
      label: "C",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#e8ddcb",
      label: "O",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#033649",
      label: "L",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#4B2F3C",
      label: "L",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#1E3947",
      label: "E",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#D82338",
      label: "C",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#C39133",
      label: "T",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#410B23",
      label: "I",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#C86D6D",
      label: "V",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#7fc7af",
      label: "V",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#ff9e9d",
      label: "V",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
    {
      key: index++,
      number: "#ff3d7f",
      label: "V",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
    },
  ];

  return (
    <Main>
      <Title socket={socket} />
      {color.map((list) => (
        <Drag
          socket={socket}
          number={list.number}
          key={list.key}
          width={list.width}
          height={list.height}
          // text={list.label}
        ></Drag>
      ))}
    </Main>
  );
};

export default Dashboard;
