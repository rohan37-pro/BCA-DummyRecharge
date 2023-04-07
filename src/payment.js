import React, { useState } from "react";
import {storage} from './store'
import "./payment.css"

const Payment = () =>{
    const [storageData, setstorageData] = useState(storage.getState())
    storage.subscribe(()=> setstorageData(storage.getState()))
    console.log(storageData)
    return (
        <>
            <h1>Payment Page</h1>
        <div className="paymentPage">
            <div className="container1  payment-form">
                <lebel className="payment-lebel">phone Number : {storageData.recharge.phone}</lebel>
                <lebel className="payment-lebel">ISP : {storageData.recharge.isp}</lebel>
                <lebel className="payment-lebel">plan : ₹{storageData.recharge.plan}</lebel>
            </div>

            <div class="container">
                <h1>Payment Details</h1>
                <form className="payment-form">
                    <label className="payment-lebel" for="name">Name on Card:</label>
                    <input className="payment-inputbox" type="text" id="name" name="name" required />

                    <label className="payment-lebel" for="card-number">Card Number:</label>
                    <input className="payment-inputbox" type="text" id="card-number" name="card-number" required />

                    <label className="payment-lebel" for="expiry-date">Expiry Date:</label>
                    <input className="payment-inputbox" type="text" id="expiry-date" name="expiry-date" required />

                    <label className="payment-lebel"  for="cvv">CVV:</label>
                    <input className="payment-inputbox" type="text" id="cvv" name="cvv" required />

                    <button  type="submit">Submit Payment</button>
                </form>
            </div>
        </div>
    </>
    )
}



export default Payment