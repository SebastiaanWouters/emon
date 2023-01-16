import React, { useEffect } from 'react'
import User from '../img/user.png'
import Add from '../img/new.svg'
import { chatContext } from '../contexts/useChatContext';
import { userContext } from '../contexts/useUserContext';
import { useContext, useState } from 'react';
import { useNostrEvents, useProfile } from "nostr-react";

export const SearchPreview = ({pk, name, pic, onClick}) => {

    return (
        <div onClick={onClick} className="searchUserChat">
            <img src={pic} alt="" />
            <div className="SearchUserChatInfo">
            <span>{name}</span>
            </div>
            <button className="addButton"><img src={Add} alt="" /></button>
            
        </div>
    )
}
