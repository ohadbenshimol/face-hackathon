import React from "react";
import "./App.css";
import LoginForm from "./components/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";
import ParticlesComp from "./components/particles";
import { Menu, Image } from "semantic-ui-react";

function App() {
  return (
    <>
      <ParticlesComp />
      <div className="App">
        <Image
          src="assets/logo.svg"
          size="large"
          wrapped
          style={{ height: "15vh" }}
        />
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
