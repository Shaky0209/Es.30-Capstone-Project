import React, { createContext, useState } from 'react';

export const StatusContext = createContext(null);

export default function StatusContextProvider({children}) {

  const [status, setStatus] = useState(false);
  const value = {status, setStatus};
  
  return (
    <StatusContext.Provider value={value} >
        {children}
    </StatusContext.Provider>
  )
}