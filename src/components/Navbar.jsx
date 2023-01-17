import React, { useEffect } from 'react'
import Emon from '../img/emon.svg'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../contexts/useUserContext';
import { useContext } from 'react';
import { useProfile } from 'nostr-react';

export const Navbar = () => {

  const {pubkey, picture, username} = useContext(userContext);

  return (
    <div className='navbar'>
    <img className="logo" src={Emon} alt="" />
    <div className="user">
        <img src={picture} alt="" />
        <span className='hidden lg:flex'>{username}</span>
    </div>
    
    </div>
  )
}
