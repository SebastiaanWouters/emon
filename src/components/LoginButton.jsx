import { dateToUnix } from "nostr-react";
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../contexts/useUserContext';
import { setLocalStorage } from "../utils/utils";
import toast, { Toaster, ToastBar } from 'react-hot-toast';

import Emon from '../img/emon.svg'
import User from '../img/user.png'


export const LoginButton = () => {
    const { setPubkey } = useContext(userContext);
     
    const warn = () => toast(
        (t) => (
        <span>
            <button className="hover:text-purple-900" onClick={() => toast.dismiss(t.id)}>Login failed, future logins might require a page refresh</button>
        </span>
        ),
        {
        icon: null,
        }
    );
    const noExt = () => toast(
            (t) => (
            <span>
                <button className="hover:text-purple-900" onClick={() => toast.dismiss(t.id)}><a href="https://blog.getalby.com/nostr-in-the-alby-extension/" target="_blank">You need a nostr browser extension to login, click here to learn more</a></button>
            </span>
            ),
            {
            duration: 14000,
            icon: null,
            },
        );

    async function login() {
        try {
            if (window.nostr) {
                const pk = await window.nostr.getPublicKey();
                if (pk !== "" && pk) {
                    setLocalStorage("emon-pubkey", pk);
                    setPubkey(pk);
                } else {
                    throw "cancelled"
                }
               
            } else {
                
                throw "extensionError"
            }
            
        } catch(e) {
            if (e === "extensionError") {
                noExt()
            } else {
                warn()
            }
            
        } 
        
    }

    return (
        <><Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'slide-in-top 1s ease' : 'slide-out-top 1s ease',
            }}
          />
        )}
      </Toaster><img className="logo" onClick={() => login()}width={200} src={Emon}></img></>
    )
}