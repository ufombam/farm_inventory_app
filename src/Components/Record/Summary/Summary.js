import React from 'react';
import './Summary.scss';
import AnimatedNumber from 'react-animated-number';

const Summary = () => {
    const cards = [
        {
            id: 1,
            title: 'Egg Record Summary',
            body: 'Total number of eggs sold',
            figure: 5000
        },
        {
            id: 2,
            title: 'Feed Record Summary',
            body: 'Total bags of feed purchased',
            figure: 25000
        },
        {
            id: 3,
            title: 'Diesel Record Summary',
            body: 'Total Money spent on Diesel',
            figure: 200000
        },
        {
            id: 4,
            title: 'Compost Record Summary',
            body: 'Total bags of compost produced',
            figure: 1000
        },
        {
            id: 5,
            title: 'Customer Record Summary',
            body: 'Total number of Customers',
            figure: 50
        }
    ]
    return (
            <div className='d-flex flex-row flex-wrap '>
                {
                    cards.map(cards => 
                            <div key={cards.id} className="sum d-flex shadow text-center">
                                <div className='sum_header'>{cards.title.toUpperCase()}</div>
                                <div className='sum_body'>{cards.body}</div>
                                <div className='sum_figure'>
                                    <AnimatedNumber  value={cards.figure}
                                        style={{
                                            transition: '0.8s ease-out',
                                            fontSize: 50,
                                            transitionProperty:
                                                'background-color, color, opacity'
                                        }}
                                        frameStyle={perc => (
                                            perc === 100 ? {} : {backgroundColor: 'none', color: 'black'}
                                        )}
                                        initialValue={0}
                                        formatValue={n => Math.round(n)}
                                        duration={500}
                                    />
                                </div>
                            </div>
                        )
                    
                }
            </div>
            )
    }
export default Summary;