import { React, useState } from 'react';
import ReturningUser from "./ReturningUser";
import NewUser from "./NewUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function UserHome() {
    const [click, setClick] = useState(0)

    const handleReturningUser = () => {
        setClick(1)
    }

    const handleNewUser = () => {
        setClick(2)
    }

    if (click == 0) {
        return (
            <div>
                <h1 class="userHome-h1">Welcome to my app!</h1>
                <button class="userHome-button" onClick={handleReturningUser}>Returning User</button>
                <button class="userHome-button" onClick={handleNewUser}>New User</button>
            </div >
        )
    } else if (click == 1) {
        return (
            <div>

                <ReturningUser />

            </div>
        )
    } else if (click == 2) {
        return (
            <NewUser />
        )
    }
}

export default UserHome;