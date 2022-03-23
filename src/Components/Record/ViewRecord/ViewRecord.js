import React from "react";
import { Accordion, Table } from 'react-bootstrap';
import './ViewRecord.scss';


const ViewRecord = () => {
  const tableHeader = [
    "Date", "Egg Count", "Size", "Damaged Eggs", "Total"
  ];

  const tableInput = [
      {
        id: 1,
        date: '11/2/2011',
        egg_count: 12,
        size: 'big',
        damaged: 20
      },
      {
      id: 2,
      date: '11/2/2033',
      egg_count: 100,
      size: 'small',
      damaged: 10
    },
    {
      id: 3,
      date: '11/2/2044',
      egg_count: 300,
      size: 'big',
      damaged: 33
    }
  ]
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
                          {tableHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                          {tableInput.map((input, i) => (
                            <tr>
                              <td key={i}>{input.id}</td>
                              <td key={i}>{input.date}</td>
                              <td key={i}>{input.egg_count}</td>
                              <td key={i}>{input.size}</td>
                              <td key={i}>{input.damaged}</td>
                            </tr>
                          ))}
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