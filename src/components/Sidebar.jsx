import React, { useContext, useState } from 'react'
import { Navbar } from './Navbar'
import { Search } from './Search'
import { Chats } from './Chats'
import { BottomBar } from './BottomBar'
import { navigationContext } from '../contexts/useNavigationContext'

export const Sidebar = () => {

  const { isSearching } = useContext(navigationContext);

  return (
    <div className='sidebar'>
        <Navbar></Navbar>
        {isSearching && <Search></Search>}
        {!isSearching && <Chats></Chats>}
        <BottomBar></BottomBar>
    </div>
  )
}
