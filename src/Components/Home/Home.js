import React, { useEffect, useState } from 'react';
import Menu from '../Menu/Menu';
import './Home.scss';
import { Card, Carousel } from 'react-bootstrap';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import weatherImage from './wBackground.jpg';


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

const doughOptions = {
    title:{
        display:true,
        text:'Cashflow',
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

function Home({ income, expense, bar, user, handleSignOut, line1, line2 }) {   
    const [article, setArticle] = useState();    
    const [articleIndex] = useState(Array.from({length: 5}).map(x => Math.floor(Math.random() * 19)));
    const [weather, setWeather] = useState();
    
    
    useEffect(() => {
        if (user) {
            //fetch weather report
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${user?.state},${user?.country}&units=metric&APPID=f3b00f22e3674c30ec27453c83be2da4`)
            .then(response => response.json())
            .then(data => {
                if (data?.cod === 400) {
                    throw new Error()
                } else {
                    setWeather(data)
                }
            })
            .catch(() => console.log('Problem fetching weather info'))
            //fetch news
            fetch(`https://newsapi.org/v2/everything?q=poultry&from=${(new Date().getFullYear)}-${new Date().getMonth()}-01&sortBy=publishedAt&apiKey=066e3e6cde1c47f3b7ae852685fcd128`)
            .then(response => response.json())
            .then(data => {
                setArticle(data.articles)
            }).catch(() => console.log('server has encountered Problem fetching news'))
        }
    },[user])

    //deduce line(egg sales) chart coordinates
    const getLine1 = (x) => {
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
        })
        return chartData;
    }

     //deduce line(compost sales) chart coordinates
    const getLine2 = (x) => {
        const dLineObj = x.reduce((total, item) => {
            const month = item.date.slice(5,7);
            const month2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ]
            month2.forEach(x => {
                if (!total[x]) total[x] = 0;
            })
            //if (!total[month]) total[month] = 0
            total[month] += item?.profit
                return total
        }, {})
        const sortedKey = Object.keys(dLineObj).sort();
        const chartData = sortedKey.map((x)  => {
        return dLineObj[x]
        })
        return chartData;
    }
    
    const lineData =  {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Egg sales',
                fill: false,
                lineTension: 0.5,
                data: getLine1(line1),
                backgroundColor: [
                    'rgba(255, 50, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 50, 132, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Compost sales',
                fill: false,
                lineTension: 0.5,
                data: getLine2(line2),
                backgroundColor: [
                    'rgb(75, 62, 252, 0.2)'
                ],
                borderColor: [
                    'rgb(75, 62, 252, 1)'
                ],
                borderWidth: 1
                }

        ]
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

    const keyGenerator = () => parseFloat(Number(Math.random() * 3000).toFixed(2));
    
    return (
        <div className="home_app">
            <Menu handleSignOut={handleSignOut} user={user}/>
            <h2>Overview</h2>
            <div className='my_card_container'>
                <Card
                    text={'dark'}
                    className="mb-2"
                >
                    <Card.Header className='card_header fw-bold'>Egg Laying Activity - Yearly Overview</Card.Header>
                    <Card.Body>
                    <Card.Title>{''} </Card.Title>
                        <Bar options={{barOptions}} data={barData} /> 
                    </Card.Body>
                </Card>
                <Card
                    text={'dark'}
                    className="mb-2"
                >
                    <Card.Header className='card_header fw-bold'>Income - Yearly Overview</Card.Header>
                    <Card.Body>
                    <Card.Title>{''} </Card.Title>
                        <Line options={lineOptions} data={lineData}/>
                    </Card.Body>
                </Card>
                <Card
                    text={'dark'}
                    className="mb-2 dough"
                >
                    <Card.Header className='card_header fw-bold'>Monthly Cashflow</Card.Header>
                    <Card.Body>
                    <Card.Title>{''}</Card.Title>
                        <Doughnut option={doughOptions} data={doughData}></Doughnut>
                    </Card.Body>
                </Card>
                <Card
                    text={'dark'}
                    className="mb-2"
                >
                    <Card.Header className='card_header fw-bold'>Weather</Card.Header>
                    <Card.Body>
                        <div className='card-weather' style={{
                                backgroundImage: `url(${weatherImage})`,
                                backgroundSize: "cover"
                            }}>
                                <div className='card-weather_temp'>
                                    <p>{`${!weather?.main ? 0 : weather.main.temp}°C`}</p>
                                    <span>{`${!weather?.main ? 'fetching weather info' : weather.weather[0].description}`}</span>
                                </div>
                                <div className='card-weather_others'>
                                    <span>{`${!weather?.main ? 'xxx' : weather.name},${!weather?.main ? 'xx' : weather.sys.country}`}</span>
                                    <p>{`Pressure: ${!weather?.main ? 0 : weather.main.pressure} hPa`}</p>
                                    <p>{`Humidty: ${!weather?.main ? 0 : weather.main.humidity} %`}</p>
                                    <p>{`Wind Speed: ${!weather?.main ? 0 : weather.wind.speed}m/s`}</p>
                                </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card
                    text={'dark'}
                    className="mb-2"
                >
                    <Card.Header className='card_header fw-bold'>News</Card.Header>
                    <Card.Body>
                        <Carousel variant="light">
                        {articleIndex.map((x, i) => !article ? <Carousel.Item key={i}>
                                <h2>Loading...</h2>
                            </Carousel.Item> :
                            <Carousel.Item key={keyGenerator()}>
                                <a href={`${article[x].url}`} target='_blank' rel='noreferrer'>
                                    <div className='carousel-news' style={{
                                            backgroundImage:`url(${article[x].urlToImage})`,
                                            backgroundSize: "cover"
                                        }}>
                                        <div className='carousel-news-caption'>
                                            <p><strong>{`${article[x].source.name.toUpperCase()}`}</strong> - {`${article[x].publishedAt.slice(5,10)}`}</p>
                                            <p>{`${article[x].title}`}</p>
                                        </div>
                                    </div>
                                </a>
                            </Carousel.Item>
                        )}
                        </Carousel>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Home;