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
    storage.subscribe( ()=> setemail(storage.getState().userinfo.email))
	const [phone, setphone] = useState('')
	const [isp, setisp] = useState("Jio")
	const [ispPlans, setispPlans] = useState({"Jio":{1:"", 2:""}})
	const [selectedPlan, setselectedPlan] = useState(0)
	const [ispfetched, setispfetched] = useState(0)
	const [radiochecked, setradiochecked] = useState(0)
	const [errormessage, seterrormessage] = useState("")

    useEffect( ()=> {
		function get_isp_data(){
			const requestOptions = {
				method: 'GET',
				headers: {"Access-Control-Allow-Origin": "true", 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', Accept: 'application/json', 'Content-Type': 'application/json' }
			};
	
			fetch( "/api/get-isp-data/", requestOptions).then((response) => response.json()).then((_data_) => setispPlans(_data_))
		}
		if (ispfetched===0){
			get_isp_data();
			setispfetched(1);
		}
        function checkloggedin(){
            if (storedata.userinfo.loggedin === false){
                navigate("/login")
            }
        };
        checkloggedin();
		function checkinputbox(){
			if (radiochecked === 0){
				let inputbox = document.querySelectorAll("[id^='radioinput']")
				inputbox.forEach((element)=> element.checked=false)
			}
			if (radiochecked===1){
				document.getElementById("recharge").value = "";
			}
		}
		checkinputbox();
		if (errormessage === "proceed"){
			navigate("/payment")
		}
                
    });
  return (
    <div className="App">
      	<div className='h1-container'>
			<h1>welcome {email}</h1>
    	</div>

		<div className='recharge-container'>
			<div className='phone-input'>
				<label className='form-lebel'> Phone Number</label>
				<input onChange={(event)=>{setphone(event.target.value); seterrormessage("")}} className='form-input'></input>
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

			<div>
				<label  className='form-lebel'> Top Up  </label>₹
				<input type="number" id='recharge' onChange={(event)=>{setselectedPlan(event.target.value); setradiochecked(0); seterrormessage("")}} className='form-input'></input>
			</div>
			<p style={{marginTop:"5px", marginBottom:"0px"}}>or</p>
			<p style={{marginTop:"5px", marginBottom:"2px"}}>Select Plan</p>
			<div className='isp-plans-container'>
				<div className='isp-plans'> <p className='ispplan-column'>Charge</p> <p className='ispplan-column'>Data</p> <p className='ispplan-column'>Validity</p></div>
				{Object.keys(ispPlans[isp]).map((plan)=> (<div className='isp-plans'> <input type="radio" id='radioinput'  onChange={(event)=> {setselectedPlan(event.target.value); setradiochecked(1); seterrormessage("")}} value={ispPlans[isp][plan]["charge"]} name='plan'/><p className='ispplan-column'>₹{ispPlans[isp][plan]["charge"]}</p> <p className='ispplan-column'>{ispPlans[isp][plan]["data"]}</p> <p className='ispplan-column'></p>{ispPlans[isp][plan]["validity"]}</div>))}
			</div>

			<div>{[1].map(()=> errormessage!=="" ? (<p className='errormessagehome'>{errormessage}</p>):(<></>))}</div>

			<div><button onClick={()=>seterrormessage(proceedtopay(phone, isp, selectedPlan))} className='pay-button'>Proceed to Pay</button></div>

			<div className='logout-button-container'><button className='logout-button' onClick={()=> { navigate("/login"); storage.dispatch({type:"setdefault"});}}> Logout </button></div>
		</div>


		 
    </div>
  );
}

function proceedtopay(phone, isp, plan){
	if (phone === ""  || phone.length !== 10 ){
		return "Invalid Phone Number"
	}
	if (isp===""){
		return "Select ISP"
	}
	if (plan===0){
		return "Select Recharge Plan"
	}
	storage.dispatch({type:"addrecharge", payload: {phone, isp, plan}});
	return "proceed"
}

export default App;
