import { React, useState, useEffect } from "react";
import Overlay from "./Overlay";
import { useOverlay } from "./OverlayState";
import { redirect } from "react-router-dom";
import { useAuthorizedLogin } from "./AuthorizedLogin";
import Login from "./Login";
import ToggleSidebar from './ToggleSidebar';
//import Login from "./Login";
import { Navigate } from "react-router-dom";


function ViewAllPosts() {
    const [overlayId, setOverlayId] = useState(0);
    const [click, setClick] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [backToLogin, setBackToLogin] = useState(false);

    const { updateOverlay, getOverlay } = useOverlay();

    const { updateLoginStatus, getLoginStatus } = useAuthorizedLogin();


    //console.log(allPosts);

    const seeOverlayPost = (post_obj) => {
        setOverlayId(post_obj.postId);
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
                                        <p>❤️<small>3</small> </p>
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
                    email='email'
                />
            </div>
        )
    }


}

export default ViewAllPosts;