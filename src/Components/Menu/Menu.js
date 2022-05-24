import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import './Menu.scss';
import Logo from "../Logo/Logo";
import home from './home_img.png';
import money from './money_img.png';
import record from './record_img.png';
import settings from './settings_img.png';
import help from './help_img.png';
import user_img from './user.jpg';
import logout from './logout_img.png';

function Menu({ handleSignOut, user }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="menu_container">
            <Button variant="dark" onClick={handleShow} className='menu_button'>
                    MENU
            </Button>
            <Offcanvas show={show} onHide={handleClose} variant='dark'>
                <Offcanvas.Header className="canvas_header" closeButton>
                <Offcanvas.Title>
                    <Logo height={50} variant='dark'/>
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="canvas_body">
                    <div className="user">
                        <div className="avater"><img alt="avater" title="user avater" src={`https://robohash.org/${user?.id}?size=200x200`} className="user_icon"/></div>
                        <div className="user_details">
                            <div className="user_details_1">
                                <p>{`${user?.name}`}</p>
                            </div>
                            <div className="user_details_1">
                                <p>{`ID: ${user?.id + 22790}`} </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <nav>
                        <NavLink to="/dashboard" className="menu_link"><img className="icon" alt="home" src={`${home}`}/>{"  "}Home</NavLink>
                        <NavLink to="/finance" className="menu_link"><img className="icon" alt="home" src={`${money}`}/>{"  "}
                            Finance</NavLink>
                        <NavLink to="/record" className="menu_link"><img className="icon" alt="home" src={`${record}`}/>{"  "}Record</NavLink>
                        <NavLink to="/help" className="menu_link"><img className="icon" alt="home" src={`${help}`}/>{"  "}Help</NavLink>
                        <NavLink to="/settings" className="menu_link"><img className="icon" alt="home" src={`${settings}`}/>{"  "}Settings</NavLink>
                        <div onClick={handleSignOut} className="menu_link"><img className="icon" alt="home" src={`${logout}`}/>{"  "}Logout</div>
                    </nav>
                </Offcanvas.Body>
            </Offcanvas>
    </div>
    );
}

export default Menu;