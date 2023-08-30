import { React, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Overlay from "./Overlay";

function Post() {
    const [count, setCount] = useState(0);
    const [click, setClick] = useState(false);
    const [post, setPost] = useState([]);


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

    const seeOverlayPost = () => {
        setClick(true);
    }



    const seeAllPosts = () => {
        fetch('https://api.evelynandpoko.com/api/post/all')
            .then((response) => response.json())
            .then((data) => setPost(data));
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: 'Poko',
            lastName: 'Cook',
            email: 'poko1118@gmail.com'
        })
    };


    const makeReply = () => {
        fetch('https://api.evelynandpoko.com/api/users/create', requestOptions)
            .then((response) => response.json())
            .then((data) => setPost(data))
    }

    if (!click) {
        return (
            <div>
                <div>
                    <div onClick={seeOverlayPost}>
                        <div id="circle-shape-example">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/kiwifruit-on-a-plate.jpg" alt="A photograph of sliced kiwifruit on a while plate" class="curve"></img>
                            {post.map(((item) => (
                                <div class="card"><h2><a href="#">{item.creator}</a></h2>
                                    <p class="text">{item.title}</p>
                                    <p class="text">{item.description}</p>
                                    <p class="text">{item.likes} </p>
                                    <p class="date">{item.post_time} </p>
                                </div>
                            )))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="div-left">
                                <p onClick={like}>❤️️<small><small>{count}</small></small></p>
                            </div>

                            <div className="div-right">
                                <p onClick={makeReply}> 💬 Reply </p>
                            </div>

                            <div className="div-last">
                                <p>{unixtime_to_date(1234567890)}</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <Overlay
            />
        )

    }

}
export default Post; 