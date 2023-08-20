import { React, useEffect, useState } from "react";

function CreatePost() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creator, setCreator] = useState("");
    const [likes, setLikes] = useState(3);
    const [post_time, setPost_Time] = useState(10000);
    const [reset, setReset] = useState(false);

    const [post, setPost] = useState([]);

    const handleTitleChange = event => {
        setTitle(event.target.value)
    }
    const handleDescriptionChange = event => {
        setDescription(event.target.value)
    }
    const handleCreatorChange = event => {
        setCreator(event.target.value)
    }

    let handleSubmit = e => {
        e.preventDefault();
        createPost();
    };

    const handleCancel = () => {
        setReset(true);
    }



    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            description: description,
            creator: creator,
            likes: likes,
            posttime: post_time
        })
    };


    const createPost = () => {
        fetch('http://My-social-app-rest-api-server-env.eba-68dbc2pp.us-west-1.elasticbeanstalk.com:9000/api/post/create', requestOptions)
            .then(response => {
                console.log('response.status is ' + response.status);
                if (response.status != 200) {

                }
                if (!response.ok) {
                    // setLoginStatus(false);
                    //    throw new Error(`HTTP Error. Status is ${response.status}`);

                }

                return response.json();
            })
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err.message);
            })
    }


    return (
        <div class="input-field">
            <table>
                <thead>
                    <tr>
                        <th colspan="2">Create a Post</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>
                            <div>
                                <input required class="input-create-post"
                                    type="text" id="title"
                                    onChange={handleTitleChange}
                                    value={title} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>
                            <div>
                                <textarea className="text-area-description"
                                    name="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    required
                                />
                            </div>


                        </td>
                    </tr>
                    <tr>
                        <td>Creator</td>
                        <td>
                            <div>
                                <input required class="input-create-post"
                                    type="text" id="creator"
                                    onChange={handleCreatorChange}
                                    value={creator}
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
            <form onSubmit={handleSubmit} >
                <div>
                    <button class="button-cancel-post" type="submit">Cancel</button>
                </div>
                <div>
                    <button class="button-create-post" type="submit">Create Post</button>
                </div>

            </form>
        </div >
    )
}


export default CreatePost;