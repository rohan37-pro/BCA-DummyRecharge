import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { storage } from './store';

function App() {
  	const [ storedata, setstoredata] = useState(storage.getState())
    storage.subscribe( ()=> setstoredata(storage.getState()))
    const navigate = useNavigate();

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
      
    </div>
  );
}

export default App;
