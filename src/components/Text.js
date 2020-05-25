import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  z-index: 2;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  :focus {
    outline: none;
  }
  outline-color: black;
  outline: 0.325em solid;
  cursor: default;
`;

const Text = ({ socket, width, height }) => {
  const [value, setValue] = useState("");
  const [number, setNumber] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
    setNumber(value.length);
  };

  const handleSubmit = (event) => {
    socket.emit("outgoing", number);
    event.preventDefault();
    setValue("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          style={{ width: width, height: height }}
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
        ></Input>
      </form>
    </div>
  );
};

export default Text;
