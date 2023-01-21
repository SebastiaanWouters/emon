import { dateToUnix } from "nostr-react";
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../contexts/useUserContext';
import { setLocalStorage } from "../utils/utils";
import cogoToast from '@hasanm95/cogo-toast';

import Emon from '../img/emon.svg'
import User from '../img/user.png'


export const LoginButton = () => {
    const { setPubkey } = useContext(userContext);
    

  const warningToast = <a href="https://nostr.how" target="_blank"><div class=" 
  hover:bg-slate-900 shadow-lg p-4 bg-black  items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
  <span class="flex rounded-full bg-yellow-500 uppercase px-2 py-1 text-xs font-bold mr-3">INFO</span>
  <span class="font-semibold leading-6 mr-2 text-left flex-auto">No nostr extension found, click here to discover how to connect with nostr trough your browser</span>
  <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
</div></a>

const loginToast = <div class=" 
  hover:bg-slate-900 shadow-lg p-3 bg-black items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
  <span class="flex rounded-full bg-green-500 uppercase px-2 p-2 text-xs font-bold mr-0">Logging in</span>
  <span class="font-semibold mr-0 text-left flex-auto"></span>
  <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
</div>

const failToast = <div class=" 
  hover:bg-slate-900 shadow-lg p-3 bg-black items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
  <span class="flex rounded-full bg-orange-500 uppercase px-2 py-1 text-xs font-bold mr-3">WARNING</span>
  <span class="font-semibold mr-2 text-left flex-auto">Something went wrong, refreshing the page might help</span>
  <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
</div>


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
                cogoToast.warn(warningToast, { hideAfter: 12, bar: { size: '0px', style: 'solid', color: 'transparent' }});
            } else {
                cogoToast.warn(failToast, { hideAfter: 6, bar: { size: '0px', style: 'solid', color: 'transparent' }});
            }
            
        } 
        
       
    }

    return (
        <><img className="logo" onClick={() => login()}width={200} src={Emon}></img></>
    )
}