import React from 'react';
import './Finance.scss';
import { Button } from 'react-bootstrap';
import Menu from '../Menu/Menu';

const Finance = () => {
    return (
        <div className="fin">
            <Menu />
            <div className='fin_header'>
                <div>
                    <form>
                        <div className='input_with_select'>
                            <input type={"number"} placeholder={"Big eggs"} id="rate1"></input>
                        </div>
                        <div className='input_with_select'>
                            <input className='input_with_select' type={"number"} placeholder={"small eggs"} id="rate2"></input>
                        </div>
                        <Button className="my_btn" type="submit">
                            Set
                        </Button>
                    </form>
                </div>
                <div>
                    <div className='fin_header_items'>crate rate</div>
                    <div className='fin_header_items'>Weekly Profit</div>
                    <div className='fin_header_items'>Weekly Debt</div>
                </div>
            </div>
            <div className='fin_body'>
                <div className='fin_body_items'> 
                    <h3>Record Sales</h3><br />
                    <form  action="#">
                        <label htmlFor='size1'>{"Total # of crates sold today :"}</label>
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
                <div className='fin_body_items'> <h3>Record Customer Debt</h3></div>
                <div className='fin_body_items'> <h3>Record Expenditure</h3></div>
            </div>
            <div className='fin_footer'></div>
        </div>
    )
}

export default Finance;