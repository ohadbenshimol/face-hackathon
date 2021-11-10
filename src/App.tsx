import React from "react";
import "./App.css";
import LoginForm from "./components/login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UploadForm from "./components/uploadForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/upload">upload</Link>
        <Link to="/login">login</Link>
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/upload">
            <UploadForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
