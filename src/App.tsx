import React from "react";
import "./App.css";
import LoginForm from "./components/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";

function App() {
  return (
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
  );
}

export default App;
