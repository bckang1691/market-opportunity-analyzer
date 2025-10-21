'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference on mount
    const isDarkMode =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/80"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative h-6 w-6">
        <Sun
          className={`absolute inset-0 h-6 w-6 rotate-0 scale-100 text-yellow-500 transition-all duration-300 ${
            isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-6 w-6 rotate-90 scale-0 text-blue-500 transition-all duration-300 ${
            isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
          }`}
        />
      </div>

      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
        {isDark ? '라이트 모드' : '다크 모드'}
      </span>
    </button>
  )
}
