import React from "react";
import "./App.css";
import LoginForm from "./components/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";
import ParticlesComp from "./components/particles";
import { Image } from "semantic-ui-react";
import logo from "./logo.png";

function App() {
  return (
    <>
      {/* <ParticlesComp /> */}
      <div className="App">
        <Image
          src={logo}
          wrapped
          style={{ height: "10vh", width: 200, paddingTop: "2vh" }}
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
