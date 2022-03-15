import React from 'react';
import Menu from '../Menu/Menu';
import './Home.scss';
import { Card } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';


const barData =  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'No of Eggs',
        fill: false,
        lineTension: 0.5,
        data: [450, 350, 550, 750, 600, 700, 800, 250, 100, 300, 200, 500],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
    }]
}

const barOptions = {
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

const lineData =  {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Amount in Naira',
        fill: false,
        lineTension: 0.5,
        data: [300000, 350000, 550000, 750000, 600000, 70000, 800000, 250000, 150000, 300000, 200000, 500000],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
    }]
}


const lineOptions = {
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
                            <Bar options={{barOptions}} data={barData} /> 
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '30rem', height: '20rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>Monthly Income</Card.Header>
                        <Card.Body>
                        <Card.Title>{'Current Month'} </Card.Title>
                            <Line options={lineOptions} data={lineData}/>
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
                        style={{ width: '25rem', border: '1px solid orange' }}
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
                        style={{ width: '25rem', border: '1px solid orange' }}
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