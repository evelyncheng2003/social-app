import { React, useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "./MyContext";



function CreatePost() {
    const { user, setUser } = useContext(MyContext);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creator, setCreator] = useState("");
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [occasion, setOccasion] = useState("");
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
    const handleOccasionChange = event => {
        setOccasion(event.target.value)
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
            posttime: post_time,
            occasion: occasion
        })
    };


    const createPost = () => {
        fetch('http://localhost:9000/api/post/create', requestOptions)
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
        <div id="myContentBox">
            <div class="myContentMargin">
                <div id="myPostTitle">
                    <h1>Create Post</h1>
                </div>

                <div id="n-line"></div>

                <div><h2 class="form-group post-user">{user}</h2></div>
                <form id="myForm" name="myForm" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <div class="form-group1 title-post">
                            <input required
                                class="length-input-text input-border"
                                placeholder="Title"
                                type="text" id="title"
                                onChange={handleTitleChange}
                                value={title} />
                        </div>

                        <div class="form-group1">
                            <textarea class="textarea-post length-input-text"
                                placeholder="Description"
                                name="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />

                        </div>
                        <div class="post-drop-down">
                            <select
                                placeholder="Select One"
                                name="occasion"
                                value={occasion}
                                onChange={handleOccasionChange}
                                required
                            >
                                <option value="🍽">
                                    Dinner
                                </option>
                                <option value="🏊">
                                    Pool
                                </option>
                                <option value="🎥">
                                    Movie
                                </option>
                                <option value="🏕">
                                    Camping
                                </option>
                                <option value="🗓">
                                    Other
                                </option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div>
                            <button class="n-btn n-btnwhite" type="button" id="cancelButton">Cancel</button>
                            <button class="n-btn n-btnblue" type="submit" id="continueButton">Submit</button>
                        </div>
                    </div>


                </form>
            </div >
        </div >
    )
}


export default CreatePost;