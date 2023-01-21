import React from 'react'

import Bubble from '../img/speech-bubble.gif'
import { LoginButton } from '../components/LoginButton';
import { Navigate } from "react-router-dom";
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { useWindowDimensions } from '../utils/utils';


export const Login = () => {

  const [pk, setPk] = useState("");
  const {pubkey} = useContext(userContext);
  const { height, width } = useWindowDimensions();

  const handleLogin = async (e) => {
    e.preventDefault();
  }

  const handlePkChange = (event) => {
    // 👇 Get input value from "event"
    setPk(event.target.value);
  };

  return (
    <div className="loginContainer">
        <div className='column'>
        <img src={Bubble} width={512} className="speech-bubble"></img>
        
        {<LoginButton ></LoginButton>}
        {pubkey !== "" && <Navigate to="/" replace={true} />}
        {width < 959 && <Navigate to="/mobile" replace={true} />}
        </div>
    </div>
  )
}
