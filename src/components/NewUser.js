import NewUserLogin from './NewUserLogin';
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllPosts from "./ViewAllPosts";
import { React, useState } from "react";
import CreatePost from "./CreatePost";
import { MyContext } from "./MyContext";


function NewUser() {

    const [user, setUser] = useState("");
    const [postId, setPostId] = useState(0);

    return (
        <div>
            <MyContext.Provider value={{ user: [user, setUser], postId: [postId, setPostId] }}>
                <Routes>
                    <Route path="/posts" element={<ViewAllPosts />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/*" element={<NewUserLogin
                        displayerror={0} />} />
                </Routes>
            </MyContext.Provider>
        </div>
    )
}

export default NewUser;