import React from "react";
import styled from "styled-components";

const Main = styled.div`
  width: 337px;
  height: 260px;
  margin: 25px;
  background-color: #ea9393;
  text-align: center;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-weight: bolder;
  color: #fff;
  font-weight: 300;
  margin: auto;
  padding-top: 10px;
  user-select: none;
`;

const Content = styled.div`
  width: 337px;
  height: 80%;
  transform: translateY(15px);
  background-color: #fff;
  border-radius: 0px 0px 20px 20px;
`;

const Card = ({ title, content, exit }) => {
  return (
    <Main>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Main>
  );
};

export default Card;
