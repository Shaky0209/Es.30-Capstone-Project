import React, { createContext, useState } from 'react';

export const TokenContext = createContext(null);

export default function TokenContextProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const value = {token, setToken};

  return (
    <TokenContext.Provider value={value} >
        {children}
    </TokenContext.Provider>
  )
}