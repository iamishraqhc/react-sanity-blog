import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AllPosts, OnePost } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AllPosts />} path="/" exact />
        <Route element={<OnePost />} path="/:slug" exact />
      </Routes>
    </Router>
  );
};

export default App;
