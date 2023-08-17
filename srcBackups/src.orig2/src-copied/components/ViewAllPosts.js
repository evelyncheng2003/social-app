import { React, useState, useEffect } from "react";
import Overlay from "./Overlay";
import { useOverlay } from "./OverlayState";
import { redirect } from "react-router-dom";
import { useAuthorizedLogin } from "./AuthorizedLogin";

import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { MyContext } from "./MyContext";


function ViewAllPosts() {

    const { user, setUser } = useContext(MyContext);

    const [overlayId, setOverlayId] = useState(0);
    const [click, setClick] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [backToLogin, setBackToLogin] = useState(false);

    const { updateOverlay, getOverlay } = useOverlay();

    const { updateLoginStatus, getLoginStatus } = useAuthorizedLogin();

    const seeOverlayPost = (post_obj) => {
        setOverlayId(post_obj.postId);
        updateOverlay(true);
        setClick(true);
    }

    const seeAllPosts = () => {
        fetch('http://localhost:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setAllPosts(data));
    }


    /* need [] at the end to avoid an infinite loop */
    useEffect(() => {
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
                <div class="cards-list">
                    {allPosts.map(((item) => (
                        <div class="card" onClick={seeOverlayPost.bind(this, item)}>
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
            </div>
        )
    } else {
        return (
            <div>
                <Overlay
                    overlayId={overlayId}
                    email={user}
                />
            </div>
        )
    }


}

export default ViewAllPosts;