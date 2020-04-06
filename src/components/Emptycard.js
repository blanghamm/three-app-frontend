import React from "react";
import styled from "styled-components";
import { ReactComponent as Pluscircle } from "../assets/plus-circle.svg";

const Main = styled.div`
  width: 21.0625em;
  height: 17.5em;
  margin: 1.5625em;
  background-color: #ea9393;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Icon = styled(Pluscircle)`
  color: white;
  width: 2.25em;
  height: 2.25em;
  padding: 7.65em;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const Empty = () => {
  return (
    <Main>
      <Icon></Icon>
    </Main>
  );
};

export default Empty;
