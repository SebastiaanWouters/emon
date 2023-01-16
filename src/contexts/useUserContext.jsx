import { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/utils'
import { useNostrEvents, useProfile } from 'nostr-react';
import User from '../img/user.png'

//create a context, with createContext api
export const userContext = createContext(null);

const UserProvider = (props) => {
    // this state will be shared with all components 
    const [pubkey, setPubkey] = useState(getLocalStorage("chatr-pubkey", ""));
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState(User)

    const { onEvent: onNewUser } = useNostrEvents({
    filter: {
        kinds: [0],
        authors: [pubkey],
    },
    })

    onNewUser((metaData) => {
        const user = JSON.parse(metaData.content);
        setUsername(user.name ? user.name : `user${pubkey.slice(0,5)}`);
        setPicture(user.picture ? user.picture : User);
    })

    return (
        // this is the provider providing state
        <userContext.Provider value={{pubkey, setPubkey, username, picture}}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserProvider;