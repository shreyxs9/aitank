import { Link, Navigate, useParams } from 'react-router-dom'
import { ArticleBody } from '../components/article/ArticleBody'
import { ArticleHeader } from '../components/article/ArticleHeader'
import { ArticleSidebar } from '../components/article/ArticleSidebar'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { getArticleBySlug } from '../data/content'

export function ArticlePage() {
  const { slug } = useParams()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="border-b border-white/10 bg-white/4">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 text-sm text-white/58 sm:px-6 lg:px-8">
            <Link to="/" className="transition hover:text-white">
              Back to issue
            </Link>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <p>
              {article.breadcrumb.join(' / ')} <span className="text-coral">/ {article.title}</span>
            </p>
          </div>
        </section>

        <ArticleHeader article={article} />

        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[minmax(0,1fr),20rem] lg:px-8">
          <ArticleBody article={article} />
          <ArticleSidebar article={article} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
