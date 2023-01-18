import { dateToUnix } from "nostr-react";
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../contexts/useUserContext';
import { setLocalStorage } from "../utils/utils";
import User from '../img/user.png'


export const LoginButton = () => {
    const { setPubkey } = useContext(userContext);
    
    async function fetchPubkey() {
        const pk = await window.nostr.getPublicKey();
        setLocalStorage("emon-pubkey", pk);
        setPubkey(pk);
    }

    return (
        <button className="loginButton" onClick={() => {fetchPubkey()}}>Start Chatting...</button>
    )
}