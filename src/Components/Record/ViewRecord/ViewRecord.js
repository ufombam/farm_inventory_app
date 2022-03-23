import React, { useRef } from "react";
import { Accordion, Table, Button } from 'react-bootstrap';
import './ViewRecord.scss';


const ViewRecord = () => {
  
    return (
        <div className="accordion_body">
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header >Eggs</Accordion.Header>
                    <Accordion.Body >
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          {Array.from({ length: 12 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                          ))}
                        </tr>
                        <tr>
                          <td>2</td>
                          {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                          ))}
                        </tr>
                        <tr>
                          <td>3</td>
                          {Array.from({ length: 12 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header >Feed</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header >Bird</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ViewRecord;