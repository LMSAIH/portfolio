import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

type ArticleLayoutProps = {
    title: string
    date: string
    children: React.ReactNode
}

export function ArticleLayout({ title, date, children }: ArticleLayoutProps) {
    return (
        <div className="relative isolate">
            {/* Same sky the homepage ends on, without the horizon, stretched over the whole article */}
            <div aria-hidden="true" className="horizon-sky pointer-events-none absolute inset-0 -z-10" />
            <main className="min-h-screen flex max-w-xl mx-auto px-6 pt-4 pb-40 sm:pt-8">
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="text-sm text-muted-foreground underline hover:text-foreground"
                        >
                            Back
                        </Link>
                        <ThemeToggle />
                    </div>

                    <h1 className="text-2xl font-semibold mt-6 mb-1">{title}</h1>
                    <p className="text-sm text-muted-foreground mb-6">{date}</p>

                    <div className="text-muted-foreground leading-relaxed space-y-4">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
