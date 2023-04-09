import React, { useEffect, useState } from "react";
import {storage} from './store'
import "./admin.css"


const Admin = () =>{
    // const [storageData, setstorageData] = useState(storage.getState())
    // storage.subscribe(()=> setstorageData(storage.getState()))
    const [rec, setrec] = useState({1:1})
    const [fetched, setfetched] = useState(0)
    // storage.subscribe(()=> setrec(storage.getState()))
    // setrec(storageData.rechargeDetails)
    // const [email, setemail] = storageData.rechargeDetails.email
    // const [isp, setisp] = storageData.rechargeDetails.isp
    // const [phone, setphone] = storageData.rechargeDetails.phone
    // const [plan, setplan] = storageData.rechargeDetails.plan
    // const [datetime, setdatetime] = storageData.rechargeDetails.datetime


    useEffect( () => {
            function getrechargeDetails(){
                const reqestOptions = {
                    method : 'GET',
                    header : { accept : 'application/json', "content-type" : "application/json"}
                }
                fetch("/api/get-recharge-details/", reqestOptions).then((response) => response.json()).then((data) => {storage.dispatch({"type": "addRechargeDetails", payload: data}); setrec(data)  })
            }
            if (fetched < 5 ){
                getrechargeDetails();
                setfetched(fetched + 1)
            }
        })

    return (
    <>  
        <h1>ADMINISTRATOR</h1>
        <div className="admin-page">
            <div className="recharge-details-container">
                <div className="rechargecard">
                    <span style={{fontWeight:"bolder", fontSize:"large"}}>Email</span>
                    <span style={{fontWeight:"bolder", fontSize:"large"}}>Phone Number</span>
                    <span style={{fontWeight:"bolder", fontSize:"large"}}> ISP </span>
                    <span style={{fontWeight:"bolder", fontSize:"large"}}>Plan</span>
                </div>
                {Object.keys(rec).map((index) =>  (<RechargeCard email={rec[index].email} phone={rec[index].phone} plan={rec[index].plan} datetime={rec[index].datetime} isp={rec[index].isp} />)  )}
            </div>
        </div>
    </>
    )
}

const RechargeCard = (props) => {
    return (
        <div className="rechargecard">
            <span>{props.email}</span>
            <span>{props.phone}</span>
            <img className="rec-image" src={`/static/images/${props.isp}.png`} />
            <div className="recharge-wapper">
                <span style={{fontWeight:"bolder"}}>₹{props.plan}</span>
                <span>{props.datetime}</span>
            </div>
        </div>

    )
}



export default Admin