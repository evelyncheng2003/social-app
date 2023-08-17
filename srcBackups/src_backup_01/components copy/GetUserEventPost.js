import { React, useState, useEffect } from "react";

function GetUserEventPost({ username }) {
    const [postResult, setpostResult] = useState([])

    const myUrl = 'http://localhost:9000/api/users/all';
    const handleClick = () => {
        fetch(myUrl)
            .then((response) => response.json())
            .then((data) => setpostResult(data));
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

    const handlePost = () => {
        fetch('http://localhost:9000/api/users/create', requestOptions)
            .then((response) => response.json());
    }

    useEffect(() => {
        handleClick();
    })

    return (
        <div class="wrapper">
            <div class="content">
                <div class="top"><div class="title"><h1>All Posts</h1></div></div>
                {postResult.map(((item) => (
                    <div class="card"><h2><a href="#">{item.email}</a></h2>
                        <p class="date">{item.firstName}</p>
                        <p class="text">{item.lastName} </p>
                    </div>
                )))}
            </div>

        </div>
    )

}

export default GetUserEventPost;
