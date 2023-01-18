import React, { useEffect } from 'react'
import User from '../img/user.png'
import Add from '../img/new.svg'
import { useNostrEvents, useProfile } from 'nostr-react'
import { useContext, useState, useRef } from 'react'
import { chatContext } from '../contexts/useChatContext'
import { userContext } from '../contexts/useUserContext'
import { navigationContext } from '../contexts/useNavigationContext'
import { SearchPreview } from './SearchPreview'
import { fetchMetaData } from '../utils/utils'
import { nip19 } from 'nostr-tools'
import assert from 'assert';

export const Search = () => {

  const { pubkey } = useContext(userContext);
  const { setIsSearching } = useContext(navigationContext);
  const { setCurrentUserPubkey, setCurrentUserName, setCurrentUserPicture } = useContext(chatContext);
  const [ enteredPubkey, setEnteredPubkey ] = useState("");
  const [ pubkeyToSearch, setPubkeyToSearch] = useState("");

  const { data: userData } = useProfile({
    pubkey: pubkeyToSearch
  })

  useEffect(() => {

    async function updateSearchedData() {
      if (enteredPubkey.slice(0,4) === "npub" && enteredPubkey.length === 63) {
        try {
          const { data : pk } = nip19.decode(enteredPubkey);
          setPubkeyToSearch(pk);
        } catch {
        }
        
      } else if (enteredPubkey.length === 64 && enteredPubkey.match(/[0-9A-Fa-f]{6}/g)) {
        setPubkeyToSearch(enteredPubkey);
      } else {
        setPubkeyToSearch("")
      }
    }
    
    updateSearchedData();
    
  }, [enteredPubkey])
  

  const addUser = () => {
    setCurrentUserPubkey(pubkeyToSearch);
    try {
      setCurrentUserPicture(userData.picture ? encodeURI(userData.picture) : `https://api.dicebear.com/5.x/avataaars/png?seed=${userData.pubkey.slice(0,5)}`);
    } catch {
      setCurrentUserPicture(`https://api.dicebear.com/5.x/avataaars/png?seed=${userData.pubkey.slice(0,5)}`);
    }
    
    setCurrentUserName(userData.name ? userData.name : `E${searchedUserData.pubkey}` ),
    setIsSearching(false);
  }

  return (
    <div className="search">
        <div className="searchForm">
            <input type="text" onChange={(e) => {setEnteredPubkey(e.target.value)}} placeholder="enter pubkey" />
        </div>
        {userData && <SearchPreview pk={pubkeyToSearch} pic={userData.picture ? userData.picture : `https://api.dicebear.com/5.x/avataaars/png?seed=${pubkeyToSearch.slice(0,5)}`} name={userData.name ? userData.name : `E${pubkeyToSearch.slice(0,5)}` } onClick={addUser}></SearchPreview>}
    </div>
  )
}
