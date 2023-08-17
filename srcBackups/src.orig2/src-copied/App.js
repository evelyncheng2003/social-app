import './App.css';
import Login from "./components/Login";
import ToggleSidebar from './components/ToggleSidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllPosts from "./components/ViewAllPosts";
import { React, useState } from "react";
import CreatePost from "./components/CreatePost";
import { MyContext } from "./components/MyContext";


function App() {
  const [user, setUser] = useState("");
  const value = { user, setUser }

  return (
    <div>
      <MyContext.Provider value={value}>
        <Routes>
          <Route path="/posts" element={<ViewAllPosts />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<Login
            displayerror={0} />} />
        </Routes>
      </MyContext.Provider>

    </div>
  )


}

export default App;
