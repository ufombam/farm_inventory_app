import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import './Menu.scss';
import home from './home.png';
import user from './user.jpg';

function Menu({ handleSignOut }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="summary_app">
            <Button variant="dark" onClick={handleShow} className='menu_button'>
                    MENU
            </Button>
            <Offcanvas show={show} onHide={handleClose} variant='dark'>
                <Offcanvas.Header className="canvas_header" closeButton>
                <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="canvas_body">
                    <div className="user">
                        <img alt="user" src={`${user}`} className="user_icon"/>
                        <div className="user_details">
                            <div className="user_details_1">
                                <p>System Admin</p>
                            </div>
                            <div className="user_details_1">
                                <p>ID: 223434323 </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <nav>
                        <NavLink to="/dashboard" className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}Home</NavLink>
                        <NavLink to="/finance" className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}
                            Finance</NavLink>
                        <NavLink to="/record" className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}Record</NavLink>
                        <NavLink to="/help" className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}Help</NavLink>
                        <NavLink to="/jsdream345" className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}Settings</NavLink>
                        <div onClick={handleSignOut} className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}Logout</div>
                    </nav>
                </Offcanvas.Body>
            </Offcanvas>
    </div>
    );
}

export default Menu;