import React, { useEffect, useState } from 'react';
import './Settings.scss';

const Settings = ({ user }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (user) {
        let names = [];
        fetch(`http://localhost:5000/record/names/${user.id}`)
        .then(res => res.json())
        .then(res => {
            res.forEach(x => {
                names.push(x.name)
            })
            setCustomers(["select name", ...names, "Add new customer"])
        })
        .catch(() => console.log('invalid request')) }
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
            fetch(`http://localhost:5000/finance/rate/${user.id}`, {
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
        const handleSettings = (e) => {
            e.preventDefault();
            const {customer_del, file} = e.target.elements;
            const delete_customer = {
                customer: customer_del.value,
            }
            const uploadImage = {
                image: file.value
            }
        }
    return( 
    <div className='settings_container'>
        <div className='form1'>
            <form action="" onSubmit={handleRate}>
                <h3>Set Rate</h3>
                <input type={'number'} id='rate1' placeholder={'Big Egg'}></input><br />
                <input type={'number'} id='rate2' placeholder={'Small Egg'}></input><br />
                <button type={'submit'}>Set Rate</button><br />
            </form><hr />
        </div>
        <div className='form2'>
            <form>
                <label htmlFor='customer_del'>{'Delete Customer for Database'}</label><br />
                <select id='customer_del'>
                    {
                        customers.map((x, i) => <option key={i}>{x}</option>)
                    }
                </select><br />
                <label>{'Upload Profile Image'}</label><br />
                <input type={'file'} id='file'></input><br />
                <button type={'submit'}>Submit</button>
            </form>
        </div>
    </div>
    );
}

export default Settings;