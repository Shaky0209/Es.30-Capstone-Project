import React, { createContext, useState } from 'react';

export const ImgContext = createContext(null);

export default function ImgContextProvider({children}) {

    const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
    const value = {avatar, setAvatar};

  return (
    <ImgContext.Provider value={value} >
        {children}
    </ImgContext.Provider>
  )
}