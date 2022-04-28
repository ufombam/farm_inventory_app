import React, { useState, useEffect } from 'react';
import { Button, Accordion } from 'react-bootstrap';
import './newRecord.scss';


const NewRecord = () => {
    const [customers, setCustomers] = useState(["Select name","Add new customer"]);

    

    useEffect(() => {
        let names = [];
        fetch('http://localhost:5000/record/names')
        .then(res => res.json())
        .then(res => {
            res.forEach(x => {
                names.push(x.name)
            })
            setCustomers(["select name", ...names, "Add new customer"])
        })
        .catch(() => console.log('invalid request'))
    },[])

    //Submit daily inventory/egg sizes field values to DB - 1
    const handleSubmit1 = (e) => {
        e.preventDefault();
        const { date, broken_eggs, size1, egg_count_1, size2, egg_count_2 } = e.target.elements;
        const time = new Date();
        const record_input_1 = {
            date: date.value + " "+ (time.toLocaleTimeString()), 
            damaged_eggs: broken_eggs.value,
            sizes: {
                big: {
                    quantity: size1.value,
                    unit: egg_count_1.value
                },
                small: {
                    unit: egg_count_2.value,
                    quantity: size2.value
                }
            }
        };
        fetch('http://localhost:5000/record/egg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record_input_1)
        })
        .catch(err => console.log('unable to complete request'))
        e.target.reset();
    }

    //Submit feed input  to DB
    const handleFeed = (e) => {
        e.preventDefault();
        const { feed, feed_store, feed_expense } = e.target.elements;
        const feed_input = {
            qty: feed.value,
            store: feed_store.value,
            expense: feed_expense.value,
        }
        fetch('http://localhost:5000/record/feed', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(feed_input)
        })
        .catch(() => console.log('unable to complete request'))
        e.target.reset();
    }
    //Submit birds input  to DB
    const handleBirds = (e) => {
        e.preventDefault();
        const { bird, bird_store, bird_expense, dead_bird } = e.target.elements;
        const bird_input = {
            bird: bird.value,
            store: bird_store.value,
            investment: bird_expense.value,
            dead: dead_bird.value,
        }
        fetch('http://localhost:5000/record/bird', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bird_input)
        })
        .catch(() => console.log('unable to complete request'))
        e.target.reset();
    }

    //Submit customer input  to DB
    const handleCustomer = (e) => {
        e.preventDefault();
        const { customers, customer_qty, customer_debt } = e.target.elements;
        const customer_input = {
            name: customers.value === "select name" ||customers.value === "Add new customer" ? alert("invalid input") : customers.value,
            qty: customer_qty.value,
            debt: customer_debt.value,
        }
        fetch('http://localhost:5000/record/customers', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer_input)
        })
        .catch(() => console.log('unable to complete request'))
        e.target.reset()
    }

    //Display new input to register customer
    const displayNewInput = (newCustomer) => {
        const customers = newCustomer.target.value;
        const container = document.getElementById('new_container');
        if (customers.toLowerCase() === "add new customer") {
            container.style.display = 'block';
        } else { 
            container.style.display = 'none';
        }
    }

    //Register new customer
    const registerNewCustomer = (e) => {
        e.preventDefault();
        const customer_input = document.getElementById('new_customer');
        const new_name = {name: customer_input.value};
        fetch('http://localhost:5000/record/customers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_name)
        })
        .catch(() => console.log('customer already exists'))
        customer_input.value = '';
    }

    //Submit compost input values to DB
    const handleCompost = (e) => {
        e.preventDefault();
        const { compost, compost_profit } = e.target.elements;
        const compost_input = {
            compost: compost.value,
            profit: compost_profit.value
        }
        fetch('http://localhost:5000/record/compost', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(compost_input)
        })
        .catch(() => console.log('unable to complete request'))
        e.target.reset()
    }


    //For Miscellaneous
    const purpose = [
        {
            id: 1,
            item: 'Medication'
        },
        {
            id: 4,
            item: 'Salaries'
        },
        {
            id: 5,
            item: 'Electricity'
        },
        {
            id: 6,
            item: 'Diesel'
        },
        {
            id: 7,
            item: 'Miscellaneous'
        }
    ];
    //submit msc inputs to DB
    const handleMsc = (e) => {
        e.preventDefault();
        const { expense, purpose } = e.target.elements;
        const msc_input = {
            expense: expense.value,
            purpose: purpose.value
        }
        fetch('http://localhost:5000/record/msc', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(msc_input)
        })
        .catch(() => console.log('unable to complete request'))
        e.target.reset()
    }
    return (
        <div className='rec_body'>
            <div className='form0'>
                <form onSubmit={handleSubmit1} action="#">
                        <h2>Daily Egg Inventory</h2>
                        <div className='input_with_select' >
                            <input id="date" type={'date'} />
                        </div>
                        <label htmlFor='broken-eggs'>{'Damaged eggs:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='broken_eggs'/>
                            <select name="eggs0" id='egg_count_0'>
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div>
                        <hr />
                        <h2>Egg count by Size</h2>
                        <label htmlFor='size1'>{'Total egg count for today (big):  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='size1'/>
                            <select name="eggs1" id='egg_count_1'>
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div>
                        <label htmlFor='size2'>{'Total egg count for today (small):  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='size2'/>
                            <select name="eggs2" id='egg_count_2'>
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div><br />
                    <Button className="my_btn" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
            <div className='form1'>
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>FEED INPUT</Accordion.Header>
                    <Accordion.Body>
                        <form  action="#" onSubmit={handleFeed}>
                            <h2>Feed Data</h2>
                            <label htmlFor='feed'>{'Feed Purchased this week:  '}</label><br />
                            <div className='input_with_select'>
                                <input type="number" placeholder='# of bags' id='feed'/>
                            </div>
                            <label htmlFor='feed_store'>{'Store:  '}</label><br />
                            <div className='input_with_select'>
                                <input type="text" placeholder='store name' id='feed_store'/>
                            </div>
                            <label htmlFor='feed_expense'>{'Expenditure:  '}</label><br />
                            <div className='input_with_select'>
                                <input type="number" placeholder='# Expenditure' id='feed_expense'/>
                            </div>
                            <br />
                            <Button className="my_btn" type="submit">
                            Submit
                            </Button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>BIRD INPUT</Accordion.Header>
                    <Accordion.Body>
                        <form  action="#" onSubmit={handleBirds}>
                                <h3>Birds Data</h3>
                                <label htmlFor='bird'>{'New Birds Purchased:  '}</label><br />
                                <div className='input_with_select'>
                                    <input type="number" placeholder='# of birds' id='bird'/>
                                </div>
                                <label htmlFor='bird_store'>{'Store:  '}</label><br />
                                <div className='input_with_select'>
                                    <input type="text" placeholder='store name' id='bird_store'/>
                                </div>
                                <label htmlFor='bird_expense'>{'Invested Amount:  '}</label><br />
                                <div className='input_with_select'>
                                    <input type="number" placeholder='#Invested Amount' id='bird_expense'/>
                                </div>
                                <label htmlFor='dead_bird'>{'Record Death:  '}</label><br />
                                <div className='input_with_select'>
                                    <input type="number" placeholder='# of Deaths' id='dead_bird'/>
                                </div>
                                <br />
                                <Button className="my_btn" type="submit">
                                Submit
                                </Button>
                            </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>CUSTOMER INPUT</Accordion.Header>
                    <Accordion.Body>
                        <form  action="#" onSubmit={handleCustomer}>
                                <h3>Customer Data</h3>
                                <label htmlFor='customer'>{'Customer records:  '}</label><br />
                                <div className='input_with_select'>
                                <select name="customers" id="customers" onChange={displayNewInput}>
                                    {customers.map((customer, i) => <option key={i} value={customer}>{customer}</option>
                                    )}
                                </select>
                                <input type="number" placeholder='# of crates' id='customer_qty'/>
                                </div>
                                <label htmlFor='customer_debt'>{'Record Debt:  '}</label><br />
                                <div className='input_with_select'>
                                    <input type="number" placeholder='#Debt' id='customer_debt'/>
                                </div><br />
                            <Button className="my_btn" type="submit">
                            Submit
                            </Button>
                        </form>
                        <form action={registerNewCustomer} onSubmit={registerNewCustomer}>
                            <div id='new_container' style={{display: 'none'}} >
                                <label htmlFor='new_customer'>{'Register new customer:  '}</label><br />
                                <div className="input_with_select">
                                    <input type="text" placeholder='Register new customer' id='new_customer' required aria-required/>
                                    <Button onClick={registerNewCustomer} className="my_btn" type="submit" aria-required>Add</Button>
                                </div>
                            </div>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>COMPOST</Accordion.Header>
                    <Accordion.Body>
                        <form  action="#" onSubmit={handleCompost}>
                            <h3>Compost Data</h3>
                            <label htmlFor='compost'>{'Compost:  '}</label><br />
                            <div className='input_with_select'>
                                <input type="number" placeholder='# of bags' id='compost'/>
                            </div>
                            <label htmlFor='compost_profit'>{'Input Profit:  '}</label><br />
                            <div className='input_with_select'>
                                <input type="number" placeholder='#Profit' id='compost_profit'/>
                            </div><br />
                            <Button className="my_btn" type="submit">
                            Submit
                            </Button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>MISCELLANEOUS</Accordion.Header>
                    <Accordion.Body>
                        <form  action="#" onSubmit={handleMsc}>
                            <h3>Additional Records</h3>
                            <label htmlFor='expense'>{'Purpose:  '}</label><br />
                            <div >
                                <select className='input_with_select' type="number" id='purpose'>
                                    {purpose.map(purpose => {
                                        return <option key={purpose.id}>{purpose.item}</option>
                                    })}
                                </select>
                            </div>
                            <label htmlFor='purpose'>{'Input Expenditure:  '}</label><br />
                            <div ><input className='input_with_select' type="number" placeholder='#Expenditure' id='expense'/></div><br />
                            <Button className="my_btn" type="submit">
                            Submit
                            </Button>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </div>
    )
}


export default NewRecord;