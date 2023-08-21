import { React, useState } from "react";
import CommentList from "./CommentList";

function CommentForm() {
    const [username, setUsername] = useState("")
    const [comment, setComment] = useState("")
    const [error, setError] = useState(0)
    const [submit, setSubmit] = useState(false)

    const [commentList, setCommentList] = useState([]);



    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }
    const handleCommentChange = event => {
        setComment(event.target.value)
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            comment: comment,
        })
    };

    const getAllComments = () => {
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/comment/all')
            .then((response) => response.json())
            .then((data) => setCommentList(data));
    }


    const handleUserComment = () => {
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/comment/create', requestOptions)
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
                return getAllComments()
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    let handleSubmit = e => {
        e.preventDefault()
        handleUserComment()

        setUsername("")
        setComment("")

    };
    console.log('length = ' + commentList.length)
    return (
        <div>
            <div className="comments-form whole-page">
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <input
                                name="username"
                                type="text"
                                placeholder="Name"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                        </li>
                        <li>
                            <textarea
                                name="comment"
                                placeholder="Comment"
                                value={comment}
                                onChange={handleCommentChange}
                                required
                            />
                        </li>
                        <li>
                            <input type="submit" value="Post" />
                        </li>

                    </ul>
                </form>
            </div>
            {commentList.map(((item) => (
                <div class="card"><h2><a href="#">{item.username}</a></h2>
                    <p class="date">{item.time}</p>
                    <p class="text">{item.comment} </p>
                </div>
            )))
            }
        </div>
    )
}

export default CommentForm;