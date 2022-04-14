import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

export type ThemeMode = {
  themeMode: {
    theme: Theme
    toggleTheme: () => void
  }
}

export const initThemeMode: ThemeMode = {
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

    // @ts-expect-error
    setTheme(initialTheme)
  }, [])

  return {
    themeMode: {
      theme,
      toggleTheme,
    },
  }
}
