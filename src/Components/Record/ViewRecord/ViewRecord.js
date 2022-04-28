import React, { useState, useEffect } from "react";
import { Accordion, Table, Badge } from 'react-bootstrap';
import './ViewRecord.scss';


const ViewRecord = () => {
  const [eggInput, setEggInput] = useState([]);
  const [feedInput, setFeedInput] = useState([]);
  const [birdInput, setBirdInput] = useState([]);
  const [compostInput, setCompostInput] = useState([]);
  const [mscInput, setMscInput] = useState([]);
  const [customerInput, setCustomerInput] = useState([]);
  const [salesInput, setSalesInput] = useState([]);

  useEffect(() => {
    //fetch sales record
    fetch('http://localhost:5000/record/sales')
    .then(response => response.json())
    .then(res => {
      setSalesInput(res)
    })
    //fetch egg record
    fetch('http://localhost:5000/record/egg')
    .then(response => response.json())
    .then(res => {
      setEggInput(res)
    })
    //fetch feed record
    fetch('http://localhost:5000/record/feed')
    .then(response => response.json())
    .then(res => {
      setFeedInput(res)
    })
    //fetch birds record
    fetch('http://localhost:5000/record/bird')
    .then(response => response.json())
    .then(res => {
      setBirdInput(res)
    })
    //fetch compost record
    fetch('http://localhost:5000/record/compost')
    .then(response => response.json())
    .then(res => {
      setCompostInput(res)
    })
    //fetch compost record
    fetch('http://localhost:5000/record/msc')
    .then(response => response.json())
    .then(res => {
      setMscInput(res)
    })

    //fetch compost record
    fetch('http://localhost:5000/record/customers')
    .then(response => response.json())
    .then(res => {
      setCustomerInput(res)
    })
  },[]);


  const salesHeader = [
    "Date", "Big", "Small", "Total"
  ];
  const eggHeader = [
    "Date", "Big", "Unit", "Small" , "Unit", "Damaged Eggs", "Total"
  ];

  const feedHeader = [
    "#", "Date", "Qty", "Store of Purchase", "Expense"
  ];

  const birdHeader = [
    "#", "Date", "# of Birds", "Store", "Dead Birds", "Total"
  ];

  const customerHeader =     [
    "#", "Date", "Registration Date", "Purchases", "Debt Status", "Status"
  ];

const compostHeader =     [
  "#", "Date", "Quantity", "Profit"
];

const mscHeader =     [
  "#", "Date", "Purpose", "Expenditure"
];

    return (
        <div className="accordion_body">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                    <Accordion.Header >Sales</Accordion.Header>
                    <Accordion.Body >
                    <Table striped hover responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          {salesHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                          {salesInput.map((input, i) => (
                            <tr key={input.id}>
                              <td >{input.id}</td>
                              <td >{input.date.slice(0,10)}</td>
                              <td>{input.big}</td>
                              <td>{input.small}</td>
                              <td>{(input.big + input.small)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
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
                            <td>{input.date.slice(0,10)}</td>
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
              <Accordion.Item eventKey="2">
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
                              <td>{input.date.slice(0,10)}</td>
                              <td>{input.qty}</td>
                              <td>{input.store}</td>
                              <td>{input.expense}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
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
                              <td>{input.date.slice(0,10)}</td>
                              <td>{input.birds}</td>
                              <td>{input.store}</td>
                              <td>{input.dead_birds}</td>
                              <td>{input.birds - input.dead_birds}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
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
                              <td>{input.registration.slice(0,10)}</td>
                              <td>{input.purchases}</td>
                              <td>{input.debt}</td>
                              <td><Badge pill bg={input.purchases <= 50 ? "danger" : input.purchases <= 200 ? "success" : "dark"}>
                                  {input.purchases <= 50 ? "new" : input.purchases <= 200 ? "old" : "veteran"}
                                </Badge>{' '}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                  <Accordion.Header >Compost</Accordion.Header>
                  <Accordion.Body>
                  <Table striped hover responsive>
                      <thead>
                        <tr>
                          {compostHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                          {compostInput.map((input, i) => (
                            <tr key={input.id}>
                              <td>{input.id}</td>
                              <td>{input.date.slice(0,10)}</td>
                              <td>{input.qty}</td>
                              <td>{input.profit}</td>
                              <td>{input.debt}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                  <Accordion.Header >Miscellaneous</Accordion.Header>
                  <Accordion.Body>
                  <Table striped hover responsive>
                      <thead>
                        <tr>
                          {mscHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                          {mscInput.map((input, i) => (
                            <tr key={input.id}>
                              <td>{input.id}</td>
                              <td>{input.date.slice(0,10)}</td>
                              <td>{input.purpose}</td>
                              <td>{input.expense}</td>
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