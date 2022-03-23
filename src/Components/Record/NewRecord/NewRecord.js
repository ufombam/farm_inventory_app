import React from 'react';
import { Button } from 'react-bootstrap';
import './newRecord.scss';


const NewRecord = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { date } = e.target.elements;
        console.log(date.value)
    }
    return (
        <div className='rec_body'>
            <div className='form0'>
                <form onSubmit={handleSubmit} action="#">
                        <h2>Daily Egg Inventory</h2>
                        <div className='input_with_select' >
                            <input id="date" type={'date'} />
                        </div>
                        <label htmlFor='eggs'>{'Total egg count for today:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='eggs'/>
                            <select name="eggs" >
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div>
                        <label htmlFor='broken-eggs'>{'Damaged eggs:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='broken-eggs'/>
                            <select name="eggs1">
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select>
                        </div>
                        <hr />
                        <h2>Egg count by Size</h2>
                        <label htmlFor='size1'>{'Total egg count for today:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='size1'/>
                            <select name="eggs2" >
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select> {"| "}
                            <input type="radio" id="big" name="size" value="big"/>{"  "}
                            <label htmlFor='big'>{"Big"}</label>{"  "}
                            <input type="radio" id="small" name="size" value="small"/>{"  "}
                            <label htmlFor='small'>{"Small"}</label>
                        </div>
                        <label htmlFor='size2'>{'Total egg count for today:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='input egg number' id='size2'/>
                            <select name="eggs3" >
                                <option value="eggs">Eggs</option>
                                <option value="crates">Crates</option>
                            </select> {"| "}
                            <input type="radio" id="big-1" name="size-1" value="big"/>{"  "}
                            <label htmlFor='big-1'>{"Big"}</label>{" "}
                            <input type="radio" id="small-1" name="size-1" value="small"/>{"  "}
                            <label htmlFor='small-1'>{"Small"}</label>
                        </div><br />
                    <Button className="my_btn" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
            <div className='form1'>
                <form onSubmit={handleSubmit} action="#">
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
                        <label htmlFor='birds'>{'Birds:  '}</label><br />
                        <div className='input_with_select'>
                            <input type="number" placeholder='# of birds' id='birds'/>
                        </div> <br />
                        <Button className="my_btn" type="submit">
                        Submit
                        </Button>
                        
                </form>
            </div>
        </div>
    )
}


export default NewRecord;