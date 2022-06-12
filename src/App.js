import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import Record from './Components/Record/Record';
import Finance from './Components/Finance/Finance';
import Register from './Components/Register/Register';
import Settings from './Components/Settings/Settings';
import Help from './Components/Help/Help';
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
    const [loginErr, setLoginErr] = useState('');
    const [updating, setUpdating] = useState(false);
    const [line1, setLine1] = useState([]); 
    const [line2, setLine2] = useState([]); 

    const salesSum = sales.big + sales.small;
    let income = salesSum + compost;
    let expense = feed + msc;

    //=========================Income=============================================

    useEffect(() => {
        if (user) {
            //fetch line2 chart coordinates
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/compost/${user.id}`)
            .then(response => response.json())
            .then(res => {
                setLine2(res)
            })
            //fetch line1 chart coordinates
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/sales/${user.id}`)
            .then(response => response.json())
            .then(data => {
                setLine1(data)
            }).catch(() => console.log('Unable to complete request'))
            //fetch bar chart coordinates
            fetch(`https://fast-scrubland-53064.herokuapp.com/record/egg/${user.id}`)
            .then(response => response.json())
            .then(data => {
                setEgg(data)
            }).catch(() => console.log('unable to complete request'))
            //Fetch sales sum
            fetch(`https://fast-scrubland-53064.herokuapp.com/finance/sales/${user.id}`)
            .then(data => data.json())
            .then(sale => setSales({
                big: Number(sale[0].big),
                small: Number(sale[0].small)
            }))
            .catch(() => console.log('unable to complete request'))
            //Fetch Compost sum
            fetch(`https://fast-scrubland-53064.herokuapp.com/finance/compost/${user.id}`)
            .then(data => data.json())
            .then(comp => setCompost(Number(comp[0].sum)))
            .catch(() => console.log('unable to complete request'))
        }
    },[user])
    //====================Expense====================================================
    useEffect(() => {
        //fetch feed
        if (user) {
        fetch(`https://fast-scrubland-53064.herokuapp.com/finance/feed/${user.id}`)
        .then(data => data.json())
        .then(myFeed => setFeed((Number(myFeed[0].sum))))
        .catch(() => console.log('unable to complete request'))
        //Fetch Compost
        fetch(`https://fast-scrubland-53064.herokuapp.com/finance/msc/${user.id}`)
        .then(data => data.json())
        .then(misc => setMsc(Number(misc[0].sum)))
        .catch(() => console.log('unable to complete request'))
        }
    },[user])

    useEffect(() => {
        const userLoggedIn = sessionStorage.getItem('token');
        if (userLoggedIn) {
            const foundUser = JSON.parse(userLoggedIn);
            setUser(foundUser)
        }
    },[])

    //=====================sign in user================
    const handleSignIn = (e) => {
        e.preventDefault();
        const { email, pwd } = e.target.elements;
        const login = {
            email: email.value,
            pwd: pwd.value
        }
        setUpdating(true);
        fetch('https://fast-scrubland-53064.herokuapp.com/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.id) {
                throw new Error()
            } else {
                setUser(data)
                sessionStorage.setItem('token', JSON.stringify(data))
            }
        })
        .catch(() => {
            setLoginErr('Unable to authenticate user');
            setTimeout(() => {
                setLoginErr('')
            },5000)
            setUpdating(false)
        })
        e.target.reset();
    }
    //=====================Register user================

    const handleRegister = (e) => {
        e.preventDefault();
        const { f_name, l_name, email, pwd } = e.target.elements;
        const user = {
            name: f_name.value +' '+ l_name.value,
            email: email.value,
            pwd: pwd.value
        }
        setUpdating(true);
        fetch('https://fast-scrubland-53064.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.id) {
                throw new Error()
            } else {
                setUser(data)
                sessionStorage.setItem('token', JSON.stringify(data))
            }
        })
        .catch(() => {
            setLoginErr('Unable to register user');
            setTimeout(() => {
                setLoginErr('')
            },5000)
            setUpdating(false)
        })
        e.target.reset();
    }

    const handleSignOut = () => {
        setUser(null)
        sessionStorage.clear();
        window.location.reload();
    };

    const ProtectedRoute = ({ user, children, redirectPath = '/'}) => {
        if(!user) {
            return <Navigate to={redirectPath} replace />
        }
        return  children ? children : <Outlet />
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route key={11} index element={<Landing handleSingOut={handleSignOut} user={user}/>} />
                <Route key={22} path="signin" element={<SignIn user={user} updating={updating} loginErr={loginErr} handleSignIn={handleSignIn}/>} />
                <Route key={33} path="register" element={<Register user={user} updating={updating} regErr={loginErr} handleRegister={handleRegister}/>} />
                <Route element={<ProtectedRoute user={user} />}>
                    <Route key={44} path="dashboard" element={<Home line2={line2} line1={line1} handleSignOut={handleSignOut} user={user} income={income} expense={expense} bar={egg}/>} />
                    <Route key={55} path="record" element={<Record handleSignOut={handleSignOut} user={user} eggData={egg} compostData={compost}/>} />
                    <Route key={66} path="finance" element={<Finance handleSignOut={handleSignOut} user={user} feed={feed} msc={msc} compost={compost} salesSum={salesSum} expense={expense} income={income}/>} />
                    <Route key={77} path="settings" element={<Settings handleSignOut={handleSignOut} user={user}/>} />
                    <Route key={88} path="help" element={<Help handleSignOut={handleSignOut} />} />
                </Route>
                <Route key={99} path="*" element={<h1>Wetin carry me come here??</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
