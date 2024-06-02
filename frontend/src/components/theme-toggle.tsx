"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { useMount } from "@/hooks/use-mount"

export function ThemeToggle() {
    const { theme,resolvedTheme, setTheme } = useTheme()
    const mounted = useMount()

    return (
        <Button
            size="icon"
            variant="outline"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            disabled={!mounted}
        >
            {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </Button>
    )
}
