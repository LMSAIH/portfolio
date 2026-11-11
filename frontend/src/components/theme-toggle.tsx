import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [isDark, setIsDark] = useState(false)

    // Resolve the effective theme so a "system" default still toggles correctly,
    // and keep it in sync if the OS preference changes while on "system".
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)")
        const resolve = () =>
            theme === "dark" || (theme === "system" && mq.matches)

        setIsDark(resolve())

        if (theme === "system") {
            const handler = () => setIsDark(mq.matches)
            mq.addEventListener("change", handler)
            return () => mq.removeEventListener("change", handler)
        }
    }, [theme])

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
            <Sun className="col-start-1 row-start-1 size-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="col-start-1 row-start-1 size-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </button>
    )
}
