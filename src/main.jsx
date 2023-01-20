import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { useContext } from 'react';
import UserContext from "./contexts/useUserContext";
import { NostrProvider } from "nostr-react";
import { HashRouter as Router } from "react-router-dom";

const relayUrls = [
  "wss://nostr-pub.wellorder.net", "wss://relay.damus.io", "wss://relay.nostr.info", "wss://relay.snort.social"
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NostrProvider relayUrls={relayUrls} debug={false}>
     <UserContext>
        <Router>
        <App />
        </Router>
     </UserContext>
    </NostrProvider>
    
  </React.StrictMode>
);
