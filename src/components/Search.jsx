import React, { useEffect } from 'react'
import User from '../img/user.png'
import Add from '../img/new.svg'
import { useNostrEvents, useProfile } from 'nostr-react'
import { useContext, useState } from 'react'
import { chatContext } from '../contexts/useChatContext'
import { userContext } from '../contexts/useUserContext'
import { navigationContext } from '../contexts/useNavigationContext'
import { SearchPreview } from './SearchPreview'
import { fetchMetaData } from '../utils/utils'

export const Search = () => {

  const { pubkey } = useContext(userContext);
  const { setIsSearching } = useContext(navigationContext);
  const { setCurrentUserPubkey, setCurrentUserName, setCurrentUserPicture } = useContext(chatContext);
  const [ searchedPubkey, setSearchedPubkey ] = useState("");
  const [ searchedUserData, setSearchedUserData ] = useState(null);


  useEffect(() => {

    async function updateSearchedData() {
      fetchMetaData(searchedPubkey, setSearchedUserData);
    }
    
    updateSearchedData();
    
  }, [searchedPubkey])
  

  const addUser = () => {
    setCurrentUserPubkey(searchedUserData.pubkey);
    try {
      setCurrentUserPicture(JSON.parse(searchedUserData.content).picture ? encodeURI(JSON.parse(searchedUserData.content).picture) : `https://api.dicebear.com/5.x/avataaars/png?seed=${searchedUserData.pubkey.slice(0,5)}`);
    } catch {
      setCurrentUserPicture(`https://api.dicebear.com/5.x/avataaars/png?seed=${searchedUserData.pubkey.slice(0,5)}`);
    }
    
    setCurrentUserName(JSON.parse(searchedUserData.content).name ? JSON.parse(searchedUserData.content).name : `E${searchedUserData.pubkey}` ),
    setIsSearching(false);
  }

  return (
    <div className="search">
        <div className="searchForm">
            <input type="text" onChange={(e) => {setSearchedPubkey(e.target.value)}} placeholder="enter pubkey" />
        </div>
        {searchedUserData && <SearchPreview pk={searchedPubkey} pic={JSON.parse(searchedUserData.content).picture ? JSON.parse(searchedUserData.content).picture : `https://api.dicebear.com/5.x/avataaars/png?seed=${searchedPubkey.slice(0,5)}`} name={JSON.parse(searchedUserData.content).name ? JSON.parse(searchedUserData.content).name : `E${searchedPubkey.slice(0,5)}` } onClick={addUser}></SearchPreview>}
    </div>
  )
}
