import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Drag from "./Drag";
import Dragvert from "./Dragvert";
import Para from "./Para";
import Scroll from "./Scroll";
import Title from "./Title";
import Text from "./Text";
import { SocketContext } from "../index";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  user-select: none;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Dashboard = () => {
  const socket = useContext(SocketContext);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.emit("subscribe", "control");
    socket.on("clientsJoined", (clients) => {
      setUsers(clients);
    });
  }, []);

  useEffect(() => {
    socket.on("clientsLeave", (clients) => {
      setUsers(clients);
    });
  }, [socket]);
  console.log("state ", users);

  const [visible, setVisible] = useState(false);
  const textBoxSize = Math.floor(Math.random() * 10 + 2).toString() + "em";

  let index = 0;
  const color = [
    {
      key: index++,
      number: "#fff001",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#ff0101",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#0101fd",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#f9f9f9",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#fff001",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#ff0101",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#0101fd",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#f9f9f9",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#f9f9f9",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#f9f9f9",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#0101fd",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
    {
      key: index++,
      number: "#30303a",
      width: Math.floor(Math.random() * 10).toString() + "em",
      height: Math.floor(Math.random() * 10).toString() + "em",
      movement: Math.floor(Math.random() * 50),
    },
  ];

  return (
    <Main>
      {/* <input type="checkbox" checked={visible} onChange={removeTop}></input> */}
      {!visible && (
        <Main>
          <Title socket={socket} />
          <Text socket={socket} width={textBoxSize} height={textBoxSize} />
          {color.map((list, i) => (
            <Drag
              socket={socket}
              number={list.number}
              key={list.key}
              width={list.width}
              height={list.height}
              movement={list.movement}
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
