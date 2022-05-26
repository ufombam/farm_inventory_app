import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Settings.scss';
import Menu from '../Menu/Menu';

const Settings = ({ user, handleSignOut }) => {
    const [customers, setCustomers] = useState(["Select name"]);

    useEffect(() => {
        if (user) {
        let names = [];
        fetch(`https://fast-scrubland-53064.herokuapp.com/record/names/${user.id}`)
        .then(res => res.json())
        .then(res => {
            res.forEach(x => {
                names.push(x.name)
            })
            setCustomers(["select name", ...names])
        })
        .catch(() => console.log('invalid request')) 
        }
    },[user])


        //Set rate
        const handleRate = (e) => {
            e.preventDefault();
            const { rate1, rate2 } = e.target.elements;
            const rateInput = {
                big: rate1.value,
                small: rate2.value,
                userid: user.id
            }
            fetch(`https://fast-scrubland-53064.herokuapp.com/finance/rate/${user.id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rateInput)
            })
            .catch(() => console.log('unable to complete request'));
            e.target.reset();
        }

        //submit settings
        const handleDelete = (e) => {
            e.preventDefault();
            const {customer_del} = e.target.elements;
            const delete_customer = {
                name: customer_del.value,
            }
            axios.delete(`https://fast-scrubland-53064.herokuapp.com/record/customers/${user.id}`, {data: delete_customer})
        }

    return( 
    <div className='settings_container'>
        <Menu handleSignOut={handleSignOut} user={user}/>
        <div className='form1'>
            <form action="" onSubmit={handleRate}>
                <h5>Set Rate</h5>
                <input type={'number'} id='rate1' placeholder={'Big Egg'}></input><br />
                <input type={'number'} id='rate2' placeholder={'Small Egg'}></input><br />
                <button type={'submit'}>Set Rate</button><br />
            </form><hr />
        </div>
        <div className='form2'>
            <form onSubmit={handleDelete}>
                <label htmlFor='customer_del'>{'Delete Customer'}</label><br />
                <select id='customer_del'>
                    {
                        customers.map((x, i) => <option key={i}>{x}</option>)
                    }
                </select><br />
                <button type={'submit'}>Submit</button><br />

                <h6 style={{color: 'red'}}><em>Actions taken here cannot be undone, Please take care</em></h6>
            </form>
        </div>
    </div>
    );
}

export default Settings;