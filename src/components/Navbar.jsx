import React, { useEffect } from 'react'
import User from '../img/user.png'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../contexts/useUserContext';
import { useContext } from 'react';
import { useProfile } from 'nostr-react';

export const Navbar = () => {

  const {pubkey, picture, username} = useContext(userContext);

  return (
    <div className='navbar'>
    <span className="logo">emon</span>
    <div className="user">
        <img src={picture} alt="" />
        <span className='hidden lg:flex'>{username}</span>
    </div>
    
    </div>
  )
}
