import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import './Home.scss';
import { Card, Carousel } from 'react-bootstrap';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';


// (async ()  => {
//     let response = await fetch('http://localhost:5000/record/eggs');
//     let dataB = response.json();
// })();

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

export const getBars = (x) => {
    const dBarObj = x.reduce((total, item) => {
    const month = item.date.slice(5,7);
    const month2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
    month2.forEach(x => {
        if (!total[x]) total[x] = 0;
    })
    //if (!total[month]) total[month] = 0
    total[month] += (item.big + item.small)
        return total
    }, {})

    const sortedKey = Object.keys(dBarObj).sort();
    const chartData = sortedKey.map((x)  => {
    return dBarObj[x]
    },{})
    return chartData;
}

function Home({ income, expense, bar }) {
    const [line, setLine] = useState([]);     
    const [article, setArticle] = useState();    
    const [articleIndex] = useState(Array.from({length:5}).map(x => Math.floor(Math.random() * 19)));    

    useEffect(() => {
        //fetch line chart coordinates
        fetch('http://localhost:5000/record/sales')
        .then(response => response.json())
        .then(data => {
            setLine(data)
        })
        //fetch news
        fetch(`https://newsapi.org/v2/everything?q=poultry&from=${(new Date().getFullYear)}-${new Date().getMonth()}-01&sortBy=publishedAt&apiKey=066e3e6cde1c47f3b7ae852685fcd128`)
        .then(response => response.json())
        .then(data => {
            setArticle(data.articles)
            //setArticleIndex(newsKeyGen())
        })
    },[])
	
	//Generate Random newsItem array
	//const newsKeyGen = () => Array.from({length:3}).map(x => Math.floor(Math.random() * 19))

    //deduce line chart coordinates
    const getLine = (x) => {
        const dLineObj = x.reduce((total, item) => {
        const month = item.date.slice(5,7);
        const month2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
        month2.forEach(x => {
            if (!total[x]) total[x] = 0;
        })
        //if (!total[month]) total[month] = 0
        total[month] += (item.big + item.small)
            return total
        }, {})
        const sortedKey = Object.keys(dLineObj).sort();
        const chartData = sortedKey.map((x)  => {
        return dLineObj[x]
        },{})
        return chartData;
    }
    
    const lineData =  {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Amount in Naira',
            fill: false,
            lineTension: 0.5,
            data: getLine(line),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }

    const barData =  {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'No of Eggs',
            fill: false,
            lineTension: 0.5,
            data: getBars(bar),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }

    const doughData = {
        labels: ['income', 'expense'],
        datasets: [
            {
            label: '# of Votes',
            data: [income, expense],
            backgroundColor: [
                'rgba(6, 155, 113, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(6, 155, 113, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
            },
        ],
    };

    return (
        <div className="home_app">
            <Menu />
            <h1>Overview</h1>
            <div className='my_card_container'>
                <div className='my_card_container1'>
                    <Card
                        text={'dark'}
                        style={{ width: '30rem', height: '20rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>Egg Laying Activity - Yearly Overview</Card.Header>
                        <Card.Body>
                        <Card.Title>{''} </Card.Title>
                            <Bar options={{barOptions}} data={barData} /> 
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '30rem', height: '20rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>Income - Yearly Overview</Card.Header>
                        <Card.Body>
                        <Card.Title>{''} </Card.Title>
                            <Line options={lineOptions} data={lineData}/>
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '18rem', border: '1px solid purple' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header1 fw-bold'>Monthly Cashflow</Card.Header>
                        <Card.Body>
                        <Card.Title> </Card.Title>
                        <Card.Text>
                            <Doughnut data={doughData}></Doughnut>
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
                        <Card.Header className='card_header2 fw-bold'>Weather</Card.Header>
                        <Card.Body>
                        <Card.Title>{''}</Card.Title>
                        <Card.Text>
                            
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card
                        text={'dark'}
                        style={{ width: '28rem', border: '1px solid orange' }}
                        className="mb-2 shadow"
                    >
                        <Card.Header className='card_header2 fw-bold'>News</Card.Header>
                        <Card.Body>
                            <Carousel variant="light">
							{articleIndex.map((x, i) => !article ? <Carousel.Item key={i}>
                                    <h2>Loading...</h2>
                                </Carousel.Item> :
                                <Carousel.Item key={x}>
                                    <a href={`${article[x].url}`}>
                                        <div className='carousel-news' style={{
                                                backgroundImage:`url(${article[x].urlToImage})`,
                                                backgroundSize: "cover"
                                            }}>
                                            <div className='carousel-news-caption'>
                                                <p>{`${article[x].source.name.toUpperCase()} - ${article[x].publishedAt.slice(5,10)}`}</p>
                                                <p><strong>{`${article[x].title.toUpperCase()}`}</strong></p>
                                            </div>
                                        </div>
                                    </a>
                                </Carousel.Item>
							)}
                            </Carousel>
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