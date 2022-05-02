import React, { useEffect, useState } from 'react';
import './Summary.scss';
import AnimatedNumber from "animated-number-react";
import { getBars } from '../../Home/Home';

const Summary = ({ egg, msc, customer }) => {
    const [feed, setFeed] = useState([]);
    const [compost, setCompost] = useState([]);
    const [eggs, setEggs] = useState([]);
    const [misce, setMisce] = useState([]);

    useEffect(() => {
        //Fetch feed summary
        fetch('http://localhost:5000/record/feed')
        .then(data => data.json())
        .then(feed => setFeed(feed))
        .catch(() => console.log('unable to complete request'))
        //Fetch feed summary
        fetch('http://localhost:5000/record/msc')
        .then(data => data.json())
        .then(msc => setMisce(msc))
        .catch(() => console.log('unable to complete request'))
        //Fetch compost summary
        fetch('http://localhost:5000/record/compost')
        .then(data => data.json())
        .then(compost => setCompost(compost))
        .catch(() => console.log('unable to complete request'))
        //Fetch egg summary
        fetch('http://localhost:5000/record/egg')
        .then(data => data.json())
        .then(eggs => setEggs(eggs))
        .catch(() => console.log('unable to complete request'))
        },[])
    //compute feed data
    const feedData = (x) => x.reduce((object, item) => {
        const keys = ['qty', 'expense'];
        keys.map(x => {
            if (!object[x])
            object[x] = 0
            return true;
        })
        keys.map((x) => object[x] += Number(item[x]) )
        return object
    },{})
    //compute compost data
    const compostData = (x) => x.reduce((object, item) => {
        const keys = ['qty', 'profit'];
        keys.map(x => {
            if (!object[x])
            object[x] = 0
            return true;
        })
        keys.map((x) => object[x] += Number(item[x]) )
        return object
    },{})
    //compute egg Units sold
    const eggUnits = eggs.reduce((object, item) => {
        const keys = ['big', 'small'];
        keys.map(x => 
            !object[x] ? object[x] = 0 : null
        )
        keys.map((x) => object[x] += item[x] )
        return object
    },{})

    const myMsc = misce.reduce((object, item) => {
        const keys = ['medication', 'salaries', 'electricity', 'diesel', 'maintenance', 'miscellaneous'];
        keys.map(x => {
            if (!object[x]) {
            object[x] = 0
            }
        return true;
        })
        keys.map((x) => {
            if (x === (item.purpose).toLowerCase()) {
            object[x] = object[x] =+item.expense
            } 
        return true;
        })
        return object
        },{})

    const cards = {
        egg: {
            id: 1,
            title: 'Egg Record Summary',
            body: 'Total number of crates sold',
            figure: getBars(egg).reduce((a,b) => a + b, 0),
            figure1: eggUnits.big,
            figure2: eggUnits.small
        },
        feed: {
            id: 2,
            title: 'Feed Record Summary',
            body: 'Total bags of feed purchased',
            figure: feedData(feed).qty,
            figure2: feedData(feed).expense
        },
        compost: {
            id: 3,
            title: 'Compost Record Summary',
            body: 'Total bags of compost produced',
            figure: compostData(compost).qty,
            figure2: compostData(compost).profit
        },
        msc: {
            id: 4,
            title: 'Miscellaneous',
            body: 'Other expenses',
            figure: msc,
            figure2: ''
        },
        customer: {
            id: 5,
            title: 'Customer Record Summary',
            body: 'Total number of Customers',
            figure: customer.length,
            figure2: ''
        }
}


    return (
            <div className='d-flex flex-row flex-wrap '>
                <div className="sum d-flex shadow text-center">
                    <div className='sum_header'>{cards.egg.title}</div>
                    <div className='sum_body'>{cards.egg.body}</div>
                    <div className='sum_figure1'>
                        <AnimatedNumber  value={cards.egg.figure}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: '500',
                                transitionProperty:
                                    'background-color, color, opacity'
                            }}
                            formatValue={n => Math.round(n)}
                            duration={500}
                        />
                    </div>
                    <div className='sum_figure2'>
                        <p>{`Big Eggs: ${Number(cards.egg.figure1).toLocaleString()} crates`}</p>
                        <p>{`Small Eggs: ${Number(cards.egg.figure2).toLocaleString()} crates`}</p>
                    </div>
                </div>
                <div className="sum d-flex shadow text-center">
                    <div className='sum_header'>{cards.feed.title    }</div>
                    <div className='sum_body'>{cards.feed.body}</div>
                    <div className='sum_figure1'>
                        <AnimatedNumber  value={cards.feed.figure}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: '500',
                                transitionProperty:
                                    'background-color, color, opacity'
                            }}
                            formatValue={n => Math.round(n)}
                            duration={500}
                        />
                    </div>
                    <div className='sum_figure2'>
                        <p>{`Amount Spent: ₦ ${Number(cards.feed.figure2).toLocaleString()}`}</p>
                    </div>
                </div>
                <div className="sum d-flex shadow text-center">
                    <div className='sum_header'>{cards.compost.title }</div>
                    <div className='sum_body'>{cards.compost.body}</div>
                    <div className='sum_figure1'>
                        <AnimatedNumber  value={cards.compost.figure}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: '500',
                                transitionProperty:
                                    'background-color, color, opacity'
                            }}
                            formatValue={n => Math.round(n)}
                            duration={500}
                        />
                    </div>
                    <div className='sum_figure2'>
                        <p>{`Profit Realized: ₦ ${Number(cards.compost.figure2).toLocaleString()}`}</p>
                    </div>
                </div>
                <div className="sum d-flex shadow text-center">
                    <div className='sum_header'>{cards.msc.title    }</div>
                    <div className='sum_body'>{''}</div>
                        <div className='sum_msc'>
                            <AnimatedNumber  value={cards.msc.figure}
                                style={{
                                    transition: '0.8s ease-out',
                                    fontSize: '500',
                                    transitionProperty:
                                        'background-color, color, opacity'
                                }}
                                formatValue={n => Math.round(n)}
                                duration={500}
                            />
                        </div>
                        <div className='sum_figure_except'>
                            <p>{`Salaries: ₦ ${Number(myMsc.salaries).toLocaleString()} |`}</p>
                            <p>{`Medication: ₦ ${Number(myMsc.medication).toLocaleString()}  |`}</p>
                            <p>{`ELectricity: ₦ ${Number(myMsc.electricity).toLocaleString()}  |`}</p>
                            <p>{`Diesel: ₦ ${Number(myMsc.diesel).toLocaleString()}  |`}</p>
                            <p>{`Maintenance: ₦ ${Number(myMsc.maintenance).toLocaleString()}  |`}</p>
                            <p>{`Miscellaneous: ₦ ${Number(myMsc.miscellaneous).toLocaleString()}`}</p>
                        </div>
                </div>
                <div className="sum d-flex shadow text-center">
                    <div className='sum_header'>{cards.customer.title    }</div>
                    <div className='sum_body'>{cards.customer.body}</div>
                    <div className='sum_figure1'>
                        <AnimatedNumber  value={cards.customer.figure}
                            style={{
                                transition: '0.8s ease-out',
                                fontSize: '500',
                                transitionProperty:
                                    'background-color, color, opacity'
                            }}
                            formatValue={n => Math.round(n)}
                            duration={500}
                        />
                    </div>
                    <div className='sum_figure2'>
                        <p>{cards.customer.figure2}</p>
                    </div>
                </div>
            </div>
            )
    }
export default Summary;