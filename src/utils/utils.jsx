import { useNostr, dateToUnix } from "nostr-react";
import { useState, useEffect } from 'react';
import {
  getEventHash,
  relayInit,
  getPublicKey,
  signEvent,
  validateEvent,
  verifySignature,
} from "nostr-tools";




export function setLocalStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // catch possible errors:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }
export function getLocalStorage(key, initialValue) {
    try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : initialValue;
    } 
    catch (e) {
        // if error, return initial value
        return initialValue;
    }
}   



export const searchEvent = async (id, setEvent) => {
      const relay = relayInit('wss://nostr-pub.wellorder.net')
      await relay.connect()

      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`)
      })
      relay.on('error', () => {
        console.log(`failed to connect to ${relay.url}`)
      })

      // let's query for an event that exists
      let sub = relay.sub([
        {
          ids: [id]
        }
      ])
      sub.on('event', event => {
      })
      sub.on('eose', () => {
        sub.unsub()
      })
};



export const fetchMetaData = async (pubkey, setMetaData) => {

    const relay = relayInit('wss://nostr-pub.wellorder.net')
    await relay.connect()
    setMetaData(null)
    
    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`)
    })
    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`)
    })
    
    let sub = relay.sub([
      {
        kinds: [0],
        authors: [pubkey]
      }
    ])
    
    sub.on('event', event => {
      setMetaData(event);
    })
    sub.on('eose', () => {
      sub.unsub()
    })

};

export const fetchUserName = async (pubkey, setUserName) => {

  const relay = relayInit('wss://nostr-pub.wellorder.net')
  await relay.connect()
  
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
  })
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })
  
  let sub = relay.sub([
    {
      kinds: [0],
      authors: [pubkey]
    }
  ])
  
  sub.on('event', event => {
    setUserName(JSON.parse(event.content).name ? JSON.parse(event.content).name : "")
  })
  sub.on('eose', () => {
    sub.unsub()
  })

};

export const fetchPicture = async (pubkey, setPicture) => {

  const relay = relayInit('wss://nostr-pub.wellorder.net')
  await relay.connect()
  
  relay.on('connect', () => {
    console.log(`connected to ${relay.url}`)
  })
  relay.on('error', () => {
    console.log(`failed to connect to ${relay.url}`)
  })
  
  let sub = relay.sub([
    {
      kinds: [0],
      authors: [pubkey]
    }
  ])
  
  sub.on('event', event => {
    setPicture(JSON.parse(event.content).picture ? JSON.parse(event.content).picture : "")
  })
  sub.on('eose', () => {
    sub.unsub()
  })

};



export const decryptMessage = async (message, pubkey) => {
  const decr = await window.nostr.nip04.decrypt(pubkey, message);
  return decr;
}


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

