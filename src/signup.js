import React from "react";
import "./signup.css"
import {Button, TextField} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SignUp = () => {


    return (
        <div className="signup-page">
            <div className="box-container">
                <div className="header-container"> <h1 className="h1-header">Signup Page</h1></div>



                <div className="form-container">
                    <div className="person-logo"><AccountCircleIcon fontSize="large" /></div>
                        <TextField className="email-input" type="text" fullWidth variant='standard' label = 'E-mail'  placeholder='Enter Your email' />
                    <div className="Button-container">
                        <button onClick={()=> createAccount()} className="send-otp-button"> signup </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

function createAccount(){
    
}


export default SignUp