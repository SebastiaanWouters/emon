import React from 'react'
import AddAvatar from '../img/addAvatar.png'
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
        <LoginButton ></LoginButton>
        {pubkey !== "" && <Navigate to="/home" replace={true} />}
        {width < 959 && <Navigate to="/small" replace={true} />}
    </div>
  )
}
