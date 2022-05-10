import React from 'react';
import './SignIn.scss';
import { Navigate, Link } from 'react-router-dom';


function SignIn({ handleSignIn, user, loginErr, updating}) {

    if (user) {
        return <Navigate to={"/dashboard"} replace/>
    }


    return (
        <>
            <div className='signin_app'>
                <div className='signin_app_border shadow'>
                    <h1>Sign in</h1>
                    <p>with your email and password</p>
                    <form action='#' onSubmit={handleSignIn}>
                        <input id='email' type={'email'} required={true} placeholder={'Email'}></input><br />
                        <input id='pwd' type={'password'} minLength={6} required={true} placeholder={'Password'}></input><br />
                        <p style={{color: 'red'}}>{loginErr ? loginErr : null}</p>
                        <button type={'submit'}>{!loginErr && updating ? 'Wait...' : 'Submit'}</button>
                    </form >
                    <p>New here? <Link style={{textDecoration: "none"}} to={"/register"}>Register</Link></p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
