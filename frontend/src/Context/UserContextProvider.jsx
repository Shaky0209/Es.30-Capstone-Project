import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export default function UserContextProvider({children}) {

  const [user, setUser] = useState(localStorage.getItem("user"));
  const value = {user, setUser};
  
  return (
    <UserContext.Provider value={value} >
        {children}
    </UserContext.Provider>
  )
}