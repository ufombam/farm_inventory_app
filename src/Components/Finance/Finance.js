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
        .catch(() => console.log('unable to complete request'));
        setListener(listener + 1)
        e.target.reset();
    }
    return (
        <div className="fin">
            <div className='header_color'>
                <Menu handleSignOut={handleSignOut} user={user}/>
                <div className='fin_header'>
                        <div className='fin_header_items'>
                            <p>{`Big: ₦ ${!rate ? 0 : Number(rate.big).toLocaleString()} `}</p>
                            <p>{`Small: ₦ ${!rate ? 0 : Number(rate.small).toLocaleString()}`}</p  >
                        </div>
                        <div className='fin_header_items'>
                            <p>{`Running Profit:`}</p>
                            <p style={{color: "Green"}}>{`₦ ${(((income - expense) + (debt)).toLocaleString()) || 0}`}</p>
                        </div>
                        <div className='fin_header_items'>
                            <p>{`Running Debt:`}</p>
                            <p style={{color: "red"}}>{`₦ ${debt.toLocaleString()}`}</p>
                        </div>
                </div>
            </div>
            <div className='fin_body'>
                <div className='fin_body_items'> 
                    <h3 style={{color: 'purple'}}>Record Sales</h3><hr />
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
                    <h3 style={{color: 'purple'}}>Monthly Transactions</h3><hr />
                    <h6><strong>Income</strong></h6>
                    <div className='fin_body_items_1'>
                        <p >Egg Sales</p>
                        <p className='profit_indicator'>{`₦ `}{salesSum.toLocaleString()}</p>
                    </div>
                    <div className='fin_body_items_1'>
                        <p>Compost</p>
                        <p className='profit_indicator'>{`₦ `}{compost.toLocaleString()}</p>
                    </div>
                    <div className='fin_body_items_1'>
                        <h5>Total</h5>
                        <h5 className='profit_indicator'>{`₦ ${income.toLocaleString()}`}</h5>
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
                        <h5 className={`${(income-expense > 0 ? 'profit_indicator' : 'loss_indicator')}`}>{`₦ ${(income - expense).toLocaleString()}`}</h5>
                    </div>
                </div>
            </div>
            <div className='fin_footer'>

            </div>
        </div>
    )
}

export default Finance;