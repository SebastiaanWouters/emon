import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Chat } from '../components/Chat'
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';
import { useContext, useState, useEffect } from 'react';
import { useNostrEvents } from "nostr-react";
import { Navigate } from 'react-router-dom';
import { useWindowDimensions } from '../utils/utils';

export const Home = () => {
  const { pubkey } = useContext(userContext);
  const {width, height} = useWindowDimensions();

  return (
    <div className="home">
        <div className="container">
            <Sidebar></Sidebar>
            <Chat></Chat>
            {pubkey === "" && <Navigate to="/login" replace={true} />}
            {width < 959 && <Navigate to="/small" replace={true} />}
        </div>
    </div>
    

  )
}
