import { React, useState, useEffect } from "react";
import Overlay from "./Overlay";
import { useOverlay } from "./OverlayState";
import { useAuthorizedLogin } from "./AuthorizedLogin";

import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "./MyContext";


function ViewAllPosts() {

    const { user, postId } = useContext(MyContext);
    const [postid, setpostid] = postId;
    const [username, setUsername] = user;


    //console.log('ViewAllPosts username is: ' + username);

    const [count, setCount] = useState(0);
    const [overlayId, setOverlayId] = useState(0);
    // const [postId, setPostId] = useState();
    const [click, setClick] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [backToLogin, setBackToLogin] = useState(false);

    /* function imported from OverlayState.js */
    const { updateOverlay, getOverlay } = useOverlay();

    const { updateLoginStatus, getLoginStatus } = useAuthorizedLogin();


    const showOverlayPost = (post_obj) => {
        console.log('showOverlayPost called')
        setpostid(post_obj.postId);
        //setPostId(post_obj.postId);
        //console.log('postId is: ' + postid);
        // let myId = post_obj.postId;
        // console.log('myId is: ' + myId);
        // setOverlayId(myId);
        //setOverlayId(post_obj.postId);
        setClick(true);
        //setPostId(post_obj.postId);

        updateOverlay(true);
        setClick(true);
    }

    const seeAllPosts = () => {
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setAllPosts(data));
    }


    /* need [] at the end to avoid an infinite loop */
    useEffect(() => {
        setOverlayId(0);
        console.log('overlayID from useEffect: ' + overlayId);
        // updateOverlay(false);
        // setClick(false)
        if (getLoginStatus()) {
            seeAllPosts();
        } else {
            console.log('redirect to login called')
            setBackToLogin(true)
        }
    }, [])


    if (backToLogin) {
        return (
            <div>
                <Navigate replace to="/login" />
            </div>
        )
    }

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


    if (!click) {
        return (
            <div>
                <div class="cards-list">
                    {allPosts.map(((item) => (
                        <div class="card" onClick={
                            showOverlayPost.bind(this, item)
                        }>
                            <div id="circle-shape-example">
                                <p class="emoji-size">{item.occasion}</p>
                                <p class="text">{item.title}</p>
                                <p class="date">{item.post_time} </p>
                            </div>
                            <div>
                                <div>
                                    <div className="div-left">
                                        <p>❤️<small>{item.likes}</small> </p>
                                    </div>

                                    <div className="div-right">
                                        <p> 💬<strong>10</strong>  </p>
                                    </div>

                                    <div className="div-last">
                                        <p>12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div >
        )
    } else {
        console.log('postId is : ' + postid);
        return (
            <div>
                <Overlay
                    overlayId={postid}
                    user={username}
                />
            </div>
        )
    }


}

export default ViewAllPosts;