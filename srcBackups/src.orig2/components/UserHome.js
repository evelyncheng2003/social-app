import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import GetUserEventPost from "./GetUserEventPost";
import Post from "./DisplayAllPosts";

function UserHome({ firstName, lastName, email }) {

    const [data, setData] = useState([]);
    const [submit, setSubmit] = useState(false);

    /*
    const navigate = useNavigate();

    const navigateToPosts = () => {
        navigate('/allposts');
    }
*/
    const allPosts = () => {
        setSubmit(true);
    }


    if (!submit) {
        return (

            <div class="card">
                <div class="card_background_img"></div>
                <div class="card_profile_img"></div>
                <div class="user_details">
                    <h3>{firstName} {lastName}</h3>
                    <p>{email}</p>
                </div>
                <div class="card_count">
                    <div class="count">
                        <div class="fans">
                            <h3>2.4M</h3>
                            <p>Fans</p>
                        </div>
                        <div class="following">
                            <h3>202</h3>
                            <p>Followings</p>
                        </div>
                        <div class="post">
                            <h3>552</h3>
                            <p>Posts</p>
                        </div>
                    </div>

                    <button class="btn" onClick={() => allPosts()}>All Posts</button>

                </div>
            </div>
        )
    } else {
        return (
            <Post />

        )
    }
}

export default UserHome;