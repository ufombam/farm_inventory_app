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
        <div className='logo'>logo</div>
        <div className='description'>
            <div className='description_item'>
                <div className='description_item_header'></div>
                <div className='description_item_footer'></div>
            </div>
            
        </div>
        <div className='button_container'>
            <button onClick={() => routing('register')}>Register</button>
            <button onClick={() => routing('signin')}>Login</button>
        </div>
    </div>
    );
}

export default Landing;