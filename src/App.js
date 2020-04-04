import React from "react";
import Box from "./three-components/Art";
import Dashboard from "./components/Dashboard";
import Instructions from "./components/Instructions";
import Arrow from "./ui/Arrow";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
          <Link to="/">
            <Arrow />
          </Link>
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Instructions />
        </Route>
      </Switch>
    </Mainapp>
  );
}

export default App;
