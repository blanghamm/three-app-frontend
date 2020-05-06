import React, { useEffect, useContext } from "react";
import { SocketContext } from "../index";

export default function Test() {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit("spawn", 1);
  });
  return <div>hello</div>;
}
