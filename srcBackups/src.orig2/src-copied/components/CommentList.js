import { React, useState } from "react";

function CommentList({ commentList }) {
    const Comment = ({ username, comment, time }) => (
        <div className="comment">
            <h4>{username} says</h4>
            <p className="timestamp">{time}</p>
            <p>{comment}</p>
        </div>
    );


    return (
        <div className="comments-list whole-page">
            <div class="top"><div class="title"><h1>All Posts</h1></div></div>
            {commentList.map(((item) => (
                <div class="card"><h2><a href="#">{item.username}</a></h2>
                    <p class="date">{item.comment}</p>
                    <p class="text">{item.time} </p>
                </div>
            )))}
        </div>
    );
}



export default CommentList;