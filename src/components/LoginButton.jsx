import { dateToUnix } from "nostr-react";
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../contexts/useUserContext';
import User from '../img/user.png'

import {
  getEventHash,
  signEvent,
  validateEvent,
  relayInit
} from "nostr-tools";
import { useNostrEvents } from "../utils/core";


export const LoginButton = () => {
    const { setPubkey } = useContext(userContext);
    
    async function fetchPubkey() {
        const pk = await window.nostr.getPublicKey();
        setPubkey(pk);
    }

    return (
        <button className="loginButton" onClick={() => {fetchPubkey()}}>Login</button>
    )
}