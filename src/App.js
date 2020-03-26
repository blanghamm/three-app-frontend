import React from "react";
import Box from "./three-components/Art";
import Dashboard from "./components/Dashboard";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

const Mainapp = styled.div`
  display: flex;
  justify-content: center;
  user-zoom: fixed;
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <Mainapp>
      <Switch>
        <Route path="/three">
          <Box />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Mainapp>
  );
}

export default App;
