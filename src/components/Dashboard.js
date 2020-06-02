import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Para from "./Para";
import Scroll from "./Scroll";
import Title from "./Title";
import Text from "./Text";
import Header from "./Header";
import { SocketContext } from "../index";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  user-select: none;
  background-color: #3d4447;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  flex-basis: 80%;
`;

const Content = styled.div`
  height: fit-content;
  width: 100vw;
  user-select: none;
  background-color: #3d4447;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  flex-basis: 80%;
`;

const Dashboard = () => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit("subscribe", "control");
  }, [socket]);

  const [visible, setVisible] = useState(false);
  const textBoxSize = Math.floor(Math.random() * 10 + 2).toString() + "em";

  const colors = [
    "#A2CCB6",
    "#FCEEB5",
    "#EE786E",
    "#e0feff",
    "lightpink",
    "lightblue",
  ];

  let index = 0;
  const color = [
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserMovementX",
      name: "updateUserRotationX",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserMovementY",
      name: "updateUserScaleY",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserMovementZ",
      name: "updateUserScaleZ",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserRotationX",
      name: "updateUserMovementX",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserRotationY",
      name: "updateUserScaleX",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserRotationZ",
      name: "updateUserMovementY",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserScaleX",
      name: "updateUserRotationY",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserScaleY",
      name: "updateUserRotationZ",
    },
    {
      key: index++,
      number: colors[Math.floor(Math.random() * (colors.length - 1))],
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
      control: "updateUserScaleZ",
      name: "updateUserMovementX",
    },
    // {
    //   key: index++,
    //   number: colors[Math.floor(Math.random() * (colors.length - 1))],
    //   width: Math.floor(Math.random() * 10).toString() + "em",
    //   height: Math.floor(Math.random() * 10).toString() + "em",
    //   movement: Math.floor(Math.random() * 50),
    //   control: "updateUserRotationX",
    // },
    // {
    //   key: index++,
    //   number: colors[Math.floor(Math.random() * (colors.length - 1))],
    //   width: Math.floor(Math.random() * 10).toString() + "em",
    //   height: Math.floor(Math.random() * 10).toString() + "em",
    //   movement: Math.floor(Math.random() * 50),
    //   control: "updateUserRotationX",
    // },
    // {
    //   key: index++,
    //   number: colors[Math.floor(Math.random() * (colors.length - 1))],
    //   width: Math.floor(Math.random() * 10).toString() + "em",
    //   height: Math.floor(Math.random() * 10).toString() + "em",
    //   movement: Math.floor(Math.random() * 50),
    //   control: "updateUserRotationX",
    // },
  ];

  return (
    <Main>
      <Header socket={socket} />
      <Content>
        {color.map((list, i) => (
          <Drag
            style={{ zIndex: 5 }}
            socket={socket}
            number={list.number}
            key={list.key}
            width={list.width}
            height={list.height}
            movement={list.movement}
            specificFromParent={list.control}
            text={list.name}
          ></Drag>
        ))}
      </Content>
      <Content>
        <Para socket={socket}></Para>
      </Content>
    </Main>
  );
};

export default Dashboard;
