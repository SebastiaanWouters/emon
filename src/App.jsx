import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useContext } from 'react';
import { userContext } from './contexts/useUserContext';
import ChatContext from "./contexts/useChatContext";
import NavigationContext from "./contexts/useNavigationContext";
import { Route, Routes } from "react-router-dom";
import "./styles/style.scss"
import { MobileScreen } from "./pages/MobileScreen";


function App() {

  const {pubkey, setPubkey} = useContext(userContext);
  
  return (
    <>
      <Routes>
        {<Route path="/" element={<Login />} />}
        {<Route path="/home" element={<ChatContext><NavigationContext><Home /></NavigationContext></ChatContext>} />}
        {<Route path="/small" element={<MobileScreen></MobileScreen>}/>}
      </Routes>
    </>   
  );
}

export default App;
