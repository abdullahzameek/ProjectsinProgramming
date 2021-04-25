import React from "react";
import AppBar from "./components/AppBar";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//there's two primary components - the landing page and the page that holds the tree cards.
function App() {
  return (
    <>
      <Router>
        <AppBar />
        <Route exact path="/" component={Landing} />
      </Router>
    </>
  );
}

export default App;
