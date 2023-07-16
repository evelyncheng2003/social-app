import './App.css';
import GetUserEventPost from "./components/GetUserEventPost";
import Login from "./components/Login";
import ViewPost from "./components/ViewPost";
import Overlay from "./components/Overlay";
import ToggleSidebar from './components/ToggleSidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllPosts from "./components/ViewAllPosts";
import { React, useState } from "react";


function App() {

  const username = 'Poko'
  const [loginStatus, setLoginStatus] = useState(false);

  const loggedIn = () => {
    setLoginStatus(true);
  }

  if (!loginStatus) {
    return (
      <Login onClick={loggedIn}
        displayerror={true}
      />
    )
  } else {
    return (
      <div>


        <ToggleSidebar />
        <Routes>
          <Route exact path="/posts" element={<ViewAllPosts />} />
          <Route path="/home" element={<Login />} />

        </Routes>

      </div>
    );
  }
}

export default App;
