import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAltV, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";

const Main = styled.div`
  width: 100vw;
  height: fit-content;
  color: white;
  display: flex;
  flex-direction: row;
  margin: 50;
`;

const H1 = styled.h1`
  padding-left: 1em;
  cursor: pointer;
  transition-duration: 0.1s;
  justify-content: flex-start;
  :active {
    color: #ee786e;
  }
`;

const Box = styled.div`
  transition-duration: 0.1s;
  font-size: 0.825em;
  width: 2em;
  height: 2em;
  background-color: lightpink;
  align-self: flex-start;
  margin: 1.625em;
  :active {
    color: #ee786e;
  }
`;

const BoxOther = styled.div`
  transition-duration: 0.1s;
  width: 2em;
  height: 2em;
  background-color: lightpink;
  margin: 1.625em;
  align-self: flex-end;
  :active {
    color: #ee786e;
  }
`;

const Header = ({ socket }) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const [number, setNumber] = useState(0);
  const Spawn = () => {
    setCount(Number(!count));
    setNumber(number + 1);
  };
  useEffect(() => {
    socket.emit("spawn", count);
  }, [count]);
  return (
    <Main>
      {active ? (
        <div style={{ width: "100vw" }}>
          <H1 onClick={(e) => setActive(false)}>
            Collective Art:{" "}
            <div style={{ color: "lightpink" }}>
              try dragging the coloured blocks
            </div>
          </H1>
        </div>
      ) : (
        <Box onClick={(e) => setActive(true)}>
          <FontAwesomeIcon
            style={{ margin: "auto", padding: "0.5em" }}
            icon={faArrowsAlt}
          />
          click me!
        </Box>
      )}
    </Main>
  );
};

export default Header;
