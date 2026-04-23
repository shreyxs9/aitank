import type { Article } from '../types/content'
import type { CommunityArticle } from '../types/communityArticles'

export function communityArticleToEditorialArticle(article: CommunityArticle): Article {
  const paragraphs = article.body
    .split(/\n\s*\n/g)
    .map((entry) => entry.trim())
    .filter(Boolean)

  return {
    id: article.id,
    slug: article.slug,
    section: article.section,
    sectionIndex: 'C1',
    sectionTone: 'lavender',
    title: article.title,
    deck: article.deck,
    author: article.authorName,
    role: article.status === 'published' ? 'Community contributor' : 'Draft author',
    readTime: `${Math.max(3, Math.ceil(article.body.split(/\s+/).filter(Boolean).length / 180))} min read`,
    publishedAt: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Draft',
    imageLabel: article.coverImageUrl ? 'Contributor article cover image' : 'Contributor article',
    imageSrc: article.coverImageUrl ?? undefined,
    imageAlt: article.coverImageUrl ? article.title : undefined,
    tags: article.tags,
    highlight: article.deck,
    breadcrumb: ['Community', article.section],
    intro: paragraphs[0] || article.deck,
    heroCaption:
      article.coverImageUrl
        ? 'Contributor-provided cover image.'
        : 'This article is displayed using the contributor publishing layout.',
    pullQuote: {
      quote: article.deck,
      attribution: article.authorName,
    },
    body: paragraphs.length
      ? paragraphs.map((paragraph, index) => ({
          heading: index === 0 ? 'Article' : undefined,
          paragraphs: [paragraph],
        }))
      : [{ paragraphs: [article.deck] }],
    sidebar: [
      {
        title: 'About the author',
        items: [article.authorName, article.status === 'published' ? 'Published contributor' : 'Draft contributor'],
      },
      {
        title: 'Article details',
        items: [
          article.section,
          article.status === 'published' ? 'Visible to readers' : 'Visible to the author through direct link',
        ],
      },
      {
        title: 'Tags',
        items: article.tags.length ? article.tags : ['Community'],
      },
    ],
  }
}
