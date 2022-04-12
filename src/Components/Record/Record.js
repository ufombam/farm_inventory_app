import React, { useState } from "react";
import './Record.scss';
import Menu from '../Menu/Menu';
import NewRecord from './NewRecord/NewRecord';
import ViewRecord from './ViewRecord/ViewRecord';
import Summary from './Summary/Summary';
import { Nav } from 'react-bootstrap';



function Record() {
    const [route, setRoute] = useState("");
    const handleTabChange = e => setRoute(e);

    return (
        <div className="record_app">
            <Menu />
            <Nav fill variant="tabs" defaultActiveKey="link-1">
                <Nav.Item className="bx" onClick={() => handleTabChange('newrecord')}>
                    <Nav.Link className="rec_text" eventKey="link-1"><big>New Record</big></Nav.Link>
                </Nav.Item>
                <Nav.Item className="bx" onClick={() => handleTabChange('viewrecord')}>
                    <Nav.Link className="rec_text" eventKey="link-2"><big>View Records</big></Nav.Link>
                </Nav.Item>
                <Nav.Item className="bx" onClick={() => handleTabChange('summary')}>
                    <Nav.Link className="rec_text" eventKey="link-3">
                    <big>Summary</big>
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