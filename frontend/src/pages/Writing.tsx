import { useParams } from "react-router-dom"
import { getArticle, formatDate } from "@/writing/articles"
import { ArticleLayout } from "@/components/article-layout"

const Writing: React.FC = () => {
    const { slug } = useParams()
    const article = getArticle(slug)

    if (!article) {
        return (
            <ArticleLayout title="Not found" date="">
                <p>That article doesn’t exist.</p>
            </ArticleLayout>
        )
    }

    // Entries with a dedicated page render it; the rest get a generic shell.
    if (article.Component) {
        const { Component } = article
        return <Component />
    }

    return (
        <ArticleLayout title={article.title} date={formatDate(article.date)}>
            <p>This article doesn’t have content yet.</p>
        </ArticleLayout>
    )
}

export default Writing
