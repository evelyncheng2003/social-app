import React from "react";
import Post from "./DisplayAllPosts";

function ViewPost() {
    return (
        <div class="cards-list">

            <div class="card">
                < Post />

            </div>

            <div class="card">
                <Post />
            </div>


        </div>
    )
}

export default ViewPost;