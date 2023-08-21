import { React, useState, useEffect, useRef } from "react";
import ViewAllPosts from "./ViewAllPosts";
import UserHome from "./UserHome";
import { useAuthorizedLogin } from "./AuthorizedLogin";

import { useContext } from "react";
import { MyContext } from "./MyContext";
import ReturningUser from "./ReturningUser";

function NewUserLogin({ displayerror }) {

    const { user, postId } = useContext(MyContext);
    const [username, setUsername] = user;

    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState([]);
    const [authenticate, setAuthenticate] = useState(0);
    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    const [back, setBack] = useState(false);
    const [newUserStatus, setNewUserStatus] = useState(false);

    const [logMessage, setLogMessage] = useState(false);
    const failedMessage = useRef();


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            phone_number: phoneNumber
        })
    };


    const handleLogin = () => {
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/users/create', requestOptions)
            .then(response => {
                setSubmit(true)
                setError(response.status)
                if (response.status == 400) {
                    setAuthenticate(1);
                    console.log('authenticate is ' + authenticate);
                }
                if (!response.ok) {
                    setLogMessage(true)
                }
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

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handlePhoneNumberChange = event => {
        setPhoneNumber(event.target.value)
    }

    let handleSubmit = e => {
        e.preventDefault();
        handleLogin();
    };


    const handleReturnUserHome = () => {
        setBack(true);
    }


    if (!back) {
        if (!submit) {
            return (
                <div>
                    <div class="login-body2 login-container">
                        <div class="login-card">
                            <h2 onClick={handleReturnUserHome}>Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <label for="email">Email</label>
                                <input type="email" id="email" placeholder="Email"
                                    onChange={handleEmailChange}
                                    value={email} />

                                <label for="password">Password</label>
                                <input type="password" id="password" placeholder="Password"
                                    onChange={handlePasswordChange}
                                    value={password}
                                />
                                <label for="phone">Phone Number</label>
                                <input type="text" id="phone" placeholder="Phone Number"
                                    onChange={handlePhoneNumberChange}
                                    value={phoneNumber}
                                />

                                <div className="login_submit_margin" />
                                <button onClick={() => setUsername(email)} type="submit">Login</button>
                                <div>
                                    {displayerror
                                        ? (<div className="login_fail_show">account with email already exists.<div> try again.</div></div>)
                                        : (<div className="login_fail_hide">account with email already exists.<div> try again.</div></div>)
                                    }
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            )
        } else if (error == 200 && submit) {
            console.log('Successfully made account. Please Login');
            return (
                <div>
                    <ReturningUser />
                </div>
            )
        } else if (error == 400 && submit) {
            return (
                <div>
                    <NewUserLogin
                        displayerror={1}
                    />
                </div>
            )
        }
    } else {
        return (
            <UserHome />
        )
    }


}

export default NewUserLogin; 