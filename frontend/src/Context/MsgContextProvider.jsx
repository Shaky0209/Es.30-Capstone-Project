import React, { createContext, useState } from 'react';

export const MsgContext = createContext(null);

export default function MsgContextProvider({children}) {

    const [whatMsg, setWhatMsg] = useState(localStorage.getItem("getMsg"));
    const value = {whatMsg, setWhatMsg};

  return (
    <MsgContext.Provider value={value} >
        {children}
    </MsgContext.Provider>
  )
}