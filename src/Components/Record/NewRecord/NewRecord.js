import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './newRecord.scss';


const NewRecord = () => {
    const [count] = useState(10);
    const myCustomers = [
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
        {
            id: 6,
            name: 'Add new customer'
        },
    ];
    //Get field values - 1
    const handleSubmit1 = (e) => {
        e.preventDefault();
        const { date, eggs, egg_count, broken_eggs, egg_count_0, size1, egg_count_1, size2, egg_count_2 } = e.target.elements;
        const record_input_1 = {
            date: date.value, 
            total_eggs:{ 
                number: eggs[0].value,
                unit: egg_count.value
            },
            damage_eggs: {
                number: broken_eggs.value, 
                unit: egg_count_0.value
            },
            sizes: {
                big: {
                    quantity: size1.value,
                    unit: egg_count_1.value
                },
                small: {
                    unit: size2.value,
                    quantity: egg_count_2.value
                }
            }
        };
        console.log(record_input_1);
        e.target.reset();
    }
        //Get field values - 2
    const handleSubmit2 = (e) => {
        e.preventDefault();
        const { feed, diesel, crates, medic, compost, birds, customers, customer_qty, new_customer} = e.target.elements;
        const record_input_2 = {
            feed: feed.value,
            diesel: diesel.value,
            crates: crates.value,
            medic: medic.value,
            compost: compost.value,
            birds: birds.value,
            customers_purchase:{
                name: customers.value,
                quantity: customer_qty.value
            }, 
            new_customer: !new_customer.value ? null : new_customer.value
        }
        console.log(record_input_2);
    }
    //Display new field to register customer
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
        const new_name = customer_input.value;
        myCustomers.unshift({
            id: count + 1,
            name:new_name
        });
        console.log(myCustomers);
        customer_input.value = '';
    }
    return (
        <div className='rec_body'>
            <div className='form0'>
                <form onSubmit={handleSubmit1} action="#">
                        <h2>Daily Egg Inventory</h2>
                        <div className='input_with_select' >
                            <input id="date" type={'date'} />
                        </div>
                        <label htmlFor='eggs'>{'Total egg count for today:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='eggs'/>
                            <select name="eggs" id="egg_count" >
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
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
                <form  action="#" onSubmit={handleSubmit2}>
                        <h2>Additional Records <em>(weekly/daily)</em></h2>
                        <label htmlFor='feed'>{'Feed Purchased this week:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='# of bags' id='feed'/>
                        </div>
                        <label htmlFor='Diesel'>{'Diesel:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='price' id='diesel'/>
                        </div>
                        <label htmlFor='crates'>{'Crates:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='# of crates' id='crates'/>
                        </div>
                        <label htmlFor='medic'>{'Medication:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='Amount spent' id='medic'/>
                        </div>
                        <label htmlFor='compost'>{'Compost:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='# of bags' id='compost'/>
                        </div>
                        <label htmlFor='birds'>{'Birds:  (for death, use a negative number)'}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='# of birds' id='birds'/>
                        </div>
                        <label htmlFor='customer'>{'Customer records:  '}</label><br />
                        <div className='input_with_select'>
                        <select name="customers" id="customers" onChange={displayNewInput}>
                            {myCustomers.map(customer => <option key={customer.id} value={customer.name}>{customer.name}</option>
                            )}
                        </select>
                        <input type="number" placeholder='# of crates' id='customer_qty'/>
                        </div>
                        <div id='new_container' style={{display: 'none'}} >
                            <label htmlFor='new_customer'>{'Register new customer:  '}</label><br />
                            <div className="input_with_select">
                                <input type="text" placeholder='Register new customer' id='new_customer'/>
                                <Button onClick={registerNewCustomer} className="my_btn" type="submit">Add</Button>
                            </div>
                        </div><br />
                        <Button className="my_btn" type="submit">
                        Submit
                        </Button>
                        
                </form>
            </div>
        </div>
    )
}


export default NewRecord;