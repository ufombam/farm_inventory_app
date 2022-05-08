import React, { useState } from 'react';
import './SignIn.scss';
import { Navigate } from 'react-router-dom';


function SignIn({ handleSignIn, user}) {
    const [updating, setUpdating] = useState(false);

    const checkUpdate = (e) => {
        e.preventDefault()
        return setUpdating(true);
    }

    if (user) {
        return <Navigate to={"/home"} replace/>
    }


    return (
        <>
            <div className='signin_app'>
                <div className='signin_app_border shadow'>
                    <h1>Sign in</h1>
                    <p>with your email and password</p>
                    <form action='#' onSubmit={handleSignIn} onSubmitCapture={checkUpdate}>
                        <input id='email' type={'email'} required={true} placeholder={'Email'}></input><br />
                        <input id='pwd' type={'password'} minLength={6} required={true} placeholder={'Password'}></input><br />
                        <button type={'submit'}>{updating ? 'Wait...' : 'Submit'}</button>
                    </form >
                </div>
            </div>
        </>
    );
}

export default SignIn;
