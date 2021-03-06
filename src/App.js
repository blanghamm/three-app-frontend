import React from "react";
import Box from "./three-components/Art";
import Dashboard from "./components/Dashboard";
import Test from "./components/test";
import Instructions from "./components/Instructions";
import List from "./static/List";
import styled from "styled-components";

import { Switch, Route } from "react-router-dom";

const Mainapp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  user-zoom: fixed;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

function App() {
  return (
    <Mainapp>
      <Switch>
        <Route exact path="/">
          <Dashboard />
          {/* <List /> */}
        </Route>
        <Route path="/three">
          <Box />
        </Route>
      </Switch>
    </Mainapp>
  );
}

export default App;
