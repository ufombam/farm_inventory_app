import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './Register.scss';
import Logo from '../Logo/Logo';

const Register = ({ handleRegister, user, regErr, updating }) => {
    
    const checkPwd = () => {
        const password = document.getElementById('pwd'), 
        repeat_pwd = document.getElementById('repeat_password');
        if (password.value === repeat_pwd.value) {
            repeat_pwd.setCustomValidity('')
        } else {
            repeat_pwd.setCustomValidity('Passwords do not match')
        }
    }

    if (user) {
        return <Navigate to={"/dashboard"} replace/>
    }

    return (
        <div className='register'>
            <div className='register_body'>
                <Logo height={90} variant='dark'/>
                <h2>Register</h2>
                <p>to start managing your farm inventory</p><br />
                <form action='#' onSubmit={handleRegister}>
                    <input type={'text'} placeholder='First Name' id='f_name' required={true}></input><input type={'text'} placeholder='Last Name' id='l_name' required={true}></input><br />
                    <input type={'email'} placeholder='Email' id='email' required={true}></input><br />
                    <input type={'password'} placeholder='Password' id='pwd' minLength={6} onChange={checkPwd} required={true}></input><br />
                    <input type={'password'} placeholder='Confirm Password' id='repeat_password' minLength={6} onChange={checkPwd} required={true}></input><br />
                    <p style={{color: 'red'}}>{regErr ? regErr : null}</p>
                    <button type={'submit'} >{!regErr && updating ? <Spinner animation='border' variant='light' /> : 'Register'}</button>
                </form><br />
                <h4>Already have an account? <Link style={{textDecoration: "none"}} to={'/signin'}>Sign in</Link></h4>
            </div>
        </div>
    )
}

export default Register;