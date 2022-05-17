import React from 'react';
import logo from './logo.png';
import dLogo from './logo_dark.png';
import {Link} from 'react-router-dom';


const Logo = ({height, variant}) => {

    return (
    <div>
        <Link to='/'><img alt='logo' src={variant === 'dark' ? dLogo : logo} height={height}/></Link>
    </div>
    )
}

export default Logo