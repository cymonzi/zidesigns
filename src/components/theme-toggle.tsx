"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-lg",
        "border border-gray-200 bg-white text-gray-900",
        "transition-colors hover:bg-gray-100",
        "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 transition-all dark:scale-0 dark:rotate-90" />
      <Moon className="absolute h-5 w-5 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </button>
  )
}
