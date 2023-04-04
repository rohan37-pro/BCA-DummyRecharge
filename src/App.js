import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { storage } from './store';

function App() {
  	const [ storedata, setstoredata] = useState(storage.getState())
    storage.subscribe( ()=> setstoredata(storage.getState()))
    const navigate = useNavigate();
	const [email, setemail] = useState(storage.getState().userinfo.email)
    storage.subscribe( ()=> setstoredata(storage.getState().userinfo.email))
	const [phone, setphone] = useState('')

    useEffect( ()=> {
        function checkloggedin(){
            if (storedata.userinfo.loggedin === false){
                navigate("/login")
            }
        };
        checkloggedin();
    });
  return (
    <div className="App">
      	<div className='h1-container'>
			<h1>welcome {email}</h1>
    	</div>

		


		<div className='logout-button-container'><button className='logout-button' onClick={()=> { navigate("/login"); storage.dispatch({type:"setdefault"});}}> Logout </button></div> 
    </div>
  );
}

export default App;
