import React, { createContext, useState } from 'react';

export const StorageContext = createContext(null);

export default function StorageContextProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const value = {token, setToken};

  return (
    <StorageContext.Provider value={value} >
        {children}
    </StorageContext.Provider>
  )
}