"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Activate ${isDark ? "light" : "dark"} mode`}
      className="theme-toggle-btn group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-900 transition-colors focus-ring dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
