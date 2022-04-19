import React, { useState, useEffect } from "react";
import { Accordion, Table, Badge } from 'react-bootstrap';
import './ViewRecord.scss';


const ViewRecord = () => {
  const [eggInput, setEggInput] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/record/egg')
    .then(response => response.json())
    .then(rec => {
      setEggInput(rec)
    })
  },[]);


  const eggHeader = [
    "Date", "Big", "Unit", "Small" , "Unit", "Damaged Eggs", "Total"
  ];

  // const eggInput = [
  //     {
  //       id: 1,
  //       date: '11/2/2011',
  //       unit: 'crates',
  //       big: {
  //         qty: 12,
  //         unit: "small"
  //       },
  //       small: {
  //         qty: 12,
  //         unit: "crate"
  //       },
  //       damaged: 3,
  //     },
  //     {
  //       id: 2,
  //       date: '11/2/2011',
  //       unit: 'crates',
  //       big: {
  //         qty: 12,
  //         unit: "small"
  //       },
  //       small: {
  //         qty: 12,
  //         unit: "crate"
  //       },
  //       damaged: 3,
  //     },
  //     {
  //       id: 3,
  //       date: '11/2/2011',
  //       unit: 'crates',
  //       big: {
  //         qty: 12,
  //         unit: "small"
  //       },
  //       small: {
  //         qty: 12,
  //         unit: "crate"
  //       },
  //       damaged: 3,
  //     },
  //     {
  //       id: 4,
  //       date: '11/2/2011',
  //       unit: 'crates',
  //       big: {
  //         qty: 12,
  //         unit: "small"
  //       },
  //       small: {
  //         qty: 12,
  //         unit: "crate"
  //       },
  //       damaged: 3,
  //     }
  // ]
  const feedHeader = [
    "#", "Date", "Qty", "Store of Purchase", "Total"
  ];

  const feedInput = [
      {
        id: 1,
        date: '11/2/2011',
        qty: 18,
        store: 'A-Z Stores',
      },
      {
        id: 2,
        date: '11/2/2011',
        qty: 18,
        store: 'Nkota Stores',
      },
      {
        id: 3,
        date: '11/2/2011',
        qty: 18,
        store: 'Dinma Stores',
      },
      {
        id: 4,
        date: '11/2/2011',
        qty: 18,
        store: 'A-Z Stores',
      }
  ]

  const birdHeader = [
    "#", "Date", "# of Birds", "Age", "Dead Birds", "Total"
  ];

  const birdInput = [
      {
        id: 1,
        date: '11/2/2011',
        bird_number: 18,
        age: 'A-Z Stores',
        dead_birds: 15
      },
      {
        id: 2,
        date: '11/2/2011',
        bird_number: 18,
        age: 'A-Z Stores',
        dead_birds: 15
      },
      {
        id: 3,
        date: '11/2/2011',
        bird_number: 18,
        age: 'A-Z Stores',
        dead_birds: 15
      },
      {
        id: 4,
        date: '11/2/2011',
        bird_number: 18,
        age: 'A-Z Stores',
        dead_birds: 15
      }
  ]

  const customerHeader =     [
    "#", "Name", "Registration Date", "Purchases", "Debt Status", "Status"
  ];

  const customerInput = [
    {
      id: 1,
      name: 'Emeka Ozoani',
      registration: '11/2/2011',
      purchase: 300,
      debt: 5000,
      status: 'old',
    },
    {
      id: 2,
      name: 'Nkechi Sylvester',
      registration: '11/2/2011',
      purchase: 1000,
      debt: 5100,
      status: 'veteran'
    },
    {
      id: 3,
      name: 'Emeka Abali',
      registration: '11/2/2011',
      purchase: 200,
      debt: 3000,
      status: 'new'
    },
    {
      id: 4,
      name: 'Emeka Chuks',
      registration: '11/2/2011',
      purchase: 200,
      debt: 10000,
      status: 'new'
    }
]

    return (
        <div className="accordion_body">
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header >Eggs</Accordion.Header>
                    <Accordion.Body >
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          {eggHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                          {eggInput.map((input, i) => (
                            <tr key={input.id}>
                              <td >{input.id}</td>
                              <td>{input.date}</td>
                              <td>{input.big}</td>
                              <td>{input.bunit}</td>
                              <td>{input.small}</td>
                              <td>{input.sunit}</td>
                              <td>{input.damaged_ggs}</td>
                              <td>{(input.big + input.small) - input.damaged_ggs}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header >Feed</Accordion.Header>
                    <Accordion.Body>
                      <Table striped hover responsive>
                        <thead>
                          <tr>
                            {feedHeader.map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                            {feedInput.map((input, i) => (
                              <tr key={input.id}>
                                <td>{input.id}</td>
                                <td>{input.date}</td>
                                <td>{input.qty}</td>
                                <td>{input.store}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header >Bird</Accordion.Header>
                    <Accordion.Body>
                    <Table striped hover responsive>
                        <thead>
                          <tr>
                            {birdHeader.map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                            {birdInput.map((input, i) => (
                              <tr key={input.id}>
                                <td>{input.id}</td>
                                <td>{input.date}</td>
                                <td>{input.bird_number}</td>
                                <td>{input.age}</td>
                                <td>{input.dead_birds}</td>
                                <td>{input.bird_number - input.dead_birds}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header >Customers</Accordion.Header>
                    <Accordion.Body>
                    <Table striped hover responsive>
                        <thead>
                          <tr>
                            {customerHeader.map((header, index) => (
                              <th key={index}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                            {customerInput.map((input, i) => (
                              <tr key={input.id}>
                                <td>{input.id}</td>
                                <td>{input.name}</td>
                                <td>{input.registration}</td>
                                <td>{input.purchase}</td>
                                <td>{input.debt}</td>
                                <td><Badge pill bg={input.status === "new" ? "danger" : input.status === "old" ? "success" : "dark"}>
                                    {input.status}
                                  </Badge>{' '}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ViewRecord;