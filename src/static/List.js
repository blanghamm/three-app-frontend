import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Aist = styled(Link)`
  color: white;
  position: relative;
  margin-right: 20px;
  text-decoration-line: none;
  transition: color 0.2s, transform 0.2s;
  &:hover {
    color: orange;
    transform: translate(0px, -2px);
    /* Translate doesn't seem to work at the moment, need to sort it */
  }
`;

const ListMain = styled.div`
  z-index: 2;
  margin: 50px;
  justify-content: center;
  text-decoration-line: none;
`;

const List = () => {
  return (
    <ListMain>
      <Aist to="/">instructions</Aist>
      <Aist to="/dashboard">controls</Aist>
    </ListMain>
  );
};

export default List;
