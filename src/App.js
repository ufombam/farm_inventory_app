import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import Record from './Components/Record/Record';
import Finance from './Components/Finance/Finance';
import './App.scss';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
    const [sales, setSales] = useState([]);
    const [compost, setCompost] = useState(0);
    const [feed, setFeed] = useState(0);
    const [msc, setMsc] = useState(0);
    const [egg, setEgg] = useState([]);
    const [user, setUser] = useState(null);

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

    const handleSignIn = (e) => {
        e.preventDefault();
        const { email, pwd } = e.target.elements;
        const login = {
            email: email.value,
            pwd: pwd.value
        }
        setTimeout(() => setUser(login), 10000)
        
        //console.log(login)
        // fetch('http://localhost:5000/signin', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(login)
        // })
        // .then(res => res.json())
        // .then(data => console.log(data))
        // .catch(() => console.log('unable to authenticate user'))
        // e.target.reset();
    }

    const handleSignOut = () => setUser(null);

    const ProtectedRoute = ({ user, children, redirectPath = '/'}) => {
        if (!user) {
            return <Navigate to={redirectPath} replace />
        }
        return children ? children : <Outlet />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route key={11} index element={<SignIn user={user} handleSignIn={handleSignIn}/>} />
                <Route element={<ProtectedRoute user={user} />}>
                    <Route key={22} path="home" element={<Home handleSignOut={handleSignOut} user={user} income={income} expense={expense} bar={egg}/>} />
                    <Route key={33} path="record" element={<Record user={user} eggData={egg} compostData={compost}/>} />
                    <Route key={44} path="finance" element={<Finance user={user} feed={feed} msc={msc} compost={compost} salesSum={salesSum} expense={expense} income={income}/>} />
                </Route>
                <Route key={55} path="*" element={<h1>Wetin carry me come here??</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
