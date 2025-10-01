"use client" // Required for Next.js 13+ if using app router

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    // Prevent hydration mismatch (because theme is undefined at first)
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <div className="w-full">
            <Button className="w-full flex justify-start hover:cursor-pointer shadow-none border-none hover:bg-transparent" variant="outline" onClick={toggleTheme}>
                {
                    theme === "light" ?
                        <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 " />
                        :
                        <Moon className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-100" />
                }

                <span className="sr-only">Toggle theme</span>
                <div className="md:hidden">
                    {(theme ?? "light").charAt(0).toUpperCase() + (theme ?? "light").slice(1).toLowerCase()}
                </div>
            </Button>
        </div>
    )
}
