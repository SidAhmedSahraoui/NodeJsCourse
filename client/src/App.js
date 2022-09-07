import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
// components
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
