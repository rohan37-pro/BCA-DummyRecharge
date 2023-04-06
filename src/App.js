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
	const [isp, setisp] = useState("Jio")
	const [ispPlans, setispPlans] = useState({"Jio":{1:"", 2:""}})
	const [selectedPlan, setselectedPlan] = useState(0)

    useEffect( ()=> {
		function get_isp_data(){
			const requestOptions = {
				method: 'GET',
				headers: {"Access-Control-Allow-Origin": "true", 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', Accept: 'application/json', 'Content-Type': 'application/json' }
			};
	
			fetch( "/api/get-isp-data/", requestOptions).then((response) => response.json()).then((_data_) => setispPlans(_data_))
		}
		get_isp_data();
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

		<div className='recharge-container'>
			<div className='phone-input'>
				<label className='form-lebel'> Phone Number</label>
				<input onChange={(event)=>setphone(event.target.value)} className='form-input'></input>
      		</div>
			  {/* <img src='/static/images/jio.png' /> */}
			<div className='isp-selection-box-div'>
				<div className='form-lebel'>Select ISP</div>
				<select className='select-isp' onChange={(event)=>setisp(event.target.value)}>
					<option value="Jio">Jio<img src='/static/images/Jio.png' /></option>
					<option value="Airtel">Airtel</option>
					<option value="Vodafone">vodafone</option>
					<option value="BSNL">BSNL</option>
				</select>
				<img className='isp-image' src={`/static/images/${isp}.png`} />
			</div>
			<div className='isp-plans-container'>
				<div className='isp-plans'> <p className='ispplan-column'>Charge</p> <p className='ispplan-column'>Data</p> <p className='ispplan-column'>Validity</p></div>
				{Object.keys(ispPlans[isp]).map((plan)=> (<div className='isp-plans'> <input type="radio" onChange={(event)=> {setselectedPlan(event.target.value)}} value={plan} name='plan'/><p className='ispplan-column'>{ispPlans[isp][plan]["charge"]}</p> <p className='ispplan-column'>{ispPlans[isp][plan]["data"]}</p> <p className='ispplan-column'></p>{ispPlans[isp][plan]["validity"]}</div>))}
			</div>
			<div><button className='pay-button'>Recharge Now</button></div>
			<div className='logout-button-container'><button className='logout-button' onClick={()=> { navigate("/login"); storage.dispatch({type:"setdefault"});}}> Logout </button></div>
		</div>


		 
    </div>
  );
}

export default App;
