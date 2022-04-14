import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | string // FIXME: string 타입은 localStorage 때문에 어쩔수 없이 선언.

export type ThemeMode = {
  themeMode: {
    theme: Theme
    toggleTheme: () => void
  }
}

export const initThemeMode = {
  themeMode: {
    theme: 'light',
    toggleTheme: () => {},
  },
}

export const themeMode = (): ThemeMode => {
  const [theme, setTheme] = useState<Theme>('light')

  const setThemeMode = (mode: Theme) => {
    localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = () => {
    theme === 'light' ? setThemeMode('dark') : setThemeMode('light')
  }

  useEffect(() => {
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'

    const localTheme = localStorage.getItem('theme')
    const initialTheme = localTheme || prefersColorScheme
    setTheme(initialTheme)
  }, [])

  return {
    themeMode: {
      theme,
      toggleTheme,
    },
  }
}
