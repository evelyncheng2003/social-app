import { useState, React } from "react";
import { MyContext } from "./MyContext";
import Login from "./Login";
import CreatePost from "./CreatePost";

function ProviderWrapComments() {
    const [user, setUser] = useState("");

    return (
        <div>
            <MyContext.Provider value={{ user, setUser }}>
                <Login />
                <CreatePost />
                <ViewAllPosts />
            </MyContext.Provider>
        </div>
    );
}

export default ProviderWrapComments;