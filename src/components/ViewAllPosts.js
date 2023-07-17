import { React, useState, useEffect } from "react";
import Overlay from "./Overlay";
import { useOverlay } from "./OverlayState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ToggleSidebar from './ToggleSidebar';
//import Login from "./Login";



function ViewAllPosts() {
    const [overlayId, setOverlayId] = useState(0);
    const [click, setClick] = useState(false);
    const [allPosts, setAllPosts] = useState([]);

    const { updateOverlay, getOverlay } = useOverlay();



    //console.log(allPosts);

    const seeOverlayPost = (post_obj) => {
        console.log('ViewAllPost() seeOverlayPost postid = ' + post_obj.postId);
        setOverlayId(post_obj.postId);

        updateOverlay(true);

        setClick(true);
    }

    const seeAllPosts = () => {
        fetch('http://MySocial-rest-api-service-env.eba-ukimrmpq.us-west-1.elasticbeanstalk.com:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setAllPosts(data));
    }

    /* need [] at the end to avoid an infinite loop */
    useEffect(() => {
        seeAllPosts();
    }, [])

    if (!click) {
        return (
            <div>
                /* this line not right, cause close post to have error: useLocation may be used only in the context of a Router component. */
                <ToggleSidebar />

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