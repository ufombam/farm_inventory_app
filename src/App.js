import Home from './Components/Home/Home.js';
import Menu from './Components/Menu/Menu.js';
import Record from './Components/Record/Record.js';
import Finance from './Components/Finance/Finance.js';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
    const [sales, setSales] = useState([]);
    const [compost, setCompost] = useState(0);
    const [feed, setFeed] = useState(0);
    const [msc, setMsc] = useState(0);
    const [egg, setEgg] = useState([]);

    const salesSum = sales.big + sales.small;
    let income = salesSum + compost;
    let expense = feed + msc;

    //=========================Income=============================================
    useEffect(() => {
        //fetch bar chart coordinates
        fetch('http://localhost:5000/record/egg')
        .then(response => response.json())
        .then(data => {
            setEgg(data)
        })
        //Fetch sales sum
        fetch('http://localhost:5000/finance/sales')
        .then(data => data.json())
        .then(sale => setSales({
            big: Number(sale[0].big),
            small: Number(sale[0].small)
        }))
        .catch(() => console.log('unable to complete request'))
        //Fetch Compost sum
        fetch('http://localhost:5000/finance/compost')
        .then(data => data.json())
        .then(comp => setCompost(Number(comp[0].sum)))
        .catch(() => console.log('unable to complete request'))
    },[])
    //====================Expense====================================================
    useEffect(() => {
        //fetch feed
        fetch('http://localhost:5000/finance/feed')
        .then(data => data.json())
        .then(myFeed => setFeed((Number(myFeed[0].sum))))
        .catch(() => console.log('unable to complete request'))
        //Fetch Compost
        fetch('http://localhost:5000/finance/msc')
        .then(data => data.json())
        .then(misc => setMsc(Number(misc[0].sum)))
        .catch(() => console.log('unable to complete request'))
    },[])
    return (
        <BrowserRouter>
            <Routes>
                <Route key={22} path="/" element={<Home income={income} expense={expense} bar={egg}/>} />
                <Route key={11} path="/menu" element={<Menu />} />
                <Route key={33} path="/record" element={<Record eggData={egg} compostData={compost} mscData={msc}/>} />
                <Route key={44} path="/finance" element={<Finance feed={feed} msc={msc} compost={compost} salesSum={salesSum} expense={expense} income={income}/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
