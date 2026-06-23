"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  disableSystem?: boolean
}

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyClass(theme: Theme, storageKey: string) {
  const root = window.document.documentElement
  const system = getSystemPreference()
  const resolved = theme === "system" ? system : theme
  root.classList.remove("light", "dark")
  root.classList.add(resolved)
  root.setAttribute("data-theme", resolved)
  try { localStorage.setItem(storageKey, theme) } catch {}
  return resolved
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "zi-designs-theme",
  disableSystem = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const mounted = useRef(false)

  // Mount: read preference early
  useEffect(() => {
    mounted.current = true
    let initial: Theme = defaultTheme
    try {
      const fromStorage = localStorage.getItem(storageKey) as Theme | null
      if (fromStorage) initial = fromStorage
    } catch {}
    if (disableSystem && initial === "system") {
      initial = getSystemPreference()
    }
    setTheme(initial)
    setResolvedTheme(applyClass(initial, storageKey))

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = () => {
      if (theme === "system") {
        setResolvedTheme(applyClass("system", storageKey))
      }
    }
    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // When theme changes manually
  useEffect(() => {
    if (!mounted.current) return
    setResolvedTheme(applyClass(theme, storageKey))
  }, [theme, storageKey])

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme: (t) => setTheme(t),
    toggleTheme: () => {
      setTheme(prev => (prev === "dark" ? "light" : "dark"))
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
