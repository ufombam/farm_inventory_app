import React, { useState, useEffect } from 'react';
import './Finance.scss';
import { Button } from 'react-bootstrap';
import Menu from '../Menu/Menu';

const Finance = () => {
    const [rate, setRate] = useState(
        {
            rate1:'',
            rate2: ''
        }
        
    );

    const myCustomersDB = [
        {
            id: 1,
            name: 'Emeka Useh'
        },
        {
            id: 2,
            name: 'Chika Ngozi'
        },
        {
            id: 3,
            name: 'Blessing Chukwudi'
        },
        {
            id: 4,
            name: 'Esther Ufomba'
        },
        {
            id: 5,
            name: 'George Bush'
        },
    ];

    const purpose = [
        {
            id: 1,
            item: 'Medication'
        },
        {
            id: 2,
            item: 'Diesel'
        },
        {
            id: 3,
            item: 'Feed'
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
            item: 'Miscellaneous'
        }
    ];

    // useEffect(() => {
        
    // },[rate]);
    //Set rate
    const handleRate = (e) => {
        e.preventDefault();
        const { rate1, rate2 } = e.target.elements;
        const rateInput = {
            rate1: rate1.value,
            rate2: rate2.value
        }
        setRate(rateInput)
        console.log(rateInput);
        e.target.reset();
    }
    //Submit the sales request
    const handleSales = (e) => {
        e.preventDefault();
        const { forBig, eggsUnit_1, forSmall, eggsUnit_2, money } = e.target.elements;
        const salesInput = {
            bigEggs: {
                quantity: forBig.value,
                unit: eggsUnit_1.value
            },
            smallEggs: {
                quantity: forSmall.value,
                unit: eggsUnit_2.value
            },
            orMoney: money.value
        }
        console.log(salesInput);
    }

    const handleDebt = (e) => {
        e.preventDefault();
        const { customers, debt } = e.target.elements;
        const debtInput = {
            customer: customers.value,
            debt_amount: debt.value
        }
        console.log(debtInput);
    }

    const handleExpenditure = (e) => {
        e.preventDefault();
        const { expense, purpose } = e.target.elements;
        const expenseInput = {
            expenses: expense.value,
            purpose: purpose.value
        }
        console.log(expenseInput);
    }


    return (
        <div className="fin">
            <Menu />
            <div className='fin_header'>
                <div className='fin_header_rate'>
                    
                        <form action="#" className='sing' onSubmit={handleRate}>
                            <div>
                                <input type={"number"} placeholder={"Big eggs"} id="rate1"></input>
                            </div>
                            <div>
                                <input type={"number"} placeholder={"small eggs"} id="rate2"></input>
                            </div>
                            <button className="fin_btn" type="submit">
                                Set Rate
                            </button>
                        </form>
                    
                </div>
                <div className='fin_header_box'>
                    <div className='fin_header_box_items'>
                        <h5>{`Big: ${rate.rate1}`}</h5>
                        <h5>{`small: ${rate.rate2}`}</h5  >
                    </div>
                    <div className='fin_header_box_items'>
                        <p>{`Running Profit:`}</p>
                        <h4 style={{color: "Green"}}>{`${40000} NGN`}</h4>
                    </div>
                    <div className='fin_header_box_items'>
                    <p>{`Running Debt:`}</p>
                        <h4 style={{color: "red"}}>{`${-14000} NGN`}</h4>
                    </div>
                </div>
            </div>
            <div className='fin_body'>
                <div className='fin_body_items'> 
                    <h3>Record Sales</h3><hr />
                    <form  action="#" onSubmit={handleSales}>
                        <label htmlFor='forBig'>{"Total # of crates sold today (Big) :"}</label>
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='forBig'/>
                            <select name="eggsUnit1" id='eggsUnit_1' >
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div>
                        <label htmlFor='forSmall'>{"Total # of crates sold today (small) :"}</label>
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='forSmall'/>
                            <select name="eggs2" id='eggsUnit_2' >
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div>
                        <hr />
                        OR<br />
                        <label htmlFor='money'>{"Total Sales Realized :"}</label>
                        <div className='input_with_select'>
                            <input type="number" placeholder='input total sales' id='money'/>
                        </div>
                        <br />
                        <Button className="my_btn" type="submit">
                        Submit
                        </Button>
                    </form>
                </div>
                <div className='fin_body_items'>
                    <h3>Record Customer Debt</h3><hr />
                    <form action="#" onSubmit={handleDebt}>
                        <label htmlFor='customer'>{'Select Customer:  '}</label><br />
                            <select className='fin_input' name="customers" id="customers">
                                {myCustomersDB.map(customer => <option key={customer.id} value={customer.name}>{customer.name}</option>
                                )}
                            </select><br />
                        <label htmlFor='debt'>{'Input Debt Amount:  '}</label><br />
                        <div ><input className='fin_input' type="number" placeholder='#Amount' id='debt'/></div><br />
                        <button className='fin_btn' type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
                <div className='fin_body_items'>
                    <h3>Record Expenditure</h3><hr />
                    <form action="#" onSubmit={handleExpenditure}>
                        <label htmlFor='purpose'>{'Input Expenditure:  '}</label><br />
                            <div ><input className='fin_input' type="number" placeholder='#Expenditure' id='expense'/></div><br />
                        <label htmlFor='expense'>{'Input Expenditure:  '}</label><br />
                            <div >
                                <select className='fin_input' type="number" id='purpose'>
                                    {purpose.map(purpose => {
                                        return <option key={purpose.id}>{purpose.item}</option>
                                    })}
                                </select>
                            </div><br />
                            <button className='fin_btn' type='submit'>
                                Submit
                            </button>
                    </form>
                </div>
            </div>
            <div className='fin_footer'>

            </div>
        </div>
    )
}

export default Finance;