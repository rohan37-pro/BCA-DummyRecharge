import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './login'
import SignUp from './signup'
import Payment from "./payment"
import Admin from './admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
            <Routes>
                <Route exact path={"/"} element={<App/>} ></Route>
                <Route exact path={"/login"} element={<Login />} ></Route>
                <Route exact path={"/signup"} element={<SignUp />} ></Route>
                <Route exact path={"/payment"} element={<Payment />} ></Route>
                <Route exact path={"/admin"} element={<Admin />} ></Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
