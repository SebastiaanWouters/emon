import React from 'react'
import AddAvatar from '../img/addAvatar.png'
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { RegisterButton } from '../components/RegisterButton';
import { Navigate } from "react-router-dom";

export const Register = () => {

  const [pk, setPk] = useState("");
  const [username, setUsername] = useState("");
  const {pubkey} = useContext(userContext);

  const handleRegister = async (e) => {
    e.preventDefault();
  }

  const handlePkChange = (event) => {
    // 👇 Get input value from "event"
    setPk(event.target.value);
  };
  const handleUsernameChange = (event) => {
    // 👇 Get input value from "event"
    setUsername(event.target.value);
  };

  return (
    <div className="formContainer">
        <div className="formWrapper">
        <span className="logo">Chatr</span>
        <span className="title">Register</span>
        <form onSubmit={handleRegister}>
            <input type="text" onChange={handleUsernameChange} placeholder="username"/>
            <input type="text" onChange={handlePkChange} placeholder="public key"/>
            <input style={{display: "none"}} type="file" id="file" />
            <label htmlFor='file'>
                <img src={AddAvatar} alt="" />
                <span>Add Avatar</span>
            </label>
            <RegisterButton pk={pk} name={username}></RegisterButton>
        </form>
        <p>Already have an account? <a className="clickableText">Login</a></p>
        {pubkey === "" && <Navigate to="/home" replace={true} />}
        </div>
    </div>
  )
}
