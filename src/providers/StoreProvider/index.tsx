import React, { createContext } from 'react'

import { ThemeMode, initThemeMode, themeMode } from 'providers/StoreProvider/themeMode'

type InitialState = ThemeMode

const initialState: InitialState = { ...initThemeMode }

export const StoreContext = createContext<InitialState>(initialState)

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{
        ...themeMode(),
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
