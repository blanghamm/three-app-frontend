import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Arrowstyle = styled.div`
  background: #fff;
  z-index: 2;
  height: 3px;
  width: 30px;
  margin: 0 auto;
  margin: 50px;
  position: relative;
  cursor: pointer;
  transform: rotate(180deg);
  transition: color 0.2s, transform 0.2s;
  transition-property: color, transform;
  transition-duration: 0.2s, 0.2s;
  transition-timing-function: ease, ease;
  transition-delay: 0s, 0s;

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
  return (
    <Link to="/">
      <Arrowstyle />
    </Link>
  );
};

export default Arrow;
