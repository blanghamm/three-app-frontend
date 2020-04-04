import React from "react";
import styled from "styled-components";

const Arrowstyle = styled.div`
  background: #fff;
  z-index: 2;
  height: 3px;
  width: 30px;
  margin: 0 auto;
  margin: 50px;
  left: -595px;
  position: relative;
  cursor: pointer;
  transform: rotate(180deg);

  &:before,
  &:after {
    content: "";
    background: #fff;
    position: absolute;
    height: 3px;
    width: 15px;
  }

  &:before {
    right: -3px;
    bottom: -4px;
    transform: rotate(-45deg);
  }

  &:after {
    right: -3px;
    top: -4px;
    transform: rotate(45deg);
  }
`;

const Arrow = () => {
  return <Arrowstyle />;
};

export default Arrow;
