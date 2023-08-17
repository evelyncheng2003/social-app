import { React, useState, useEffect, useContext } from "react";
import DisplayAllPosts from "./DisplayAllPosts";
import Overlay from "./Overlay";
import ViewAllPosts from "./ViewAllPosts";
import { useOverlay } from "./OverlayState";

function OverlayContent({ overlayId, email }) {
    const [close, setClose] = useState(false);
    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState();

    const [post, setPost] = useState([]);

    /* function imported from OverlayState.js */
    const { updateOverlay, getOverlay } = useOverlay();


    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("")

    let post_id = { overlayId };
    let email123 = { email };

    /* overlay should be false, meaning don't display the overlay anymore */

    const seeAllPosts = () => {
        fetch('http://localhost:9000/api/post/all')
            .then((response) => response.json())
            .then((data) => setPost(data));
    }

    const like = () => {
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

    const closeOverlay = () => {
        console.log('OverlayContent before overlay state is: ' + getOverlay());
        updateOverlay(false)
        console.log('OverlayContent after overlay state is: ' + getOverlay());

    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email123.email,
            usercomment: comment,
            commenttime: 12345,
            postid: post_id.overlayId
        })
    };

    const handleUserReply = () => {
        fetch('http://localhost:9000/api/comment/create', requestOptions)
            .then(response => {
                setSubmit(true)
                setError(response.status)
                if (!response.ok) {
                    throw new Error(`HTTP Error. Status is ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


    const getPostbyId = () => {
        console.log('post_id = ' + post_id.overlayId);
        let url = 'http://localhost:9000/api/post/find/' + post_id.overlayId;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setPost(data));
    }

    const getCommentsByPostId = () => {
        console.log('post_id = ' + post_id.overlayId);
        let url = 'http://localhost:9000/api/comment/find/' + post_id.overlayId;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setCommentList(data));
    }

    useEffect(() => {
        getPostbyId();
        getCommentsByPostId();
    }, []);

    const handleCommentChange = event => {
        setComment(event.target.value)
    }

    let handleSubmitComment = e => {
        e.preventDefault()
        handleUserComment()
        setComment("")
    };

    const handleUserComment = () => {
        fetch('http://localhost:9000/api/comment/create', requestOptions)
            .then(response => {
                setSubmit(true)
                setError(response.status)
                if (!response.ok) {
                    throw new Error(`HTTP Error. Status is ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                return getCommentsByPostId()
            })
            .catch((err) => {
                console.log(err.message);
            })
    }


    return (
        <div className="container-display-post-comments white">
            <div>
                <div>
                    <div id="first">
                        <div class="cards-list11">
                            <div id="circle-shape-example" >
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/kiwifruit-on-a-plate.jpg" alt="A photograph of sliced kiwifruit on a while plate"
                                    class="curve"></img>
                                <h2><a href="#">{post.creator}</a></h2>
                                <p class="text">{post.title}</p>
                                <p class="text">{post.description}</p>
                                <p class="date">{post.post_time} </p>
                            </div>
                        </div>
                    </div>
                    <div id="second">
                        <div className="content-wrap">
                            <div className="comments-list123">
                                <div className="card-comment-overall">
                                    {commentList.map(((item) => (

                                        <div class="card-comment">
                                            <p><strong>{item.username}</strong></p>
                                            <p class="date">{item.usercomment}</p>
                                            <p class="text">{item.time} </p>
                                        </div>

                                    )))}
                                </div>
                            </div>
                        </div>
                        <div className="sticky-button">
                            <form onSubmit={handleSubmitComment}>
                                <div>
                                    <div className="div-left-comment">
                                        <textarea className="sticky-text"
                                            name="comment"
                                            placeholder="Comment"
                                            value={comment}
                                            onChange={handleCommentChange}
                                            required
                                        />
                                    </div>
                                    <div className="div-right-comment">
                                        <input type="submit" value="Post" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div>
                            <p onClick={closeOverlay} className="sticky-upper-right"><h1>X</h1></p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )



}

export default OverlayContent;