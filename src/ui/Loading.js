//Add animation with spring for a little load page between instructions and artwork

import React from "react";
import styled from "styled-components";

const Black = styled.div`
  background-color: black;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Loading = () => {
  return (
    <Black>
      <Title>Loading...</Title>
    </Black>
  );
};

export default Loading;
