import { React, useState, useEffect, useRef } from "react";
import ViewAllPosts from "./ViewAllPosts";
import { useAuthorizedLogin } from "./AuthorizedLogin";

import { useContext } from "react";
import { MyContext } from "./MyContext";

function Login({ displayerror }) {

    const { user, setUser } = useContext(MyContext);

    const [password, setPassword] = useState("");
    const [nickname, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState([]);
    const [overlayId, setOverlayId] = useState(0);

    const [authenticate, setAuthenticate] = useState(0);

    const [singlePost, setSinglePost] = useState({
        postId: 0,
        postTitle: "",
        postDesc: "",
        postCreator: ""
    });

    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    //const [loginstatus, setLoginStatus] = useState(true);

    const [logMessage, setLogMessage] = useState(false);
    const failedMessage = useRef();

    const like = (post_id) => {
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
        //console.log('Login() seeOverlayPost postid = ' + post_obj.postId);
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
        //console.log("input good");
    }

    const seeAllPosts = () => {
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setPost(data));
    }

    const handlePost = () => {
        validateInput();
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/users/create', requestOptions)
            .then(response => {
                setSubmit(true)
                setError(response.status)
                //console.log('submit is ' + submit)
                //console.log('response.status is ' + response.status);
                if (response.status == 400) {
                    setAuthenticate(1);
                    console.log('authenticate is ' + authenticate);
                }
                if (!response.ok) {
                    // setLoginStatus(false);
                    //    throw new Error(`HTTP Error. Status is ${response.status}`);
                    setLogMessage(true)
                }
                seeAllPosts();
                updateLoginStatus(true);
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

    const { updateLoginStatus, getLoginStatus } = useAuthorizedLogin();

    useEffect(() => {
        updateLoginStatus(false);
    }, []);


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
                            <button onClick={() => setUser(email)} type="submit">Login</button>
                            <div>
                                {displayerror
                                    ? (<div className="login_fail_show">email or password failed.</div>)
                                    : (<div className="login_fail_hide">email or password failed.</div>)
                                }
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        )
    } else if (error == 200 && submit) {
        return (
            <div>
                <ViewAllPosts />
            </div>
        )
    } else if (error == 400 && submit) {
        return (
            <div>
                <Login
                    displayerror={1}
                />
            </div>
        )
    }

}

export default Login; 