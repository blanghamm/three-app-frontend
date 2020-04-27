import React, { useState } from "react";
import styled from "styled-components";
import Control from "../three-components/control-components/Control";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Para from "./Para";
import io from "socket.io-client";
import Scroll from "./Scroll";
import colors from "nice-color-palettes";

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

console.log("color " + colors[5]);

let select = Math.floor(Math.random() * 5);

console.log(select);

const Dashboard = () => {
  let index = 0;
  const color = [
    { key: index++, number: "#cdb380", label: "C" },
    { key: index++, number: "#e8ddcb", label: "O" },
    { key: index++, number: "#033649", label: "L" },
    { key: index++, number: "#4B2F3C", label: "L" },
    { key: index++, number: "#1E3947", label: "E" },
    { key: index++, number: "#D82338", label: "C" },
    { key: index++, number: "#C39133", label: "T" },
    { key: index++, number: "#410B23", label: "I" },
    { key: index++, number: "#C86D6D", label: "V" },
    { key: index++, number: "#C86D6D", label: "V" },
    { key: index++, number: "#C86D6D", label: "V" },
    { key: index++, number: "#C86D6D", label: "V" },
  ];
  return (
    <Main>
      {color.map((list) => (
        <Drag
          socket={socket}
          number={list.number}
          key={list.key}
          text={list.label}
        ></Drag>
      ))}

      {/* <Drag socket={socket} number={color2} text="O" />
      <Drag socket={socket} number={color3} text="L" />
      <Drag socket={socket} number={color4} text="L" />
      <Drag socket={socket} number={color5} text="E" />
      <Drag socket={socket} number={color6} text="E" />
      <Drag socket={socket} number={color7} text="E" />
      <Drag socket={socket} number={color8} text="E" /> */}
      {/* <Para socket={socket} /> */}

      {/* does work but the page needs to be scrollable*/}
      {/* <Scroll /> */}
    </Main>
  );
};

export default Dashboard;
