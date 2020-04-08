import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Xcircle } from "../assets/x-circle.svg";
import { ReactComponent as Pluscircle } from "../assets/plus-circle.svg";

const IconCircle = styled(Pluscircle)`
  color: white;
  width: 4.25em;
  height: 4.25em;
  margin: auto;
`;

const MainEmpty = styled.div`
  width: 21.0625em;
  height: 17.5em;
  margin: 1.5625em;
  background-color: #ea9393;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
`;

const Main = styled.div`
  width: 21.0625em;
  height: 17.5em;
  margin: 1.5625em;
  background-color: #fff;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  background-color: #ea9393;
  user-select: none;
  height: 3.5em;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
`;

const Content = styled.div`
  width: 21.0625em;
  height: 14em;
`;

const Icon = styled(Xcircle)`
  color: white;
  position: absolute;
  float: left;
  width: 2.25em;
  height: 2.25em;
  padding: 0.625em;
`;

const Text = styled.div`
  text-align: center;
  font-weight: bold;
  color: white;
  font-size: 1.7em;
  margin-top: 0;
  padding: 0.375em;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Populatedcard = ({ title, content, exit }) => {
  return (
    <Main>
      <Title>
        <Icon onClick={exit}></Icon>
        <Text>{title}</Text>
      </Title>
      <Content>{content}</Content>
    </Main>
  );
};

const Emptycard = ({ open }) => {
  return (
    <MainEmpty>
      <IconCircle onClick={open}></IconCircle>
    </MainEmpty>
  );
};

export default function Card({ open, title, content, openmodal, test }) {
  const [show, setShow] = useState(test);
  const Exit = () => {
    setShow(false);
  };
  return (
    <div>
      {show ? (
        <Populatedcard
          open={open}
          title={title}
          content={content}
          exit={Exit}
        />
      ) : (
        <Emptycard open={openmodal} />
      )}
    </div>
  );
}
