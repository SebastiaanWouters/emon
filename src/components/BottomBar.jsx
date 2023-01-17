import React, { useContext } from 'react'
import Plus from '../img/plus.svg'
import More from '../img/more.png'
import Stop from '../img/stop.svg'
import { Popover, Transition } from '@headlessui/react'
import { navigationContext } from '../contexts/useNavigationContext'
import { userContext } from '../contexts/useUserContext'
import { Navigate } from 'react-router-dom'
import { setLocalStorage } from '../utils/utils'

export const BottomBar = () => {


  const { isSearching, setIsSearching } = useContext(navigationContext);
  const {pubkey, setPubkey} = useContext(userContext);

  const toggleSearching = () => {
    setIsSearching(prev => !prev);
  }

  const logout = () => {
    setPubkey(""); setLocalStorage("emon-pubkey", "");
  } 

  return (
    <div className="bottomBar">
              
        <Popover className="relative">
          <Popover.Button>
            <img src={More} alt="" />
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
          <Popover.Panel className="panel">
          <div className="panel-grid">
            <a onClick={logout}>Logout</a>
          </div>
          </Popover.Panel>
          </Transition>
        </Popover>
        
        
        {!isSearching ? <button onClick={toggleSearching} className="newChat">
            <img src={Plus} alt="" />
        </button> : <button onClick={toggleSearching} className="newChat">
            <img src={Stop} alt="" />
        </button>}

      {pubkey === "" && <Navigate to="/" replace={true} />}
    </div>
  )
}
