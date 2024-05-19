import React, { createContext, useState } from 'react';

export const MenuContext = createContext(null);

export default function MenuContextProvider({children}) {

    const [menu, setMenu] = useState(false);
    const value = {menu, setMenu};

  return (
    <MenuContext.Provider value={value} >
        {children}
    </MenuContext.Provider>
  )
}