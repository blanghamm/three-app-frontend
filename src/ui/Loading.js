//Add animation with spring for a little load page between instructions and artwork

import React from "react";
import styled from "styled-components";

const Black = styled.div`
  background-color: black;
`;

const Loading = () => {
  return (
    <Black>
      <h1>Loading...</h1>
    </Black>
  );
};

export default Loading;
