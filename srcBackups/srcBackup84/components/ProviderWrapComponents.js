import { useState, React } from "react";
import { MyContext } from "./MyContext";
import Login from "./Login";
import CreatePost from "./CreatePost";
import ViewAllPosts from "./ViewAllPosts";
import OverlayContent from "./OverlayContent";

function ProviderWrapComments() {
    const [user, setUser] = useState("");
    const [postId, setPostId] = useState(0);

    return (
        <div>
            <MyContext.Provider value={{ user: [user, setUser], postId: [postId, setPostId] }}>
                <Login />
                <CreatePost />
                <ViewAllPosts />
                <OverlayContent />
            </MyContext.Provider>
        </div>
    );
}

export default ProviderWrapComments;