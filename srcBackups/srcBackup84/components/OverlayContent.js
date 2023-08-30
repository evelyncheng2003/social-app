import { React, useState, useEffect, useContext } from "react";
import { useOverlay } from "./OverlayState";
import { MyContext } from "./MyContext";

function OverlayContent({ overlayId, user }) {
    // const { user, postId } = useContext(MyContext);
    // const [username, setUsername] = user;
    // const [postid, setpostid] = postId;


    const [close, setClose] = useState(false);
    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState();
    const [likes, setLikes] = useState(0);

    const [post, setPost] = useState([]);

    const [emoji, setEmoji] = useState();

    /* function imported from OverlayState.js */
    const { updateOverlay, getOverlay } = useOverlay();


    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("")

    let post_id = { overlayId };

    //console.log('overlayID is: ' + overlayId + ' from overlayContent')

    /* overlay should be false, meaning don't display the overlay anymore */

    // const seeAllPosts = () => {
    //     fetch('https://api.evelynandpoko.com/api/post/all')
    //         .then((response) => response.json())
    //         .then((data) => setPost(data));
    // }

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

    // this is working, otherwise the overlay won't close at all 
    // updateOverlay(false) is correct 
    const closeOverlay = () => {
        updateOverlay(false)
        //('closeOverlay called, is: ' + getOverlay())

    }


    // const handleUserReply = () => {
    //     fetch('https://api.evelynandpoko.com/api/comment/create', requestOptions)
    //         .then(response => {
    //             setSubmit(true)
    //             setError(response.status)
    //             if (!response.ok) {
    //                 throw new Error(`HTTP Error. Status is ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         })
    // }


    const getPostbyId = () => {
        //console.log('post_id = ' + post_id.overlayId);
        let url = 'https://api.evelynandpoko.com/api/post/find/' + post_id.overlayId;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setPost(data));
    }

    const getCommentsByPostId = () => {
        //console.log('post_id = ' + post_id.overlayId);
        let url = 'https://api.evelynandpoko.com/api/comment/find/' + post_id.overlayId;
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

    const like = (post_id) => {
        if (count == 0) {
            setCount(count => count + 1);
        }
    }

    let handleLikeChange = e => {
        console.log('current likes: ' + likes)
        setLikes(likes + 1)
        handleIncrementLikes()
        console.log('new likes: ' + likes)
    }

    const handleIncrementLikes = () => {
        console.log('handleincrementlikes called')
        fetch('https://api.evelynandpoko.com/api/post/likes', requestOptions)
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
                return getPostbyId()
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    let handleSubmitComment = e => {
        e.preventDefault()
        handleUserComment()
        setComment("")
    };

    console.log('overlayID from overlayContent: ' + overlayId);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: "title",
            description: "desc",
            creator: "me",
            posttime: currentTimestamp,
            occasion: "occasion",
            likes: likes,
            post_id: overlayId
        })
    };

    const requestCommentOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            commenttime: currentTimestamp,
            postId: overlayId,
            usercomment: comment,
            username: user
        })
    };

    const handleUserComment = () => {
        fetch('https://api.evelynandpoko.com/api/comment/create', requestCommentOptions)
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
                <div id="first">
                    <div id="left-side">
                        <div class="cards-list">
                            <div >
                                <div>
                                    <p class="curve">{post.occasion}</p>
                                </div>
                                <div className="div-left-post">
                                    <h2><a href="#">{post.creator}</a></h2>
                                    <div>
                                        <p class="title-text">{post.title}</p>

                                        <p class="description-text">{post.description}</p>
                                        <p>{unixtime_to_date}</p>
                                    </div>
                                </div>
                                <p class="date">{post.post_time} </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="second">
                    <div className="content-wrap">
                        <div className="comments-list123">
                            <div className="card-comment-overall">
                                {commentList.map(((item) => (
                                    <div class="card-comment">
                                        <p class="comment-username"><strong>{item.username}</strong></p>
                                        <p class="date">{item.usercomment}</p>
                                        <p class="text comment-text">{item.time} </p>
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
                                <div>
                                    <p onClick={handleLikeChange} class="heart">❤️️</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <p onClick={closeOverlay} className="sticky-upper-right"><h1>X</h1></p>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default OverlayContent;