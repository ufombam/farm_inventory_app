import React from 'react';
import Menu from '../Menu/Menu';
import './Home.scss';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const data =  {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [{
        label: '# of Eggs',
        data: [12, 19, 3, 5, 2, 3, 30],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
    }]
}


const options = {
title:{
    display:true,
    text:'Daily Eggs count',
    fontSize:20
},
legend:{
    display:true,
    position:'right'
}
}

function Home() {
      
    

    return (
        <div className="home_app">
            <Menu />
            <h1>Overview</h1>
            <div className='my_card_container'>
                <div className='my_card_container1'>
                    <Card
                        text={'dark'}
                        style={{ width: '40rem', height: '25rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>Egg Laying Activity</Card.Header>
                        <Card.Body>
                        <Card.Title>{'Current Week'} </Card.Title>
                            <Bar options={{options}} data={data} /> 
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '30rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>Weekly Income</Card.Header>
                        <Card.Body>
                        <Card.Title>{'success'} Card Title </Card.Title>
                        <Card.Text>
                            
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '18rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>R.O.I</Card.Header>
                        <Card.Body>
                        <Card.Title>{'success'} Card Title </Card.Title>
                        <Card.Text>
                            You have made _____ in profit since you started doing business. Congratulations!
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className='my_card_container2'>
                    <Card
                        text={'dark'}
                        style={{ width: '26rem', border: '1px solid orange' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header2 fw-bold'>Article</Card.Header>
                        <Card.Body>
                        <Card.Title>{'success'} Card Title </Card.Title>
                        <Card.Text>
                            
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '32rem', border: '1px solid orange' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header2 fw-bold'>News</Card.Header>
                        <Card.Body>
                        <Card.Title>{'success'} Card Title </Card.Title>
                        <Card.Text>
                            
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '30rem', border: '1px solid orange' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header2 fw-bold'>Events (Todo)</Card.Header>
                        <Card.Body>
                        <Card.Title>{'success'} Card Title </Card.Title>
                        <Card.Text>
                           
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;