import React, { createContext, useState } from 'react'

type DarkMode = {
  isDarkMode: boolean
  setIsDarkMode: () => void
}
type InitialState = {
  darkMode: DarkMode
}

const initialState: InitialState = {
  darkMode: {
    isDarkMode: false,
    setIsDarkMode: () => {},
  },
}

export const StoreContext = createContext<InitialState>(initialState)

const StoreProvider: React.FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSetIsDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <StoreContext.Provider
      value={{
        darkMode: {
          isDarkMode,
          setIsDarkMode: handleSetIsDarkMode,
        },
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
