import React, { useState } from "react";
import './Record.scss';
import Menu from '../Menu/Menu';
import { Nav } from 'react-bootstrap';

export const NewRecord = () => {
    return (
        <div> I am the record page!</div>
    )
}
export const ViewRecord = () => {
    return (
        <div> I am the ViewRecord page!</div>
    )
}
export const Summary = () => {
    return (
        <div> I am the summary page!</div>
    )
}



function Record() {
    const [route, setRoute] = useState("");
    const handleTabChange = e => setRoute(e);

    return (
        <div className="record_app">
            <Menu />
            <Nav fill variant="tabs" defaultActiveKey="link-1">
                <Nav.Item onClick={() => handleTabChange('newrecord')}>
                    <Nav.Link eventKey="link-1">New Record</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabChange('viewrecord')}>
                    <Nav.Link eventKey="link-2">View Records</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabChange('summary')}>
                    <Nav.Link eventKey="link-3">
                    Summary
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {
                route === 'summary' ? <Summary /> : route === 'viewrecord' ? <ViewRecord /> : <NewRecord />
            }
        </div>
    );
}

export default Record;