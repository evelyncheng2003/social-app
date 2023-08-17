import './App.css';
import Login from "./components/Login";
import ToggleSidebar from './components/ToggleSidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllPosts from "./components/ViewAllPosts";
import { React, useState } from "react";
import CreatePost from "./components/CreatePost";
import { MyContext } from "./components/MyContext";
import OverlayContent from "./components/OverlayContent";
import ProviderWrapComments from './components/ProviderWrapComponents';


function App() {
  const [user, setUser] = useState("");
  const [postId, setPostId] = useState(0);
  // const value1 = { user, setUser }
  // const value2 = { postId, setPostId }

  return (
    <div>
      <MyContext.Provider value={{ user: [user, setUser], postId: [postId, setPostId] }}>
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
