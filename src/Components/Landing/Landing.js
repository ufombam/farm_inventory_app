import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';
import './Landing.scss';
import analytics from './analytics.png';
import record from './record.png';
import book from './book-keep.png';

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
        <div className='logo'>
            <div>Logo</div>
            <button onClick={() => routing('register')}>Sign Up</button>
        </div>
        <div className='description'>
            <div className='description_item'>
                <div style={{
                    backgroundImage: `url(${analytics})`,
                    backgroundSize: '30%'
                    }} className='description_item_header'></div>
                <div className='description_item_footer'>
                    <p>Detailed chart representation of yearly performance. Includes income, expenditure, egg-laying ...</p>
                </div>
            </div>
            <div className='description_item'>
                <div className='description_item_header' style={{backgroundImage: `url(${record})`}}></div>
                <div className='description_item_footer'>
                    <p>All your records in one place, clear accountability and detailed!</p>
                </div>
            </div>
            <div className='description_item'>
                <div className='description_item_header' style={{backgroundImage: `url(${book})`}}></div>
                <div className='description_item_footer'>
                    <p>Know your financial position at a glance.</p>
                </div>
            </div>
        </div>
        <div className='button_container'>
            <button onClick={() => routing('signin')}><h2>GO TO DASHBOARD</h2></button>
        </div>
        <div className='footer'>Footer</div>
    </div>
    );
}

export default Landing;