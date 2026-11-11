import { useState } from "react"
import { Link } from "react-router-dom"
import { articlesByDate, formatDate } from "@/writing/articles"

const PAGE_SIZE = 5

export function WritingSection() {
    const [page, setPage] = useState(0)
    const pageCount = Math.ceil(articlesByDate.length / PAGE_SIZE)
    const paginated = articlesByDate.length > PAGE_SIZE
    const start = page * PAGE_SIZE
    const visible = articlesByDate.slice(start, start + PAGE_SIZE)

    // When paginating, pad the last page with invisible filler rows so the
    // list keeps a constant height and the controls never shift position.
    const fillerCount = paginated ? PAGE_SIZE - visible.length : 0

    return (
        <section>
            <h2 className="font-['Newsreader',Georgia,serif] text-2xl font-normal tracking-[-0.01em] mb-4">
                Writing
            </h2>

            <ul>
                {visible.map((a, i) => (
                    <li key={a.slug} className={`border-b ${i === 0 ? "border-t" : ""}`}>
                        <Link
                            to={`/writing/${a.slug}`}
                            className="group flex items-stretch justify-between gap-3 px-3 py-2 transition-colors duration-300 ease-out hover:bg-muted hover:duration-75"
                        >
                            <div className="flex flex-col justify-center">
                                <span className="font-medium text-muted-foreground transition-colors duration-300 ease-out group-hover:text-foreground group-hover:duration-75">
                                    {a.title}
                                </span>
                                <span className="text-xs text-muted-foreground transition-colors duration-300 ease-out group-hover:text-foreground group-hover:duration-75">
                                    {formatDate(a.date)}
                                </span>
                            </div>

                            {a.image ? (
                                <img
                                    src={a.image}
                                    alt=""
                                    className="aspect-square h-auto w-auto shrink-0 self-stretch rounded-md object-cover"
                                />
                            ) : (
                                <div className="aspect-square shrink-0 self-stretch rounded-md bg-muted" />
                            )}
                        </Link>
                    </li>
                ))}

                {Array.from({ length: fillerCount }).map((_, i) => (
                    <li key={`filler-${i}`} aria-hidden className="invisible">
                        <div className="flex items-stretch justify-between gap-3 py-2">
                            <div className="flex flex-col justify-center">
                                <span className="font-bold">&nbsp;</span>
                                <span className="text-sm">&nbsp;</span>
                            </div>
                            <div className="aspect-square shrink-0 self-stretch rounded-md" />
                        </div>
                    </li>
                ))}
            </ul>

            {paginated && (
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="underline enabled:hover:text-foreground disabled:opacity-40"
                    >
                        Newer
                    </button>

                    <span>
                        {page + 1} / {pageCount}
                    </span>

                    <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                        disabled={page === pageCount - 1}
                        className="underline enabled:hover:text-foreground disabled:opacity-40"
                    >
                        Older
                    </button>
                </div>
            )}
        </section>
    )
}
