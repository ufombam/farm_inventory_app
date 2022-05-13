import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';
import './Landing.scss';

const Landing = () => {
    const [route, setRoute] = useState('');

    const routing = (route) => {
        setRoute(route)
    }

    if (route === 'register') {
        return <Navigate to={'/register'} replace />
    } else if (route === 'signin') {
        return <Navigate to={'/signin'} replace />
    }

    return( 
    <div className='landing_container'>
        <h2>All your needs in one place</h2>
        <button onClick={() => routing('register')}>Register</button>
        <button onClick={() => routing('signin')}>Login</button>
    </div>
    );
}

export default Landing;