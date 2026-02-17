'use client'

import { useEffect, useState } from 'react'

const THEME_KEY = 'smart-bookmark-theme'

function applyTheme(dark: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY)
    const isDark = saved === 'dark'
    setDarkMode(isDark)
    applyTheme(isDark)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = !darkMode
    setDarkMode(next)
    localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
    applyTheme(next)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        style={{
          width: '60px',
          height: '32px',
          borderRadius: '999px',
          border: '1px solid var(--input-border)',
          background: 'linear-gradient(135deg, #d7deef, #c7d1e8)',
        }}
      />
    )
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      style={{
        width: '60px',
        height: '32px',
        borderRadius: '999px',
        border: '1px solid var(--input-border)',
        background: darkMode
          ? 'linear-gradient(135deg, #4c5876, #353f57)'
          : 'linear-gradient(135deg, #dbe3f3, #c5d0e8)',
        padding: '3px 4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: darkMode ? 'flex-end' : 'flex-start',
        boxShadow: darkMode
          ? '0 2px 8px rgba(44, 56, 84, 0.45)'
          : '0 2px 8px rgba(120, 136, 170, 0.28)',
        transition: 'all 0.2s ease',
      }}
    >
      <span
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: darkMode
            ? 'radial-gradient(circle at 35% 35%, #f3f6ff, #ccd6ea)'
            : 'radial-gradient(circle at 35% 35%, #ffffff, #eceff7)',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.22)',
        }}
      />
    </button>
  )
}
