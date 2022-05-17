import React from 'react';
import { Link} from 'react-router-dom';
import './Landing.scss';
import analytics from './analytics.png';
import record from './record.png';
import book from './book-keep.png';
import Logo from '../Logo/Logo';

const Landing = () => {

    return( 
    <div className='landing_container'>
        <div className='logo'>
            <div>
                <Logo height={65}/>
            </div>
            <Link to={'/register'}><button>Sign Up</button></Link>
        </div>
        <div className='description'>
            <div className='description_item shadow'>
                <div style={{
                    backgroundImage: `url(${analytics})`,
                    backgroundSize: '30%'
                    }} className='description_item_header'></div>
                <div className='description_item_footer'>
                    <p>Detailed chart representation of yearly performance. Includes income, expenditure, egg-laying ...</p>
                </div>
            </div>
            <div className='description_item shadow'>
                <div className='description_item_header' style={{backgroundImage: `url(${record})`}}></div>
                <div className='description_item_footer'>
                    <p>All your records in one place, clear accountability and detailed!</p>
                </div>
            </div>
            <div className='description_item shadow'>
                <div className='description_item_header' style={{backgroundImage: `url(${book})`}}></div>
                <div className='description_item_footer'>
                    <p>Know your financial position at a glance.</p>
                </div>
            </div>
        </div>
        <div className='button_container'>
            <Link className='landing_link' to={'/signin'}><button><h2>GO TO DASHBOARD</h2></button></Link>
        </div>
        <div className='landing_footer'>
            <p>uBird 2021 - {new Date().getFullYear()} &copy;</p>
        </div>
    </div>
    );
}


//href="https://github.com/ufombam"
//href="https://twitter.com/HamforrdUfombam"
//href="https://www.linkedin.com/in/ufombam/"
export default Landing;