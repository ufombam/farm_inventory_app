import React, { useEffect, useState } from 'react';
import './Summary.scss';
import AnimatedNumber from "animated-number-react";
import { getBars } from '../../Home/Home';

const Summary = ({ egg, customer, user }) => {
    const [feed, setFeed] = useState([]);
    const [compost, setCompost] = useState([]);
    const [eggs, setEggs] = useState([]);
    const [misce, setMisce] = useState([]);
    const [bird, setBird] = useState();

    useEffect(() => {
        if (user) {
            //Fetch feed summary
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/feed/${user.id}`)
            .then(data => data.json())
            .then(feed => setFeed(feed))
            .catch(() => console.log('unable to complete request'))
            //Fetch msc summary
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/msc/${user.id}`)
            .then(data => data.json())
            .then(msc => setMisce(msc))
            .catch(() => console.log('unable to complete request'))
            //Fetch compost summary
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/compost/${user.id}`)
            .then(data => data.json())
            .then(compost => setCompost(compost))
            .catch(() => console.log('unable to complete request'))
            //Fetch egg summary
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/egg/${user.id}`)
            .then(data => data.json())
            .then(eggs => setEggs(eggs))
            .catch(() => console.log(`unable to complete request/${user.id}`))
            //Fetch bird summary
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/bird/${user.id}`)
            .then(data => data.json())
            .then(bird => setBird(bird[bird.length-1]))
            .catch(() => console.log(`unable to complete request/${user.id}`))
        }
    },[user])
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
    //compute individual expenses
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

        //Compute total expenses
        const mscTotal = [myMsc].reduce((x, item) => {
            const items = Object.keys(item)
            items.map(data => x += item[data])
            return x;
        },0)

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
            title: 'Compost Summary',
            body: 'Total bags of compost produced',
            figure: compostData(compost).qty,
            figure2: compostData(compost).profit
        },
        msc: {
            id: 4,
            title: 'Miscellaneous',
            body: 'Other expenses',
            figure: mscTotal,
            figure2: ''
        },
        customer: {
            id: 5,
            title: 'Customer Summary',
            body: 'Total number of Customers',
            figure: customer.length,
            figure2: ''
        },
        bird: {
            id: 6,
            title: 'Bird Record Summary',
            body: 'Total number Birds in stock',
            figure: bird?.stock,
            figure1: bird?.dead_birds,
            figure2: bird?.culled
        }
}


    return (
            <div className='summary_body d-flex flex-row flex-wrap '>
                <div className='summary-card-container'>
                    <div className="sum d-flex shadow text-center">
                        <div className='sum_header'>{cards.egg.title}</div>
                        <div className='sum_body'>{cards.egg.body}</div>
                        <div className='sum_figure1'>
                            <AnimatedNumber  value={cards.egg.figure}
                                style={{
                                    transition: '0.8s ease-out',
                                    transitionProperty:
                                        'background-color, color, opacity'
                                }}
                                formatValue={n => Math.round(n)}
                                duration={500}
                            />
                        </div>
                        <div className='sum_figure2'>
                            <p>{`Big Eggs: ${NaN ? 0 : Number(cards.egg.figure1).toLocaleString()} crates`}</p>
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
                    <div className="sum d-flex shadow text-center">
                        <div className='sum_header'>{cards.bird.title}</div>
                        <div className='sum_body'>{cards.bird.body}</div>
                        <div className='sum_figure1'>
                            <AnimatedNumber  value={cards.bird.figure}
                                style={{
                                    transition: '0.8s ease-out',
                                    transitionProperty:
                                        'background-color, color, opacity'
                                }}
                                formatValue={n => Math.round(n)}
                                duration={500}
                            />
                        </div>
                        <div className='sum_figure2'>
                            <p>{`Total Deaths: ${(cards.bird.figure1)} birds`}</p>
                            <p>{`Total Culled: ${(cards.bird.figure2)} birds`}</p>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
export default Summary;