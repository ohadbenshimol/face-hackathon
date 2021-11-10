import React from "react";
import "./App.css";
import LoginForm from "./components/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";
import ParticlesComp from "./components/particles";

function App() {
  return (
    <>
      <ParticlesComp />
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/upload">
              <UploadForm />
            </Route>
            <Route path="*">
              <LoginForm />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
