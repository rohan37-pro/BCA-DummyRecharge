import React, { useEffect, useState } from "react";
import {storage} from './store'
import "./payment.css"
import Popup from "./successful.js"

const Payment = () =>{
    const [storageData, setstorageData] = useState(storage.getState())
    storage.subscribe(()=> setstorageData(storage.getState()))
    const [errormessage, seterrormessage] = useState("")
    const [name, setname] = useState("")
    const [cardNumber, setcardNumber] = useState("")
    const [expiryDate, setexpiryDate] = useState("")
    const [cvv, setcvv] = useState("")


    useEffect( () => {
        function checkcardNumber(){
            if (cardNumber.length ===4 || cardNumber.length === 9 || cardNumber.length === 14){
                document.getElementById("card-number").value = cardNumber + "-"
            }
        }
        checkcardNumber()
        })

    return (
        <>
            {[1].map(()=>  (errormessage==="successful") ? (<Popup/>) : (<></>))}
            <h1>Payment Page</h1>
        <div className="paymentPage">
            <div className="container1  payment-form">
                <lebel className="payment-lebel">phone Number : {storageData.recharge.phone}</lebel>
                <lebel className="payment-lebel">ISP : {storageData.recharge.isp}</lebel>
                <lebel className="payment-lebel">plan : ₹{storageData.recharge.plan}</lebel>
            </div>

            <div class="payment-container">
                <h1>Payment Details</h1>
                <div className="payment-form">
                    <label className="payment-lebel" for="name">Name on Card:</label>
                    <input onChange={(event)=>{setname(event.target.value); seterrormessage("")}} className="payment-inputbox" type="text" id="name" name="name" required />

                    <label className="payment-lebel" for="card-number">Card Number:</label>
                    <input onChange={(event)=>{setcardNumber(event.target.value); seterrormessage("")}} className="payment-inputbox" type="text" id="card-number" name="card-number" required />

                    <label className="payment-lebel" for="expiry-date">Expiry Date:</label>
                    <input onChange={(event)=>{setexpiryDate(event.target.value); seterrormessage("")}} className="payment-inputbox" type="text" id="expiry-date" name="expiry-date" required />

                    <label className="payment-lebel"  for="cvv">CVV:</label>
                    <input onChange={(event)=>{setcvv(event.target.value); seterrormessage("")}} className="payment-inputbox" type="text" id="cvv" name="cvv" required />
                    <div >
                        {[1].map(()=> (errormessage!=="" || errormessage!=="sucessfull") ? (<p className="payment-error">{errormessage}</p>) : (<></>) )}
                    </div>
                    <button onClick={()=> seterrormessage(paymentvalidation(name, cardNumber, expiryDate, cvv))} className= "payment-button">Submit Payment</button>
                </div>
            </div>
        </div>
    </>
    )
}

function paymentvalidation(name, cardNumber, expiryDate, cvv) {
    const currdate = new Date()
    const curyear = currdate.getFullYear()
    const curmonth = currdate.getMonth()
    const arr  = expiryDate.split("/")
    const month = Number(arr[0])
    const year = Number(arr[1])

    if (name === ""){
        return "Please enter your name"
    }
    else if (cardNumber === "" || cardNumber.length !== 19){
        return "Invalid card number"
    }
    else if (expiryDate === "" || year < curyear || month < curmonth || isNaN(month) || isNaN(year) ){
        return "card expired or wrong format (eg. 01/2025) "
    }
    else if (cvv === "" || cvv.length !== 3 || isNaN(Number(cvv))){
        return "Invalid cvv"
    }
    else{
        let api = "/api/rechargedetails/"
        let storedata = storage.getState()
        let email = storedata.userinfo.email
        let recharge = storedata.recharge
        const requestOptions = {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({  "email": email, "recharge": recharge })
        };
        fetch(api, requestOptions).then((response)=>response.json()).then((data)=>console.log(data))
        return "successful"
    }
}



export default Payment