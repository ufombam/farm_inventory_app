import React, { useEffect, useState } from "react";
import './Record.scss';
import Menu from '../Menu/Menu';
import NewRecord from './NewRecord/NewRecord';
import ViewRecord from './ViewRecord/ViewRecord';
import Summary from './Summary/Summary';
import { Nav } from 'react-bootstrap';



function Record({ eggData, feedData, compostData, user, handleSignOut }) {
    const [route, setRoute] = useState("");
    const [customerInput, setCustomerInput] = useState([]);
    const handleTabChange = e => setRoute(e);

    useEffect(() => {
        if (user) {
        //fetch customer record
        fetch(`https://fast-scrubland-53064.herokuapp.com/record/customers/${user.id}`)
        .then(response => response.json())
        .then(res => {
            setCustomerInput(res)
        }).catch(() => 'unable to complete request')
    }
    },[user])
    return (
        <div className="record_app">
            <Menu handleSignOut={handleSignOut} user={user}/>
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
                route === 'summary' ? <Summary user={user} egg={eggData} compost={compostData} customer={customerInput}/> : route === 'viewrecord' ? <ViewRecord user={user} customerInput={customerInput}/> : <NewRecord user={user}/>
            }
        </div>
    );
}

export default Record;