import type { ComponentType } from "react"
import Focus from "@/pages/writing/focus"

export type Article = {
    slug: string
    title: string
    /** ISO date (YYYY-MM-DD). Used for sorting and formatted for display. */
    date: string
    /** Optional thumbnail; falls back to a neutral placeholder when omitted. */
    image?: string
    /** Optional dedicated page; falls back to a generic article page when omitted. */
    Component?: ComponentType
}

// Single source of truth: the Writing list on the home page and the
// /writing/:slug routes are both derived from this array.
export const articles: Article[] = [
    {
        slug: "focus",
        title: "Focus",
        date: "2026-10-17",
        Component: Focus,
    }
]

/** Articles newest-first. */
export const articlesByDate = [...articles].sort((a, b) =>
    b.date.localeCompare(a.date)
)

export const getArticle = (slug?: string) =>
    articles.find((a) => a.slug === slug)

/** Format an ISO date as e.g. "October 12, 2026" without timezone drift. */
export const formatDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number)
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
