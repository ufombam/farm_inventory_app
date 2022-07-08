import React, { useState, useEffect } from 'react';
import './Finance.scss';
import { Button, Alert } from 'react-bootstrap';
import Menu from '../Menu/Menu';

const Finance = ({ feed, msc, compost, salesSum, expense, income, user, handleSignOut }) => {
    const [debt, setDebt] = useState(0);
    const [rate, setRate] = useState([]);
    const [show, setShow] = useState(true);


    useEffect(() => {
        if (user)
        //fetch rate
        fetch(`https://fast-scrubland-53064.herokuapp.com/finance/rate/${user.id}`)
        .then(data => data.json())
        .then(rate => setRate({
            big: rate[0].big,
            small: rate[0].small
        })).catch(() => console.log('unable to complete request'))
    },[user])

    useEffect(() => {
        if (user)
        //Fetch debt
        fetch(`https://fast-scrubland-53064.herokuapp.com/finance/debt/${user.id}`)
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
        fetch(`https://fast-scrubland-53064.herokuapp.com/record/sales/${user.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(salesInput)
        })
        .then(response => {
            if (response.ok) e.target.reset();
        })
        .catch(() => console.log('unable to complete request'));
    }

    const alertRateError = () => {
        const myAlert = document.getElementById('alert');
        if (!rate.length && myAlert.style.display === 'none') {
            myAlert.style.display = 'block'
        }
    }
    const revertRateAlert = () => {
        setShow(false)
        const myAlert = document.getElementById('alert');
        myAlert.style.display = 'none'
    }
    return (
        <div className="fin">
            <div className=''>
            <div style={{display: 'none'}} id="alert">
                <Alert show={show} variant="danger" fade="true">
                    <Alert.Heading>Alert!</Alert.Heading>
                    <p>
                        Please set the price of various crates sizes from the <Alert.Link href="settings">Settings</Alert.Link> page first, before you proceed. 
                        If you have done this previously, then you should wait until the price is updated on the display.
                        Refer to the <Alert.Link href="help">help</Alert.Link> menu for further help.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={revertRateAlert} variant="outline-danger">
                            Close
                        </Button>
                    </div>
                </Alert>
            </div>
                <Menu handleSignOut={handleSignOut} user={user}/>
                <div className='fin_header'>
                        <div className='fin_header_items'>
                            <p>{`Big: ₦ ${isNaN(rate.big) ? 0 : Number(rate.big).toLocaleString()} `}</p>
                            <p>{`Small: ₦ ${isNaN(rate.big) ? 0 : Number(rate.small).toLocaleString()}`}</p  >
                        </div>
                        <div className='fin_header_items'>
                            <p>{`Running Profit:`}</p>
                            <p>{`₦ ${isNaN(income) ? 0 : (((income - expense) + (debt)).toLocaleString())}`}</p>
                        </div>
                        <div className='fin_header_items'>
                            <p>{`Running Debt:`}</p>
                            <p>{`₦ ${debt.toLocaleString() || 0}`}</p>
                        </div>
                </div>
            </div>
            <div className='fin_body'>
                <div className='fin_body_items'> 
                    <h3 style={{color: 'purple'}}>Record Sales</h3><hr />
                    <form  action="#" onSubmit={handleSales}>
                        <label htmlFor='forBig'>{"Total # of crates sold today (Big) :"}</label>
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='forBig' onChange={alertRateError}/>
                            <select name="eggsUnit1" id='eggsUnit_1' >
                                <option value="crates">Crates</option>
                                <option value="eggs">Eggs</option>
                            </select>
                        </div>
                        <label htmlFor='forSmall'>{"Total # of crates sold today (small) :"}</label>
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='forSmall' onChange={alertRateError}/>
                            <select name="eggs2" id='eggsUnit_2' >
                                <option value="crates">Crates</option>
                                <option value="eggs">Eggs</option>
                            </select>
                        </div>
                        <br />
                        <Button className="my_btn" type="submit">
                        Submit
                        </Button>
                    </form>
                </div>
                <div className='fin_body_items'> 
                    <h3 style={{color: 'purple'}}>Monthly Transactions</h3><hr />
                    <h6><strong>Income</strong></h6>
                    <div className='fin_body_items_1'>
                        <p >Egg Sales</p>
                        <p className='profit_indicator'>{`₦ `}{isNaN(salesSum) ? 0 : salesSum.toLocaleString()}</p>
                    </div>
                    <div className='fin_body_items_1'>
                        <p>Compost</p>
                        <p className='profit_indicator'>{`₦ `}{compost.toLocaleString()}</p>
                    </div>
                    <div className='fin_body_items_1'>
                        <h5>Total</h5>
                        <h5 className='profit_indicator'>{`₦ ${isNaN(income) ? 0 : income.toLocaleString()}`}</h5>
                    </div>
                    <hr />
                    <h6><strong>Expenses</strong></h6>
                    <div className='fin_body_items_1'>
                        <p>Feed</p>
                        <p className='loss_indicator'>{`₦ ${feed.toLocaleString()}`}</p>
                    </div>
                    <div className='fin_body_items_1'>
                        <p>miscellaneous</p>
                        <p className='loss_indicator'>{`₦ ${msc.toLocaleString()}`}</p>
                    </div>
                    <div className='fin_body_items_1'>
                        <h5>Total</h5>
                        <h5 className='loss_indicator'>{`₦ ${expense.toLocaleString()}`}</h5>
                    </div>
                    <hr />
                    <div className='fin_body_items_1'>
                        <h5><strong>Net</strong></h5>
                        <h5 className={`${(income-expense > 0 ? 'profit_indicator' : 'loss_indicator')}`}>{`₦ ${isNaN(income) ? 0 : (income - expense).toLocaleString()}`}</h5>
                    </div>
                </div>
            </div>
            <div className='fin_footer'>

            </div>
        </div>
    )
}

export default Finance;