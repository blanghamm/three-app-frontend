import React from "react";
import styled from "styled-components";
import { ReactComponent as Xcircle } from "../assets/x-circle.svg";

const Main = styled.div`
  width: 337px;
  height: 17.5em;
  margin: 25px;
  background-color: #fff;
  text-align: center;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  background-color: #ea9393;
  user-select: none;
  height: 3.5em;
  border-radius: 20px 20px 0px 0px;
`;

const Content = styled.div`
  width: 337px;
  height: 14em;
  border-radius: 0px 0px 20px 20px;
`;

const Icon = styled(Xcircle)`
  color: white;
  position: relative;
  float: left;
  width: 2.25em;
  height: 2.25em;
  margin: auto;
  padding: 0.625em;
`;

const Text = styled.div`
  text-align: center;
  font-size: 1.7em;
  margin-top: 0;
  padding: 0.375em;
`;

const Card = ({ title, content, exit }) => {
  return (
    <Main>
      <Icon />
      <Title>
        <Text>{title}</Text>
      </Title>
      <Content>{content}</Content>
    </Main>
  );
};

export default Card;
