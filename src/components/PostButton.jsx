import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../contexts/useUserContext";
import { chatContext } from "../contexts/useChatContext";

import Send from "../img/sendbutton.svg"

export const PostButton = ({sendMessage}) => {
    

    return (
        <button className="sendButton" onClick={() => {sendMessage()}}><img src={Send}></img></button>
    )
}