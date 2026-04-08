import type { Article, FounderSpotlight, IssueSummary, SectionBlock } from '../types/content'

export const issueSummary: IssueSummary = {
  issueNumber: '001',
  issueLabel: 'Signals From The Human Layer',
  releaseDate: 'April 2026',
  strapline: 'A monthly field guide to the people, products, and patterns shaping applied AI.',
}

export const articles: Article[] = [
  {
    id: 'cover-story',
    slug: 'drawing-the-lines-that-teach-machines',
    section: 'Cover story',
    sectionIndex: '01',
    sectionTone: 'coral',
    title: 'I draw the lines that teach machines to see',
    deck:
      'A field report from Bengaluru on the invisible labor, judgment calls, and pride that sit beneath every polished AI demo.',
    author: 'Priya Menon',
    role: 'Reported by The Loop',
    readTime: '8 min read',
    publishedAt: 'April 8, 2026',
    imageLabel: 'Cover portrait and workstation still',
    tags: ['AI labor', 'Data annotation', 'Bengaluru'],
    highlight: 'The people closest to the data often see the product risks first.',
    breadcrumb: ['Issue 001', 'Cover story'],
    intro:
      'Training data work is invisible by design, but the choices made in those queues shape what systems notice, ignore, and misread in the world.',
    heroCaption:
      'A late-night annotation shift, where precision is measured one box, one edge case, and one judgment call at a time.',
    pullQuote: {
      quote:
        'Every ambitious AI product eventually runs into the same truth: the data is only as sharp as the people allowed to shape it.',
      attribution: 'Priya Menon',
    },
    body: [
      {
        paragraphs: [
          'Priya Menon starts most days with a new guide document, a fresh queue, and a deadline that assumes perfect source material. Real data is never that tidy. Dashcam footage shakes. Medical scans arrive incomplete. Customer transcripts collapse nuance into a spreadsheet cell.',
          'What looks like repetitive work from the outside is actually a stack of small editorial decisions. Priya and her team decide what counts as visible, what should be ignored as noise, and when the labeling guide itself no longer matches reality.',
        ],
      },
      {
        heading: 'What the workflow actually looks like',
        paragraphs: [
          'A shift moves between image review, taxonomy checks, quality audits, and Slack threads with product teams who often see the dataset only after a model underperforms. The human layer is where disagreement surfaces first.',
          'Priya keeps a private notebook of recurring failures: missing instructions for night scenes, vague categories around gestures, and the quiet assumption that every ambiguity can be solved by asking people to move faster.',
        ],
      },
      {
        heading: 'The cost of invisible expertise',
        paragraphs: [
          'The strongest annotation operators become domain editors. They notice when labels drift. They see when a benchmark flatters the product. They can tell when a founder is treating messy human behavior as if it were a clean ontology.',
          'That expertise rarely makes it into launch narratives, yet it has direct product consequences. Teams that give the data layer a seat at the table ship models with fewer embarrassing blind spots and less expensive rework later.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'In this issue',
        items: [
          '01 Cover story',
          '02 Briefing deck',
          '03 Signal essays',
          '04 Operator roles',
          '05 Founder spotlight',
          '06 Field notes',
        ],
      },
      {
        title: 'Themes',
        items: ['Human-in-the-loop', 'Quality systems', 'Labor design', 'Applied research'],
      },
      {
        title: 'From the editor',
        items: ['Get next issue', 'Join community', 'Explore issue archive'],
      },
    ],
  },
  {
    id: 'briefing-deck',
    slug: 'three-shifts-teams-are-planning-around',
    section: 'Briefing deck',
    sectionIndex: '02',
    sectionTone: 'white',
    title: 'Three shifts AI teams are already planning around',
    deck:
      'A concise read on procurement pressure, evaluation discipline, and why smaller teams are rebuilding their operating systems around better data loops.',
    author: 'Mira Balan',
    role: 'Analysis',
    readTime: '5 min read',
    publishedAt: 'April 8, 2026',
    imageLabel: 'Planning board with release notes',
    tags: ['Strategy', 'Operations', 'Benchmarks'],
    breadcrumb: ['Issue 001', 'Briefing deck'],
    intro:
      'The teams shipping with confidence are not the loudest. They are the ones quietly improving how decisions move between research, product, and operations.',
    heroCaption: 'A planning wall tracking product bets, data debt, and evaluation gaps.',
    pullQuote: {
      quote:
        'Momentum in AI is less about speed in isolation and more about how quickly a team can learn from the last model mistake.',
    },
    body: [
      {
        paragraphs: [
          'Procurement teams are asking harder questions, not just about model performance, but about traceability and update discipline. Buyers want to know what changed, why it changed, and who can explain the tradeoff.',
          'At the same time, internal evaluation habits are getting stricter. Teams that once celebrated benchmark gains now expect scenario testing, human review, and clearer thresholds before rollout.',
        ],
      },
      {
        heading: 'Where founders are focusing',
        paragraphs: [
          'The strongest operators are narrowing scope. They are choosing one workflow, one buyer, and one measurable advantage instead of trying to impress every stakeholder at once.',
          'That discipline shows up in roadmap planning, where the best teams reserve time for dataset repair and feedback loops instead of treating them as cleanup work after launch.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Key signals',
        items: ['Evaluation maturity', 'Procurement scrutiny', 'Focused product scope'],
      },
      {
        title: 'Related reads',
        items: ['Operator roles', 'Field notes', 'Founder spotlight'],
      },
    ],
  },
  {
    id: 'signal-essay',
    slug: 'why-data-quality-became-the-real-product',
    section: 'Signal essay',
    sectionIndex: '03',
    sectionTone: 'lavender',
    title: 'Why data quality became the real product',
    deck:
      'As models commoditize, the defensible work is shifting toward source quality, feedback design, and the discipline to preserve context.',
    author: 'Rohan Dutta',
    role: 'Essay',
    readTime: '6 min read',
    publishedAt: 'April 8, 2026',
    imageLabel: 'Layered charts and annotation overlays',
    tags: ['Data quality', 'Moats', 'Product design'],
    breadcrumb: ['Issue 001', 'Signal essay'],
    intro:
      'Teams still talk about models as the center of gravity, but the practical moat is often everything wrapped around them.',
    heroCaption: 'A layered view of signals, tags, review states, and product context.',
    pullQuote: {
      quote: 'The winner is often the team with the calmest process for cleaning up reality.',
    },
    body: [
      {
        paragraphs: [
          'Models are becoming easier to access. What stays hard is curating data that matches the workflow you actually care about and preserving the context needed to revisit difficult examples later.',
          'That means better annotation standards, stronger review loops, and a product culture that treats ambiguity as part of the system rather than a bug to hide from leadership.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Read next',
        items: ['Three shifts AI teams are planning around', 'Field notes from the operator stack'],
      },
    ],
  },
  {
    id: 'operator-role',
    slug: 'what-an-ai-red-teamer-does-all-week',
    section: 'Operator role',
    sectionIndex: '04',
    sectionTone: 'white',
    title: 'What an AI red-teamer actually does all week',
    deck:
      'A grounded look at the role that sits between model ambition and production reality.',
    author: 'Sana Verghese',
    role: 'Role spotlight',
    readTime: '4 min read',
    publishedAt: 'April 8, 2026',
    imageLabel: 'Testing matrix and prompt review grid',
    tags: ['Red teaming', 'Safety', 'Roles'],
    breadcrumb: ['Issue 001', 'Operator role'],
    intro:
      'Red-team work is not theatre. It is an operating function for teams that want to catch brittle assumptions before customers do.',
    heroCaption: 'An active review board tracking scenarios, failures, and severity levels.',
    pullQuote: {
      quote: 'The best red-teamers are translators between risk language and product decisions.',
    },
    body: [
      {
        paragraphs: [
          'A red-teamer spends less time inventing cinematic edge cases than most people think. The real work is building durable scenario sets, documenting failure patterns, and making those findings legible to product leads.',
          'When that loop is healthy, launch decisions get calmer. When it is absent, teams mistake surprise for innovation.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Related themes',
        items: ['Testing discipline', 'Scenario design', 'Decision hygiene'],
      },
    ],
  },
  {
    id: 'field-notes',
    slug: 'field-notes-from-bengaluru-founder-chats',
    section: 'Field notes',
    sectionIndex: '05',
    sectionTone: 'coral',
    title: 'Field notes from a week of founder conversations',
    deck:
      'Patterns from operator-heavy startups: where they are finding traction, where they are still overfitting, and what they wish more investors understood.',
    author: 'The Loop',
    role: 'Notebook',
    readTime: '7 min read',
    publishedAt: 'April 8, 2026',
    imageLabel: 'Founder meetup and notebook spread',
    tags: ['Founders', 'Bengaluru', 'Applied AI'],
    breadcrumb: ['Issue 001', 'Field notes'],
    intro:
      'Some of the clearest signals in AI are still picked up in side conversations after a meetup, once the demo slides are closed.',
    heroCaption: 'Candid conversations after an AI Tank session in Bengaluru.',
    pullQuote: {
      quote:
        'The founders building durable products are unusually specific about the workflow pain they are eliminating.',
    },
    body: [
      {
        paragraphs: [
          'Across conversations this month, the same pattern surfaced repeatedly: teams are doing better when they narrow the buyer, simplify the first deployment, and learn from one painful workflow deeply.',
          'There is still plenty of hype in the room, but the operators with traction sound less like futurists and more like editors.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Session themes',
        items: ['Workflow specificity', 'Better onboarding', 'Operational credibility'],
      },
    ],
  },
  {
    id: 'toolchain',
    slug: 'the-tools-teams-kept-recommending',
    section: 'Toolchain',
    sectionIndex: '06',
    sectionTone: 'lavender',
    title: 'The toolchain teams kept recommending this month',
    deck:
      'A practical row of evaluation, collaboration, and workflow tools worth trying without turning your stack into a museum.',
    author: 'Kiran Bose',
    role: 'Tooling',
    readTime: '3 min read',
    publishedAt: 'April 8, 2026',
    imageLabel: 'Tool dashboard collage',
    tags: ['Tools', 'Evaluation', 'Workflows'],
    breadcrumb: ['Issue 001', 'Toolchain'],
    intro: 'The best tools this month were not flashy. They removed drag from work people were already doing.',
    heroCaption: 'A pared-back dashboard view of the tools operators kept sending to each other.',
    pullQuote: {
      quote: 'Good tooling disappears into the team rhythm and makes judgment easier to preserve.',
    },
    body: [
      {
        paragraphs: [
          'The recommendations that came up repeatedly all shared one trait: they improved visibility. Teams want to see failure cases faster, route notes cleanly, and keep review work from vanishing into chat threads.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Inside the stack',
        items: ['Review boards', 'Prompt logging', 'Dataset QA', 'Session recaps'],
      },
    ],
  },
]

export const featuredArticle = articles[0]
export const editorialGridArticles = articles.slice(1, 5)
export const secondaryRowArticles = articles.slice(4, 6)

export const founders: FounderSpotlight[] = [
  {
    id: 'founder-necto',
    startup: 'Necto Labs',
    founder: 'Anika Sharma',
    role: 'Co-founder',
    location: 'Bengaluru',
    stage: 'Pre-seed',
    focus: 'NLP systems',
    quote:
      'The model is only as honest as the people allowed to challenge its first confident answer.',
    summary:
      'Necto Labs is building legal workflow tools with a stubborn focus on review quality, source traceability, and operator feedback.',
    cta: 'Read founder story',
  },
  {
    id: 'founder-arcgrid',
    startup: 'Arcgrid Health',
    founder: 'Harshil Mehta',
    role: 'Founder',
    location: 'Mumbai',
    stage: 'Seed',
    focus: 'Clinical ops AI',
    quote:
      'Our moat is not the model. It is the care we took building the review process around the model.',
    summary:
      'Arcgrid Health pairs clinical review teams with workflow-specific copilots built for real hospital constraints.',
    cta: 'Explore spotlight',
  },
  {
    id: 'founder-verbloom',
    startup: 'Verbloom',
    founder: 'Lina George',
    role: 'Co-founder',
    location: 'Remote',
    stage: 'Early revenue',
    focus: 'Customer support AI',
    quote:
      'When support teams trust the review loop, adoption becomes a product story instead of a change-management problem.',
    summary:
      'Verbloom helps customer operations teams redesign escalation and QA workflows before they automate them.',
    cta: 'Meet the team',
  },
]

export const communityPulse = {
  title: 'Community pulse',
  description:
    'AI Tank Bengaluru brought together operators, researchers, and founders for four sharp talks, one practical workshop, and a flood of notebook-worthy questions.',
  items: [
    {
      id: 'pulse-1',
      title: 'Workshop recap',
      detail: 'How teams are setting up human review checkpoints without slowing delivery.',
    },
    {
      id: 'pulse-2',
      title: 'Founder exchange',
      detail: 'A candid conversation about evaluation debt and the cost of skipping instrumentation.',
    },
    {
      id: 'pulse-3',
      title: 'Next gathering',
      detail: 'A smaller session on annotation quality, operator roles, and practical model audits.',
    },
  ],
}

export const componentShowcaseArticle = articles[2]

export const sectionBlocks: SectionBlock[] = [
  {
    id: 'editorial-grid',
    heading: 'Editorial sections',
    description: 'A concise front-page grid of open stories across the current issue.',
    articleIds: editorialGridArticles.map((article) => article.id),
  },
  {
    id: 'secondary-row',
    heading: 'More from this issue',
    description: 'Supplementary reads for operators, founders, and curious generalists.',
    articleIds: secondaryRowArticles.map((article) => article.id),
  },
]

export const getArticleBySlug = (slug: string) =>
  articles.find((article) => article.slug === slug)
