import React, { useEffect, useState } from "react";
import "./signup.css"
import { TextField} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {storage} from "./store.js"
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [conPassword, setconPassword] = useState('')
    const [errormessage, seterrormessage] = useState(storage.getState().datafromDB)
    storage.subscribe(()=> seterrormessage(storage.getState().datafromDB))
    const [ storedata, setstoredata] = useState(storage.getState())
    storage.subscribe( ()=> setstoredata(storage.getState()))
    const navigate = useNavigate();

    useEffect( ()=> {
        function checkloggedin(){
            if (storedata.userinfo.loggedin === true){
                navigate("/")
            }
        };
        checkloggedin();
    });

    return (
        <div className="signup-page">
            <div className="box-container">
                <div className="header-container"> <h1 className="h1-header">Signup</h1></div>



                <div className="form-container">
                    <div className="person-logo"><AccountCircleIcon fontSize="large" /></div>
                        <TextField onChange={ (event)=> setemail(event.target.value) } className="email-input" type="text" fullWidth variant='standard' label = 'E-mail'  placeholder='Enter Your email' />
                        <TextField  onChange={ (event)=> setpassword(event.target.value) } className="email-input" type="password" fullWidth variant='standard' label = 'Password'  placeholder='Enter password' />
                        <TextField onChange={ (event)=> setconPassword(event.target.value) } className="email-input" type="password" fullWidth variant='standard' label = 'Confirm Password'  placeholder='Enter password' />

                        <div className="error-massage-container">
                        { [1].map( ()=> errormessage["account-create"]===false ? ( <p className='signup-Error-message'>{errormessage["reason"]}</p> ) : (<></>)) }
                        </div>


                    <div className="Button-container">
                        <button onClick={()=> createAccount(email, password, conPassword)} className="send-otp-button"> signup </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

function createAccount(email, password, conPassword){
    let email_validation = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    if ( email_validation === false ){
        let errorMessage6 = {"account-create":false, "reason": "Invalid email ID !!!"}
        storage.dispatch({type:"settextfromDB", payload : errorMessage6 })
        return false
    }
    if (password===""){
        let errorMessage3 = {"account-create":false, "reason": "Password must not be empty !!!"}
        storage.dispatch({type:"settextfromDB", payload : errorMessage3 })
        console.log(storage.getState())
        return false
    }
    if (conPassword===""){
        let errorMessage5 = {"account-create":false, "reason": "Confirm password field empty !!!"}
        storage.dispatch({type:"settextfromDB", payload : errorMessage5 })
        return false
    }
    if (conPassword!== password){
        let errorMessage1 = {"account-create":false, "reason": "confirm password not matched !!!"}
        storage.dispatch({type:"settextfromDB", payload : errorMessage1 })
        return false
    }
    
    
 
    const data = `/api/create-account/`
    const requestOptions = {
        method: 'POST',
        headers: {"Access-Control-Allow-Origin": "true", 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({  "email": email, "password": password })
    };

    let dataFromDb
    fetch(data, requestOptions).then((response) => response.json()).then((_data_) => processData(_data_))
    // console.log("data from db ", dataFromDb)
    return true;
}

function processData(data){
    console.log("data in processData --> ", data)
    if (data["account-create"] === false){
        let errorMessage2 = data
        storage.dispatch({type:"settextfromDB", payload : errorMessage2 })
        return false
    }
    if (data["account-create"] === true){
        let email = data["email"]
        storage.dispatch({type:"settextfromDB", payload : data })
        storage.dispatch({type:"setemail", payload : email })
        return true
    }
}



export default SignUp