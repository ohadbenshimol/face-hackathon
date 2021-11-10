import React from "react";
import "./App.css";
import LoginForm from "./components/login";
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom";
import UploadForm from "./components/uploadForm";

function App() {


    return (
        <div className="App">
            <Router>
                <Link to="/upload">upload</Link>
                <Link to="/login">login</Link>
                <Routes>
                    <Route path="/">
                    </Route>
                    <Route path="/login" element={<LoginForm />}>
                    </Route>
                    <Route path="/upload" element={<UploadForm />}>
                    </Route>
                </Routes>

            </Router>
        </div>

    );
}

export default App;
