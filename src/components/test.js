import React, { useEffect, useContext } from "react";
import { SocketContext } from "../index";

export default function Test() {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit("subscribe", "control room");
  });
  return <div>hello</div>;
}
