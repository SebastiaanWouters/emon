import { createContext, useState, useEffect } from 'react';

//create a context, with createContext api
export const navigationContext = createContext(null);

const NavigationProvider = (props) => {
    // this state will be shared with all components 
    const [isSearching, setIsSearching] = useState(false);

    return (
        // this is the provider providing state
        <navigationContext.Provider value={{isSearching, setIsSearching}}>
            {props.children}
        </navigationContext.Provider>
    );
};

export default NavigationProvider;