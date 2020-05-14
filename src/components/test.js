import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../index";

export default function Test() {
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
      // console.log("from server ", clients);
    });
  }, [socket]);
  console.log("state ", users);

  return (
    <div>
      <div>
        {users.map((id, i) => {
          return <div key={i}>{users[i].id}</div>;
        })}
      </div>
    </div>
  );
}
