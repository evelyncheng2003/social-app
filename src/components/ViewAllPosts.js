import { React, useState, useEffect } from "react";
import Overlay from "./Overlay";
import ToggleSidebar from "./ToggleSidebar";
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
    const [post_id, setPostId] = useState(0);

    /* function imported from OverlayState.js */
    const { updateOverlay, getOverlay } = useOverlay();

    const { updateLoginStatus, getLoginStatus } = useAuthorizedLogin();


    const unixtime_to_date = (ts) => {
        let date = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }).format(ts);

        return date;
    }

    const showOverlayPost = (post_obj) => {
        console.log('showOverlayPost called')
        setpostid(post_obj.postId);
        setClick(true);
        updateOverlay(true);
        setClick(true);
    }

    const seeAllPosts = () => {
        fetch('http://localhost:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setAllPosts(data));
    }


    const deletePost = (post_obj) => {
        //setPostId(post_obj.postId)
        console.log('handleDeletePost called, post ID : ' + post_obj.postId)
        // setpostid(post_obj.postId);

        fetch('http://localhost:9000/api/post/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "deleteId": post_obj.postId
            })
        })
            .then(response => {
                console.log('response.status is ' + response.status);
                if (response.status != 200) {
                    seeAllPosts();
                }
                if (!response.ok) {
                    // setLoginStatus(false);
                    //    throw new Error(`HTTP Error. Status is ${response.status}`);
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err.message);
            })
    }



    /* need [] at the end to avoid an infinite loop */
    useEffect(() => {
        setOverlayId(0);
        //console.log('overlayID from useEffect: ' + overlayId);
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


    if (!click) {
        return (
            <div>
                <ToggleSidebar />
                <div class="cards-list">
                    {allPosts.map(((item) => (
                        <div class="card" onClick={
                            showOverlayPost.bind(this, item)
                        }>
                            <div>
                                <div className="div-last-first-row">
                                    <h3 onClick={deletePost.bind(this, item)}>🗑</h3>
                                </div>
                            </div>
                            <div id="circle-shape-example">
                                <p class="emoji-size">{item.occasion}</p>
                                <p class="text">{item.title}</p>
                            </div>
                            <div>
                                <div>
                                    <div className="div-left">
                                        <p>❤️ {item.likes}</p>
                                    </div>



                                    <div className="div-last">
                                        <p>{unixtime_to_date(item.time)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div >
        )
    } else {
        //console.log('postId is : ' + postid);
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