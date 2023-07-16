import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";


function ToggleSidebar() {
    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }
    return (
        <div className="container-fluid mt-3">
            <nav id="nav" className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
                <div className="container-fluid p-2">
                    <a className="navbar-brand text-primary mr-0">MENU</a>
                    <div className="form-inline ml-auto">
                        <div className="btn btn-primary" onClick={ToggleSidebar} >
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                </div>

                <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <h4 className="mb-0">Sidebar Header</h4>
                        <div className="btn btn-primary" onClick={ToggleSidebar}><i className="fa fa-times"></i></div>
                    </div>
                    <div className="sd-body">
                        <ul>
                            <li><NavLink to="/posts" exact activeClassName="active">All Posts</NavLink></li>
                            <li><NavLink to="/home" exact activeClassName="active">Home</NavLink></li>
                        </ul>
                    </div>


                </div>
            </nav>

            <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
        </div>
    );

}


export default ToggleSidebar;