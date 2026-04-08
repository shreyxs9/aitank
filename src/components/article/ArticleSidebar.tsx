import type { Article } from '../../types/content'
import { TagPill } from '../shared/TagPill'

interface ArticleSidebarProps {
  article: Article
}

export function ArticleSidebar({ article }: ArticleSidebarProps) {
  return (
    <aside className="px-4 py-10 sm:px-6 lg:sticky lg:top-24 lg:px-0">
      <div className="space-y-5">
        {article.sidebar.map((card) => (
          <section
            key={card.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/4 p-5"
          >
            <h2 className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/45">
              {card.title}
            </h2>
            <ul className="space-y-3 text-sm leading-6 text-white/68">
              {card.items.map((item) => (
                <li key={item} className="border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <h2 className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/45">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <TagPill key={tag} emphasis={index === 0 ? 'lavender' : 'soft'}>
                {tag}
              </TagPill>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}
