import { React, useState } from "react";
import GetUserEventPost from "./GetUserEventPost";
import UserHome from "./UserHome";
import Post from "./DisplayAllPosts";
import Overlay from "./Overlay";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViewAllPosts from "./ViewAllPosts";
import ToggleSidebar from './ToggleSidebar';


function Login({ displayerror }) {
    const [password, setPassword] = useState("");
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState([]);
    const [overlayId, setOverlayId] = useState(0);

    const [singlePost, setSinglePost] = useState({
        postId: 0,
        postTitle: "",
        postDesc: "",
        postCreator: ""
    });

    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    const [loginstatus, setLoginStatus] = useState(true);

    const like = (post_id) => {
        console.log(post_id);
        if (count == 0) {
            setCount(count => count + 1);
        }
    }

    let currentTimestamp = Date.now();

    const unixtime_to_date = (ts) => {
        let date = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }).format(currentTimestamp);

        return date;
    }

    const seeOverlayPost = (post_obj) => {
        console.log('Login() seeOverlayPost postid = ' + post_obj.postId);
        setOverlayId(post_obj.postId);
        setClick(true);
    }


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            nickname: nickname
        })
    };

    const validateInput = () => {
        console.log("input good");
    }

    const seeAllPosts = () => {
        fetch('http://MySocial-rest-api-service-env.eba-ukimrmpq.us-west-1.elasticbeanstalk.com:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setPost(data));
    }


    const handlePost = () => {
        validateInput();
        fetch('http://MySocial-rest-api-service-env.eba-ukimrmpq.us-west-1.elasticbeanstalk.com:9000/api/users/create', requestOptions)
            .then(response => {
                setSubmit(true)
                setError(response.status)
                if (!response.ok) {
                    setLoginStatus(false);
                    //    throw new Error(`HTTP Error. Status is ${response.status}`);
                }
                seeAllPosts();
                return response.json();

            })
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err.message);
            })

    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }
    const handleNickNameChange = event => {
        setNickName(event.target.value)
    }
    const handleEmailChange = event => {
        setEmail(event.target.value)
    }


    let handleSubmit = e => {
        e.preventDefault();
        handlePost();
    };

    if (!submit) {
        return (
            <div>
                <div class="login-body login-container">
                    <div class="login-card">
                        <h2>Welcome</h2>
                        <form onSubmit={handleSubmit}>
                            <label for="email">Email</label>
                            <input type="text" id="email" placeholder="Email"
                                onChange={handleEmailChange}
                                value={email} />

                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="Password"
                                onChange={handlePasswordChange}
                                value={password}
                            />

                            <div className="login_submit_margin" />
                            <button type="submit">Login</button>
                            <div>
                                {!displayerror &&
                                    <div className="login_fail_show">email or password failed.</div>
                                }
                                {displayerror &&
                                    <div className="login_fail_hide">email or password failed.</div>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    } else if (error == 200 && submit) {
        if (!click) {
            return (
                <div>

                    <div class="cards-list">
                        {post.map(((item) => (
                            <div class="card" onClick={seeOverlayPost.bind(this, item)}>
                                <div id="circle-shape-example">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/kiwifruit-on-a-plate.jpg" alt="A photograph of sliced kiwifruit on a while plate"
                                        class="curve"></img>
                                    <h2><a href="#">{item.creator}</a></h2>
                                    <p class="text">{item.title}</p>
                                    <p class="text">{item.description}</p>
                                    <p class="date">{item.post_time} </p>
                                </div>
                                <div>
                                    <div>
                                        <div className="div-left">
                                            <p onClick={like(item.postId)}>❤️<small>{count}</small> </p>
                                        </div>

                                        <div className="div-right">
                                            <p> 💬<strong>{count}</strong>  </p>
                                        </div>

                                        <div className="div-last">
                                            <p>{unixtime_to_date(1234567890)}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <ViewAllPosts />
                </div>
            )
        }
    } else if (error == 400 && submit) {
        return (
            <div>
                <Login
                    displayerror={loginstatus}
                />
            </div>
        )
    }

}

export default Login; 