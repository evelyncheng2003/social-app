import './App.css';
import Login from "./components/Login";
import ToggleSidebar from './components/ToggleSidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllPosts from "./components/ViewAllPosts";
import { React, useState } from "react";
import PostOverlayPage from "./components/PostOverlayPage";


function App() {


  return (
    <div>
      <PostOverlayPage />
      <Routes>
        <Route path="/posts" element={<ViewAllPosts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )


}

export default App;
