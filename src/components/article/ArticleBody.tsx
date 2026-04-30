import type { Article, ArticleBodySection, ArticleFigure } from '../../types/content'
import { ImagePlaceholder } from '../shared/ImagePlaceholder'
import { PullQuote } from './PullQuote'
import { Link } from 'react-router-dom'

interface ArticleBodyProps {
  article: Article
  previewOnly?: boolean
}

function FigureCard({ figure, compact = false }: { figure: ArticleFigure; compact?: boolean }) {
  return (
    <figure className={`space-y-3 ${compact ? 'mx-auto w-full max-w-[17rem] sm:max-w-[19rem] lg:mx-0' : ''}`}>
      <a href={figure.src} target="_blank" rel="noreferrer" className="block">
        <div
          className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/96 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-3 ${
            compact ? 'mx-auto' : ''
          }`}
        >
          <img src={figure.src} alt={figure.alt} className="w-full rounded-[1rem]" loading="lazy" />
        </div>
      </a>
      {figure.caption ? <figcaption className="text-sm leading-6 text-white/48">{figure.caption}</figcaption> : null}
    </figure>
  )
}

function DocumentPageCard({
  figure,
  priority = false,
}: {
  figure: ArticleFigure
  priority?: boolean
}) {
  return (
    <figure>
      <a
        href={figure.src}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
      >
        <img
          src={figure.src}
          alt={figure.alt}
          className="w-full"
          loading={priority ? 'eager' : 'lazy'}
        />
      </a>
    </figure>
  )
}

function AuthorAboutCard({ article }: { article: Article }) {
  const designation = article.authorDesignation ?? article.role

  if (!article.authorAvatarUrl && !designation) {
    return null
  }

  return (
    <section className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/4 p-5 sm:flex-row sm:items-center sm:p-6">
      <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-black/25 text-lg font-semibold text-white/55">
        {article.authorAvatarUrl ? (
          <img
            src={article.authorAvatarUrl}
            alt={`${article.author} profile picture`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          article.author.slice(0, 1).toUpperCase()
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-coral">
          About the author
        </p>
        <h2 className="mt-2 break-words font-display text-2xl font-extrabold tracking-[-0.03em] text-white">
          {article.author}
        </h2>
        {designation ? (
          <p className="mt-1 break-words text-sm leading-6 text-white/62">
            {designation}
          </p>
        ) : null}
      </div>
    </section>
  )
}

function AiOpsSkillsetLayout({ article }: { article: Article }) {
  return (
    <article className="min-w-0 border-b border-white/10 px-4 py-8 sm:px-6 sm:py-10 lg:px-0 lg:pr-10">
      <div className="space-y-10">
        <section className="space-y-8 rounded-[1.75rem] border border-white/10 bg-white/4 p-5 sm:p-6 lg:p-8">
          <header className="space-y-5">
            <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              Building AI Is Easy. Making It Work Is Hard.
            </h2>
            <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
              Have you ever wondered...
            </p>
          </header>

          <ul className="space-y-3 pl-5 text-lg leading-8 text-white/78 marker:text-coral sm:text-xl">
            <li>If AI is so powerful, why are so many companies still struggling to get real business results?</li>
            <li>Why do AI pilots look impressive in demos but fail in real-world deployment?</li>
            <li>Why does accuracy drop once AI systems face messy, real-world data?</li>
            <li>Why are costs of AI projects increasing instead of reducing over time?</li>
            <li>What is the industry not telling you about how AI actually works?</li>
          </ul>

          <div className="space-y-5 text-base leading-8 text-white/72 sm:text-lg">
            <p>
              Today, we are surrounded by breakthroughs in Artificial Intelligence. From chatbots to
              self-driving systems, AI appears more capable than ever before.
            </p>
            <p>But here is a reality that is often overlooked.</p>
            <p>
              Even the most powerful algorithms are only as good as the data they learn from.
            </p>
            <p>Think about it this way.</p>
            <p>
              Humans have one of the most advanced algorithms, the human brain. Yet, if we are
              given incomplete or incorrect information, we make poor decisions. Not because we lack
              intelligence, but because we lack the right data and context.
            </p>
            <p>AI works in exactly the same way.</p>
            <p>
              No matter how sophisticated the model is, if it is trained on poor-quality data,
              unclear signals, or inconsistent inputs, the outcomes will fail. This is why many
              organizations struggle not because their models are weak, but because their data
              foundation is not strong enough.
            </p>
            <p>So what are companies doing about this?</p>
            <p>
              The industry is rapidly shifting toward a layer called AI Ops.
            </p>
          </div>
        </section>

        <PullQuote pullQuote={article.pullQuote} />

        <section className="space-y-8 rounded-[1.75rem] border border-white/10 bg-white/4 p-5 sm:p-6 lg:p-8">
          <header className="space-y-4">
            <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              The Industry Shift
              <br />
              AI Ops
            </h2>
            <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
              AI Ops is not about building models. It is about making AI work in the real world
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-10">
            <div className="space-y-5">
              <FigureCard
                figure={{
                  src: '/articles/ai-ops-skillset/industry-shift-graphic.png',
                  alt: 'AI model lifecycle graphic used in the AI Ops layout.',
                }}
                compact
              />
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                It focuses on what happens after a model is created:
              </h3>
              <ul className="space-y-3 pl-5 text-lg leading-8 text-white/78 marker:text-coral sm:text-xl">
                <li>Preparing and refining data</li>
                <li>Ensuring accuracy and consistency</li>
                <li>Monitoring performance over time</li>
                <li>Controlling cost and efficiency</li>
                <li>Continuously improving outcomes</li>
              </ul>
              <div className="space-y-5 text-base leading-8 text-white/72 sm:text-lg">
                <p>
                  In real enterprise environments, a large portion of effort often estimated around
                  70-80% lies in this operational layer rather than in pure model development.
                </p>
                <p>
                  This is where most AI projects either succeed or fail. And at the very core of AI
                  Ops lies one of the most critical capabilities:
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-[1.75rem] border border-white/10 bg-white/4 p-5 sm:p-6 lg:p-8">
          <header className="space-y-4">
            <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              The Core of AI Ops
              <br />
              Data Annotation
            </h2>
          </header>

          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-10">
            <FigureCard
              figure={{
                src: '/articles/ai-ops-skillset/annotation-core-graphic.png',
                alt: 'Data annotation explainer graphic used in the AI Ops article layout.',
              }}
              compact
            />

            <div className="space-y-5 text-base leading-8 text-white/72 sm:text-lg">
              <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                Data annotation is not just about labelling. It is about teaching AI how to
                interpret the world correctly.
              </p>
              <p>
                It adds meaning, context, and judgment to raw data enabling AI systems to move
                beyond patterns and make reliable decisions.
              </p>
              <p>
                Every improvement in an AI system better accuracy, fewer errors, stronger
                decision-making comes from refining data and reducing ambiguity.
              </p>
              <p>
                This is not a mechanical task.
                <br />
                This is applied intelligence.
                <br />
                And this is where a new kind of capability is emerging.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
              The ability to:
            </p>
            <ul className="space-y-3 pl-5 text-lg leading-8 text-white/78 marker:text-coral sm:text-xl">
              <li>Make decisions where there is no clear "right answer"</li>
              <li>Understand context beyond what is visible</li>
              <li>Identify patterns, anomalies, and edge cases</li>
              <li>Apply domain knowledge to interpret data correctly</li>
              <li>Continuously refine how AI systems behave</li>
            </ul>
            <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
              In essence, it is about training intelligence not just building it.
            </p>
          </div>
        </section>

        <section className="space-y-8 rounded-[1.75rem] border border-white/10 bg-white/4 p-5 sm:p-6 lg:p-8">
          <header className="space-y-4">
            <h2 className="editorial-heading font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
              A New Kind of Skillset
            </h2>
          </header>

          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-10">
            <FigureCard
              figure={{
                src: '/articles/ai-ops-skillset/future-careers-graphic.png',
                alt: 'Future of AI careers illustration used in the final section of the article.',
              }}
              compact
            />

            <div className="space-y-5 text-base leading-8 text-white/72 sm:text-lg">
              <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                For students, this represents a powerful opportunity.
              </p>
              <p>
                This is not a narrow role. It is a capability that evolves from understanding data,
                to interpreting context, to influencing how intelligent systems perform in
                real-world scenarios.
              </p>
              <p>Over time, those who develop this capability become the ones who:</p>
              <ul className="space-y-3 pl-5 text-lg leading-8 text-white/78 marker:text-coral sm:text-xl">
                <li>Improve AI reliability</li>
                <li>Bridge technology and business outcomes</li>
                <li>Enable organizations to extract real value from AI</li>
              </ul>

              <div className="space-y-4 border-t border-white/10 pt-5">
                <p className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                  Final Thought
                </p>
                <p>
                  The future will not belong to those who simply use AI but to those who can teach
                  it, correct it, and make it work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/4 p-5 sm:p-6">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            About Author
          </h2>
          <p className="text-base leading-8 text-white/72 sm:text-lg">
            Benz Paul is a GenAI and Agentic AI Transformation Coach / Director at Boston
            Institute of Analytics, specializing in AI Ops, data annotation, and real-world AI
            deployment. With over two decades of enterprise experience, he mentors students and
            professionals to build practical careers in the evolving AI ecosystem.
          </p>
        </section>

        <AuthorAboutCard article={article} />
      </div>
    </article>
  )
}

function BodySection({
  article,
  section,
  index,
  showPullQuote,
}: {
  article: Article
  section: ArticleBodySection
  index: number
  showPullQuote: boolean
}) {
  return (
    <section key={`${article.id}-section-${index}`} className="space-y-5">
      {section.heading ? (
        <h2 className="editorial-heading font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
          {section.heading}
        </h2>
      ) : null}

      {section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-base leading-8 text-white/72">
          {paragraph}
        </p>
      ))}

      {section.bullets?.length ? (
        <ul className="space-y-3 pl-5 text-base leading-8 text-white/72 marker:text-coral">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}

      {section.callout ? (
        <aside className="space-y-4 rounded-[1.5rem] border border-white/12 bg-white/5 p-5 sm:p-6">
          {section.callout.eyebrow ? (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
              {section.callout.eyebrow}
            </p>
          ) : null}
          {section.callout.title ? (
            <h3 className="editorial-heading font-display text-xl font-bold text-white sm:text-2xl">
              {section.callout.title}
            </h3>
          ) : null}
          {section.callout.formula ? (
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-7 text-white/82">
              <code>{section.callout.formula}</code>
            </pre>
          ) : null}
          {section.callout.body.map((line) => (
            <p key={line} className="text-base leading-8 text-white/72">
              {line}
            </p>
          ))}
        </aside>
      ) : null}

      {section.figures?.length ? (
        <div className={`grid gap-5 ${section.figures.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {section.figures.map((figure) => (
            <FigureCard key={figure.src} figure={figure} compact={section.figures?.length === 1} />
          ))}
        </div>
      ) : null}

      {showPullQuote && index === 0 ? <PullQuote pullQuote={article.pullQuote} /> : null}
    </section>
  )
}

export function ArticleBody({ article, previewOnly = false }: ArticleBodyProps) {
  if (previewOnly) {
    const previewSections = article.body.slice(0, 1).map((section) => ({
      ...section,
      paragraphs: section.paragraphs.slice(0, 2),
      bullets: section.bullets?.slice(0, 3),
    }))

    return (
      <article className="min-w-0 border-b border-white/10 px-4 py-8 sm:px-6 sm:py-10 lg:px-0 lg:pr-10">
        <div className="space-y-8">
          <figure className="space-y-4">
            <ImagePlaceholder
              label={article.imageLabel}
              src={article.imageSrc}
              alt={article.imageAlt}
              showLabel={false}
              aspectClassName="aspect-[16/9]"
              accent={article.sectionTone === 'lavender' ? 'lavender' : 'coral'}
            />
            <figcaption className="text-sm text-white/45">{article.heroCaption}</figcaption>
          </figure>

          <p className="editorial-heading font-display text-2xl font-extrabold leading-tight text-white/92 sm:text-3xl">
            {article.intro}
          </p>

          {previewSections.map((section, index) => (
            <BodySection
              key={`${article.id}-preview-${index}`}
              article={article}
              section={section}
              index={index}
              showPullQuote={index === 0}
            />
          ))}

          <section className="relative overflow-hidden rounded-[1.75rem] border border-coral/25 bg-white/4 p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink via-ink/80 to-transparent" />
            <div className="relative space-y-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-coral">
                Continue reading
              </p>
              <h2 className="font-display text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                Login to read the full article.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/64 sm:text-base">
                Sign in to access the complete story, publish your own articles, and manage drafts
                from your contributor workspace.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="rounded-full bg-coral px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[#ff8c72]"
                >
                  Login to continue
                </Link>
                <Link
                  to="/"
                  className="rounded-full border border-white/10 px-5 py-3 text-center text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
                >
                  Back to homepage
                </Link>
              </div>
            </div>
          </section>

          <AuthorAboutCard article={article} />
        </div>
      </article>
    )
  }

  if (article.id === 'ai-ops-skillset') {
    return <AiOpsSkillsetLayout article={article} />
  }

  const usesDocumentPages =
    article.layout === 'document-pages' && Boolean(article.documentPages?.length)

  if (usesDocumentPages) {
    return (
      <article className="min-w-0 border-b border-white/10 px-4 py-8 sm:px-6 sm:py-10 lg:px-0 lg:pr-10">
        <div className="space-y-10">
          <div className="mx-auto max-w-3xl space-y-6">
            {article.documentPages?.map((page, index) => (
              <DocumentPageCard key={page.src} figure={page} priority={index === 0} />
            ))}
          </div>

          {article.body.length ? (
            <div className="mx-auto max-w-3xl space-y-8 border-t border-white/10 pt-8">
              {article.body.map((section, index) => (
                <BodySection
                  key={`${article.id}-document-section-${index}`}
                  article={article}
                  section={section}
                  index={index}
                  showPullQuote={false}
                />
              ))}
            </div>
          ) : null}

          <AuthorAboutCard article={article} />
        </div>
      </article>
    )
  }

  return (
    <article className="min-w-0 border-b border-white/10 px-4 py-8 sm:px-6 sm:py-10 lg:px-0 lg:pr-10">
      <div className="space-y-8">
        <figure className="space-y-4">
          <ImagePlaceholder
            label={article.imageLabel}
            src={article.imageSrc}
            alt={article.imageAlt}
            showLabel={false}
            aspectClassName="aspect-[16/9]"
            accent={article.sectionTone === 'lavender' ? 'lavender' : 'coral'}
          />
          <figcaption className="text-sm text-white/45">{article.heroCaption}</figcaption>
        </figure>

        <p className="editorial-heading font-display text-2xl font-extrabold leading-tight text-white/92 sm:text-3xl">
          {article.intro}
        </p>

        {article.body.map((section, index) => (
          <BodySection
            key={`${article.id}-section-${index}`}
            article={article}
            section={section}
            index={index}
            showPullQuote
          />
        ))}

        <AuthorAboutCard article={article} />
      </div>
    </article>
  )
}
