import React, { useState, useEffect } from 'react';
import './Finance.scss';
import { Button } from 'react-bootstrap';
import Menu from '../Menu/Menu';

const Finance = ({ feed, msc, compost, salesSum, expense, income, user, handleSignOut }) => {
    const [debt, setDebt] = useState(0);
    const [listener, setListener] = useState(0);
    const [rate, setRate] = useState([]);

    useEffect(() => {
        if (user)
        //fetch rate
        fetch(`http://localhost:5000/finance/rate/${user.id}`)
        .then(data => data.json())
        .then(rate => setRate({
            big: rate[0].big,
            small: rate[0].small
        })).catch(() => console.log('unable to complete request'))
    },[user])

    useEffect(() => {
        if (user)
        //Fetch debt
        fetch(`http://localhost:5000/finance/debt/${user.id}`)
        .then(data => data.json())
        .then(debit => setDebt(Number(debit[0].sum)))
        .catch(() => console.log('unable to complete request'))
    },[user])


    //Submit the sales request
    const handleSales = (e) => {
        e.preventDefault();
        const { forBig, forSmall} = e.target.elements;
        const salesInput = {
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
                big: (forBig.value * rate.big),
                small: (forSmall.value * rate.small),
                userid: user.id
        }
        fetch(`http://localhost:5000/record/sales/${user.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(salesInput)
        })
        .catch(() => console.log('unable to complete request'));
        setListener(listener + 1)
        e.target.reset();
    }
    return (
        <div className="fin">
            <Menu handleSignOut={handleSignOut}/>
            <div className='fin_header'>
                <div className='fin_header_box'>
                    <div className='fin_header_box_items'>
                        <h5>{`Big Price: ₦ ${!rate ? 0 : Number(rate.big).toLocaleString()} `}</h5>
                        <h5>{`small Price: ₦ ${!rate ? 0 : Number(rate.small).toLocaleString()}`}</h5  >
                    </div>
                    <div className='fin_header_box_items'>
                        <p>{`Running Profit:`}</p>
                        <h4 style={{color: "Green"}}>{`₦ ${(((income - expense) + (debt)).toLocaleString()) || 0}`}</h4>
                    </div>
                    <div className='fin_header_box_items'>
                    <p>{`Running Debt:`}</p>
                        <h4 style={{color: "red"}}>{`₦ ${debt.toLocaleString()}`}</h4>
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
                        <br />
                        <Button className="my_btn" type="submit">
                        Submit
                        </Button>
                    </form>
                </div>
                <div className='fin_body_items'> 
                    <h3>Transactions</h3><hr />
                    <h6>Current Month</h6>
                    <h6>Income</h6>
                    <div className='fin_body_items_1'>
                        <div className='items_0'>
                            <p>Egg Sales</p>
                            <p>Compost</p>
                        </div>
                        <div className='items_1'>
                            <p>{`₦ `}{salesSum.toLocaleString()}</p>
                            <p>{`₦ `}{compost.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className='fin_body_items_1'>
                        <h5 className='items_0'>Total</h5>
                        <h5 className='items_1'>{`₦ ${income.toLocaleString()}`}</h5>
                    </div>
                    <hr />
                    <h6>Expenses</h6>
                    <div className='fin_body_items_1'>
                        <div className='items_0'>
                            <p>Feed</p>
                            <p>miscellaneous</p>
                        </div>
                        <div className='items_1'>
                            <p>{`₦ ${feed.toLocaleString()}`}</p>
                            <p>{`₦ ${msc.toLocaleString()}`}</p>
                        </div>
                    </div>
                    <div className='fin_body_items_1'>
                        <h5 className='items_0'>Total</h5>
                        <h5 className='items_1'>{`₦ ${expense.toLocaleString()}`}</h5>
                    </div>
                    <hr />
                    <div className='fin_body_items_1'>
                        <h5 className='items_0'>Net</h5>
                        <h5 className='items_1'>{`₦ ${(income - expense).toLocaleString()}`}</h5>
                    </div>
                    <hr />
                </div>
            </div>
            <div className='fin_footer'>

            </div>
        </div>
    )
}

export default Finance;