import React from "react";
import Box from "./components/Art";
import Dashboard from "./components/Dashboard";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/three">
          <Box />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
