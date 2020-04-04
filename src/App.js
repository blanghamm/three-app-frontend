import React, { Suspense } from "react";
import Box from "./three-components/Art";
import Dashboard from "./components/Dashboard";
import Instructions from "./components/Instructions";
import List from "./static/List";
import styled from "styled-components";
import Loading from "./ui/Loading";

import { Switch, Route } from "react-router-dom";

const Mainapp = styled.div`
  display: flex;
  justify-content: center;
  user-zoom: fixed;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

function Waiting() {
  return (
    <Suspense fallback={Loading}>
      <Box />
    </Suspense>
  );
}

function App() {
  return (
    <Mainapp>
      <Switch>
        <Route path="/three">
          <Waiting />
          <List />
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
