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
    slug: 'data-annotation-the-discipline-that-determines-ais-destiny',
    section: 'Cover story',
    sectionIndex: '01',
    sectionTone: 'coral',
    title: "Data Annotation: The Discipline That Determines AI's Destiny",
    deck:
      'Vijay Raghava K S argues that the next AI leaders will not win on model novelty alone, but on the rigor of the pipelines that turn messy raw input into dependable training truth.',
    author: 'Vijay Raghava K S',
    authorAvatarUrl: '/people/vijay-raghava-ks.jpeg',
    role: 'COO, Innerverse Tech',
    readTime: '8 min read',
    publishedAt: 'April 11, 2026',
    imageLabel: 'Human-AI collaboration concept art for data operations',
    imageSrc: '/articles/data-annotation-destiny/image1.png',
    imageAlt:
      'A dark network graphic labeled AI Data Annotation, showing a central data factory connecting healthcare, automotive, finance, retail, and Gen AI.',
    tags: ['Data annotation', 'Data factories', 'AI operations'],
    highlight: 'AI models are built once. Data factories run forever.',
    breadcrumb: ['Issue 001', 'Cover story'],
    intro:
      'If AI is the brain, data annotation is the education that makes it useful, and Vijay Raghava K S makes the case that this discipline remains one of the most underestimated forces in the technology industry.',
    heroCaption:
      'The lead visual embedded in the Word document, preserved here as the article hero image.',
    pullQuote: {
      quote: 'The companies that lead AI will be the ones that treat data preparation as a core discipline, not a cost center.',
      attribution: 'Vijay Raghava K S',
    },
    body: [
      {
        paragraphs: [
          '"If AI is the brain, data annotation is the education that makes it useful." That framing sits at the center of the document and it matches the article’s core claim: no algorithm, however sophisticated, performs better than the data used to train it.',
          'Artificial intelligence is no longer on the horizon. It is in the operating room, on the factory floor, behind the trading terminal, and inside the cars we drive. But the truth most conversations skip is that every reliable AI system still depends on a disciplined, strategic annotation process underneath it.',
        ],
        figures: [
          {
            src: '/articles/data-annotation-destiny/image1.png',
            alt: 'The original AI Data Annotation systems graphic from the Word document.',
            caption: 'Primary image extracted from the uploaded Word document.',
          },
        ],
      },
      {
        heading: 'The gap nobody talks about',
        paragraphs: [
          'The industry is racing to deploy AI, yet a critical gap widens silently beneath the surface. Organizations possess enormous volumes of raw data, but much of it is unstructured, unlabeled, inconsistent, and often biased. Without accurate annotation, that data is commercially weak.',
          'Models trained on poor-quality labels produce unreliable predictions and biased outputs. In high-stakes sectors like healthcare or autonomous mobility, those failures can become genuinely dangerous decisions rather than minor product defects.',
        ],
      },
      {
        heading: 'Three gaps define this challenge today',
        paragraphs: [
          'The document breaks the problem into three specific gaps that keep teams from turning AI ambition into dependable systems.',
        ],
        bullets: [
          'Data Quality Gap: volume without structure is noise. Most enterprise data pipelines still lack the governance needed to produce annotation-ready datasets at scale.',
          'Domain Expertise Gap: generic labeling does not work in specialized sectors. Medical imaging needs clinical knowledge, legal NLP needs jurisprudential context, and finance annotation needs regulatory fluency.',
          'Scalability and Continuity Gap: AI models are not trained once. They require continuous retraining as the real world evolves, yet many organizations still treat annotation as a project rather than a pipeline.',
        ],
      },
      {
        heading: 'Why data factories matter',
        paragraphs: [
          'The answer, Vijay argues, lies not in better models alone but in better data infrastructure. He centers the idea of the data factory: a structured, scalable system for collecting, cleaning, labeling, validating, and continuously improving training data.',
          'At Innerverse Tech, the claim is that the organizations winning in AI are not necessarily those with the most advanced algorithms. They are the ones with the most disciplined data pipelines. A model trained on 95 percent accurate annotations can outperform a superior architecture trained on poor data, which is the difference between a system that works in production and one that fails in the field.',
          'The human-in-the-loop model is presented as the operating core of that system. Automation handles volume while human expertise handles judgment. Domain specialists validate edge cases, QA layers enforce consistency, and the resulting data reflects real-world complexity closely enough to make AI deployable, trustworthy, and auditable.',
        ],
      },
      {
        heading: 'The industries that cannot wait',
        paragraphs: [
          'The demand is not theoretical. Healthcare, autonomous systems, financial services, retail intelligence, precision agriculture, manufacturing quality control, and generative AI development are all annotation-dependent today, and each of those sectors is scaling AI investment rapidly.',
          'The document also makes a location-specific argument about India. A large, skilled, English-proficient workforce, combined with growing domain expertise in technology, healthcare, and finance, positions the country as a natural global hub for high-quality annotation services.',
          'That is framed not as a commodity opportunity but as a knowledge-economy opportunity, one that creates career pathways in AI training, data quality engineering, model evaluation, and intelligent process design.',
        ],
      },
      {
        heading: 'The forecast',
        paragraphs: [
          'The next phase of AI growth, according to the article, will not be won on model architecture alone. It will be won on data discipline. As generative AI, multimodal systems, and domain-specific large language models become standard, the demand for structured, contextual, and high-integrity training data will only intensify.',
          'For the current generation entering the workforce, Vijay treats this as a durable signal. The skills closest to AI’s actual learning process such as annotation strategy, data quality management, and human feedback systems are likely to remain high-value skills through the decade ahead.',
          'The closing thesis is direct: the companies that lead AI will treat data preparation as a core discipline, not a cost center, and the professionals who lead those companies will be the ones who understood that early.',
        ],
      },
      {
        heading: 'Document note',
        paragraphs: [
          'The Word document ends with a specific magazine-image recommendation: use the second image above, titled "Collaborative Intelligence: Artificial Intelligence and Human," because it visually captures the human-AI partnership at the center of the article.',
          'That note is preserved below along with the closing overlay line suggested in the document itself.',
        ],
        callout: {
          eyebrow: 'Creative Note',
          title: 'Recommended magazine image',
          body: [
            'Use the second image above — "Collaborative Intelligence: Artificial Intelligence and Human" — which visually captures the human-AI partnership that is central to the article’s message.',
            'Suggested overlay: "AI models are built once. Data factories run forever."',
          ],
        },
        figures: [
          {
            src: '/articles/data-annotation-destiny/image2.svg',
            alt: 'Collaborative Intelligence: Artificial Intelligence and Human graphic extracted from the Word document.',
            caption: 'Second embedded asset from the uploaded Word document.',
          },
        ],
      },
    ],
    sidebar: [
      {
        title: 'Three gaps',
        items: ['Data quality without structure', 'Lack of domain-specialist annotators', 'No continuous retraining pipeline'],
      },
      {
        title: 'Where annotation is critical',
        items: ['Healthcare', 'Autonomous systems', 'Financial services', 'Generative AI'],
      },
      {
        title: 'Durable skills',
        items: ['Annotation strategy', 'Data quality management', 'Human feedback systems'],
      },
    ],
  },
  {
    id: 'signal-essay',
    slug: 'why-data-annotation-became-fintechs-trust-engine',
    section: 'Signal essay',
    sectionIndex: '02',
    sectionTone: 'lavender',
    title: "Why Data Annotation Became Fintech's Trust Engine",
    deck:
      'Krishna Potnis traces fintechs shift from speed and surface intelligence toward a harder standard: systems that can explain, justify, and improve machine-made decisions under real regulatory scrutiny.',
    author: 'Krishna Potnis',
    authorAvatarUrl: '/people/krishna-potnis.jpeg',
    role:
      'Fintech Growth Advisor | Payment systems | Tokenization | CloudPOS & SoftPOS | Responsible AI',
    readTime: '10 min read',
    publishedAt: 'April 11, 2026',
    imageLabel: 'Fintech risk dashboard with layered fraud signals',
    imageSrc: '/articles/fintech-trust-engine/page-4-img-1.png',
    imageAlt:
      'A side-by-side chart comparing anomaly hunting before annotation with intent-aware scoring after annotation.',
    tags: ['Fintech', 'Trust', 'Risk models'],
    highlight:
      'Without labels, the model only knows what is unusual. With labels, it starts to learn what is dangerous.',
    breadcrumb: ['Issue 001', 'Signal essay'],
    intro:
      'Fintech spent years chasing speed, then intelligence, and is now running into a more serious test: whether the machine can be trusted when real money, compliance, and customer harm are on the line.',
    heroCaption:
      'One of the central visuals from the PDF: once verified outcomes are added, the system stops hunting anomalies blindly and starts learning intent.',
    pullQuote: {
      quote:
        'The visible failure happens at the prediction layer. The real failure starts at the truth layer.',
      attribution: 'Krishna Potnis',
    },
    body: [
      {
        paragraphs: [
          'The next leap in fintech is not only faster rails, smoother UX, or more powerful AI. It is the discipline of teaching systems the right truth continuously, measurably, and under regulatory pressure.',
          'For years, fintech was obsessed with speed: faster onboarding, faster payments, faster checkout, faster decisions. Then came the AI wave and the obsession shifted toward intelligence. By 2026, Krishna argues, the more serious question arrived in boardrooms and risk committees: can we trust the decisions the machine is making?',
          'Once that question is asked honestly, attention moves away from the model alone and down into the truth layer beneath it. In that layer, data annotation is not clerical cleanup. It is the mechanism that converts raw behavior into machine-understandable meaning.',
        ],
      },
      {
        heading: 'From rails to trust',
        paragraphs: [
          'The PDF maps fintech in four stages. First came infrastructure, where the industry built issuing, acquiring, settlement, cards, and merchant onboarding. Then came the friction-removal era of mobile-first journeys, QR, instant payments, open banking, embedded finance, and BNPL. After that came the AI-everywhere period, where fraud scoring, underwriting, document intelligence, and support bots moved from pilot to production.',
          'The final stage is the trust era. Speed is expected. UX is commoditized. AI is becoming common. What differentiates companies now is whether they can offer explainability, traceability, and control around automated decisions.',
        ],
        bullets: [
          '2010-2020 | FinTech 1.0 — Build the rails: issuing, acquiring, ATM networks, switching, settlement, wallets, card acceptance, and merchant onboarding.',
          '2020-2023 | FinTech 2.0 — Remove friction: mobile-first journeys, QR, instant payments, open banking, embedded finance, and BNPL.',
          '2023-2025 | FinTech 3.0 — Add AI everywhere: fraud scoring, underwriting models, document intelligence, smart routing, and support bots in production.',
          '2026+ | The trust era: explainability, traceability, and control become the new differentiators.',
        ],
      },
      {
        heading: 'What broke along the way',
        paragraphs: [
          'The pressure did not come from theory. It came from operational pain. Krishna uses two anecdotes to show where modern fintech systems break when the truth layer is weak.',
          'In the first, a fraud engine looked brilliant until fraudsters changed choreography with low-value probing, rapid sequencing, device spoofing, and merchant hopping. The system was not exactly stupid. It was blind because it had never seen enough verified examples of that pattern.',
          'In the second, an underwriting model inherited yesterday’s prejudice because the historical repayment labels themselves reflected older approval logic and skewed cohorts. The model did not invent bias. It learned it faster.',
          'That is the article’s core point: the visible failure happens at the prediction layer, but the real failure starts at the truth layer.',
        ],
      },
      {
        heading: 'So what exactly is data annotation in fintech?',
        paragraphs: [
          'In simple language, annotation is how you tell the machine what happened, what it meant, and what should matter next time. It is the difference between an unexplained event and a verified signal the model can actually learn from.',
        ],
        bullets: [
          'This transaction was confirmed fraud, not just an outlier.',
          'This merchant descriptor belongs to a coffee chain, not other.',
          'This identity document was genuine, altered, forged, or incomplete.',
          'This customer complaint needs escalation, not a generic answer.',
          'This applicant later repaid well, which means the earlier rejection boundary was wrong.',
        ],
        callout: {
          eyebrow: 'Math Box',
          title: 'A compact risk model that signals expertise without drowning the reader',
          formula:
            'P(fraud | x) = 1 / (1 + e^-(beta0 + beta1v + beta2g + beta3d + beta4m + beta5b))',
          body: [
            'Here, v is velocity, g is geo-anomaly, d is device risk, m is merchant-pattern risk, and b is behavioural deviation.',
            'Annotation provides the verified outcome such as fraud, non-fraud, disputed, or compromised that allows the coefficients to learn something meaningful. Without labels, the model only knows what is unusual. With labels, it starts to learn what is dangerous.',
          ],
        },
      },
      {
        heading: 'Before and after annotation: what changes operationally',
        paragraphs: [
          'Before annotation, the model mainly sees distance from normal. It flags unusual points, but it does not reliably understand intent. That creates noise, false positives, and customer friction.',
          'After annotation, the system is trained on verified outcomes. It learns a boundary between safe and risky behavior and challenges only the patterns that truly resemble known attack or loss signatures.',
          'Once the model is fed verified outcomes, it stops chasing only anomalies and starts learning intent.',
        ],
        figures: [
          {
            src: '/articles/fintech-trust-engine/page-4-img-1.png',
            alt: 'A comparison graphic showing anomaly hunting before annotation and intent-aware scoring after annotation.',
            caption:
              'The original comparison graphic from the PDF, preserved as an inline figure.',
          },
        ],
      },
      {
        heading: 'Use cases where annotation creates real business value',
        paragraphs: [
          'The PDF turns the thesis into four direct business cases. In each one, the annotation layer teaches the system something more precise than simple anomaly detection.',
        ],
        bullets: [
          'Fraud and scam detection: move beyond unusual activity and toward specific attack topology such as card testing, mule behavior, account takeover, refund abuse, authorized push payment scams, and merchant collusion.',
          'Credit and BNPL underwriting: relabel the gray zone of rejected customers using actual repayment outcomes instead of historical bureau logic alone, helping rotate the decision boundary toward hidden good borrowers.',
          'Merchant and transaction enrichment: teach the system that messy descriptors such as SQ * BILLS COFFEE LDN belong to a dining merchant, not other, improving customer trust, dispute reduction, budgeting, and next-best-action engines.',
          'Support and compliance AI: classify intent, escalation, vulnerability, and policy-safe responses so conversational systems become regulated service infrastructure instead of fast but unsafe automation.',
        ],
      },
      {
        heading: 'Real-world market signals: Mastercard and Klarna',
        paragraphs: [
          'Krishna is careful not to overclaim private knowledge of any company’s labeling pipeline, but the public performance signals still point in the same direction. When global fintech players publish measurable improvements in fraud detection, false-positive reduction, or credit-loss performance from AI-led decisioning, those gains almost always depend on strong ground truth and continuous supervision.',
          'Mastercard said in 2024 that Decision Intelligence Pro works in less than 50 milliseconds, with initial modelling showing AI enhancements boosting fraud detection rates on average by 20 percent and reducing false positives by more than 85 percent. Klarna reported in February 2026 that GMV grew by 32 percent in Q4 while provisions for credit losses declined from 0.72 percent of GMV in Q3 to 0.65 percent in Q4.',
        ],
        figures: [
          {
            src: '/articles/fintech-trust-engine/page-6-img-1.png',
            alt: 'A bar chart highlighting fraud detection uplift and false-positive reduction for Mastercard.',
            caption: 'Mastercard signal from the PDF.',
          },
          {
            src: '/articles/fintech-trust-engine/page-6-img-2.png',
            alt: 'A two-bar chart comparing Klarna credit loss provisions across two quarters with GMV growth noted.',
            caption: 'Klarna signal from the PDF.',
          },
        ],
      },
      {
        heading: 'Interpretation discipline',
        paragraphs: [
          'The PDF also includes an explicit warning on overclaiming. For Mastercard, the public numbers point to high-quality supervised decisioning at enormous scale, and the company’s 2025 results reported gross dollar volume of $10.6 trillion with 10 percent growth in switched transactions. For Klarna, the public numbers point to disciplined underwriting refinement, with the company’s 2021 annual report saying it had reduced credit losses by 60 percent since 2019 and its February 2026 update showing a further decline in credit-loss provisions while GMV grew.',
        ],
      },
      {
        heading: 'Why regulation quietly pulls annotation into the core',
        paragraphs: [
          'Regulation reinforces what operators already know. The EU AI Act entered into force on August 1, 2024 and is fully applicable from August 2, 2026, with some exceptions. High-risk AI systems embedded into regulated products have a later transition period to August 2, 2027.',
          'Krishna also points to the NIST AI Risk Management Framework, which emphasizes test, evaluation, verification, and validation throughout the AI lifecycle. In practice, that pushes firms toward continuous feedback loops, and annotation becomes the operating mechanism for those loops.',
          'The closing argument is direct: trust is not a messaging layer added after the model ships. It is built through disciplined supervision, measurable feedback, and annotated truth that survives contact with the real world.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'High-value use cases',
        items: ['Fraud detection', 'BNPL underwriting', 'Merchant enrichment', 'Compliance AI'],
      },
      {
        title: 'Market signals',
        items: ['Mastercard fraud uplift', 'False-positive reduction', 'Klarna credit-loss improvement'],
      },
      {
        title: 'Governance pressure',
        items: ['EU AI Act milestones', 'NIST AI RMF lifecycle control', 'Continuous feedback loops'],
      },
    ],
    documentPages: [
      {
        src: '/articles/fintech-trust-engine/page-1.png',
        alt: 'Page 1 of the Krishna Potnis PDF article.',
        caption: 'PDF page 1',
      },
      {
        src: '/articles/fintech-trust-engine/page-2.png',
        alt: 'Page 2 of the Krishna Potnis PDF article.',
        caption: 'PDF page 2',
      },
      {
        src: '/articles/fintech-trust-engine/page-3.png',
        alt: 'Page 3 of the Krishna Potnis PDF article.',
        caption: 'PDF page 3',
      },
      {
        src: '/articles/fintech-trust-engine/page-4.png',
        alt: 'Page 4 of the Krishna Potnis PDF article.',
        caption: 'PDF page 4',
      },
      {
        src: '/articles/fintech-trust-engine/page-5.png',
        alt: 'Page 5 of the Krishna Potnis PDF article.',
        caption: 'PDF page 5',
      },
      {
        src: '/articles/fintech-trust-engine/page-6.png',
        alt: 'Page 6 of the Krishna Potnis PDF article.',
        caption: 'PDF page 6',
      },
      {
        src: '/articles/fintech-trust-engine/page-7.png',
        alt: 'Page 7 of the Krishna Potnis PDF article.',
        caption: 'PDF page 7',
      },
    ],
  },
  {
    id: 'strategy-brief',
    slug: 'data-annotation-tool-platform-or-human-in-the-loop',
    section: 'Strategy brief',
    sectionIndex: '03',
    sectionTone: 'white',
    title: 'Data Annotation: Tool, Platform, or Human in the Loop?',
    deck:
      'Chetan Bhambri argues that the most consequential AI decisions are often made before any model is chosen, in the definitions, category structures, and escalation rules that shape what the system learns.',
    author: 'Chetan Bhambri',
    authorAvatarUrl: '/people/chetan-bhambri.jpeg',
    role: 'Founder, UinLEAD',
    readTime: '6 min read',
    publishedAt: 'April 11, 2026',
    imageLabel: 'Human annotator reviewing computer vision labels at a workstation',
    imageSrc: '/articles/strategy-brief/cover.png',
    imageAlt:
      'A human annotator at a desk reviewing bounding-box labels on a computer vision dataset across dual monitors.',
    tags: ['Leadership', 'Governance', 'Human in the loop'],
    highlight:
      'The brief is not a formality. It is the first model decision, made before a single label is applied.',
    breadcrumb: ['Issue 001', 'Strategy brief'],
    intro:
      'Every AI model an organisation uses has already been shaped by human judgment, and the real question is whether that judgment was clear enough to trust when scaled across the business.',
    heroCaption:
      'Cover image showing a human annotator at work, reinforcing the article focus on human judgment inside AI systems.',
    pullQuote: {
      quote:
        'The annotators had done their job. The problem was never downstream.',
      attribution: 'Chetan Bhambri',
    },
    body: [
      {
        paragraphs: [
          'Across industries, organisations are asking which AI tools to adopt, which vendors to trust, and which processes to automate. Chetan Bhambri’s argument is that those questions often arrive too late.',
          'A 2025 study from MIT’s NANDA initiative concluded that 95 percent of generative AI pilot programs fail to produce measurable financial impact, with the breakdown coming not from model quality but from poor workflow integration and misaligned organisational incentives.',
          'By the time teams ask which model to use, more consequential decisions have already been made. Someone has decided what to label, how categories are structured, and which edge cases require human review. Those are not minor technical details. They shape every output the system will produce.',
        ],
      },
      {
        heading: 'The conversation most organisations miss',
        paragraphs: [
          'The document points to broader supporting evidence as well. A multi-organisation study across Europe and the UK found that annotation quality errors propagate throughout the AI lifecycle, leading to false detections and misinterpretations, with ambiguous instructions and inter-annotator disagreement among the most common root causes.',
          'That reframes the strategic question. Instead of asking only which system to buy, organisations need to ask what definitions and assumptions they are embedding into systems that will scale across the business.',
          'Chetan also notes that enterprises where senior leadership actively shapes AI governance achieve meaningfully greater business value than those delegating the work to technical teams alone. McKinsey data found that 65 percent of AI high performers have defined human-in-the-loop processes, compared with only 23 percent of other organisations.',
        ],
      },
      {
        heading: 'Illustrative scenario',
        paragraphs: [
          'A financial services firm deployed a sentiment model to route customer support tickets. The annotation brief defined frustrated as any message containing negative words.',
          'Annotators flagged an issue early: a message like "this is ridiculously fast, thank you" would be marked negative. The concern was acknowledged but not addressed.',
          'Six months after launch, the model was consistently misclassifying a segment of high-value customers who used hyperbolic language as a cultural norm. Their escalation rates quietly increased.',
          'The issue was eventually traced back not to the model, but to the original annotation definitions. The annotators had done their job. The problem was never downstream.',
        ],
      },
      {
        heading: 'Why tools and platforms are not enough',
        paragraphs: [
          'Modern annotation platforms are powerful. They enable pre-labeling, workflow automation, and quality control at scale, and they are necessary for handling today’s data volumes.',
          'But platforms only amplify the logic they are given. They can enforce consistency, not clarity. They can accelerate work, not resolve ambiguity.',
          'This is where human-in-the-loop becomes critical. In these systems, AI handles high-volume tasks while humans review edge cases, correct errors, and refine outputs. That creates a feedback loop in which human judgment continuously improves machine output, especially where nuance, context, and bias matter.',
          'Even then, HITL has limits. It cannot compensate for unclear definitions. If the brief is weak, the loop only reinforces confusion.',
        ],
      },
      {
        heading: 'What organisations can do before annotation begins',
        paragraphs: [
          'The most effective intervention is the earliest one. Before any labeling starts, organisations benefit from doing the definitional work that is easy to defer and costly to skip.',
          'That includes agreeing internally on what each category actually means, resolving edge cases in principle instead of leaving them to annotator judgment, and stress-testing label structures against real examples from the data.',
          'Chetan treats this as organisational clarity work rather than annotation work. It changes the quality of everything that follows: the brief, the annotator experience, the model, and the outputs that eventually reach customers.',
          'The organisations that get annotation right tend to treat the briefing process as seriously as the annotation process itself. The brief is not a formality. It is the first model decision, made before a single label is applied.',
        ],
      },
      {
        heading: 'The agency opportunity most are leaving on the table',
        paragraphs: [
          'For annotation agencies, this pattern creates more than a quality challenge. It creates a positioning opportunity.',
          'Agencies that surface definitional gaps early, before work begins and before rework accumulates, are providing a service that goes beyond labeling. They become the first external party to stress-test whether a client’s concepts are actually clear enough to teach a machine.',
          'That capability to ask the right questions before annotation starts, to escalate ambiguity instead of silently absorbing it, and to turn annotation friction into structured brief improvement is presented as a genuine differentiator.',
          'The strongest annotation partnerships, in this framing, are not defined by throughput. They are defined by what gets caught upstream and who had the process to catch it.',
        ],
      },
      {
        heading: 'About Chetan Bhambri',
        paragraphs: [
          'Chetan Bhambri is Founder, UinLEAD.',
          'After three decades in global enterprises and high-growth organisations, he now partners with founders and senior leaders to strengthen how they think, decide, and build, especially as AI reshapes the systems their businesses run on.',
        ],
      },
      {
        heading: 'References',
        bullets: [
          'AI Adoption in Enterprise Statistics & Trends 2026 | Second Talent',
          'Stanford Digital Economy Lab: Enterprise AI Playbook',
          'arXiv paper on annotation quality and lifecycle propagation',
          'Deloitte: State of AI in the Enterprise',
          'Data Labeling: The Key to Building Smarter AI Systems',
        ],
        paragraphs: [
          'The uploaded document ends with source links and reference pointers supporting the governance, adoption, and annotation-quality claims used throughout the article.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Core argument',
        items: [
          'Definitions shape outputs',
          'Leadership needs to own governance',
          'Human review cannot rescue a weak brief',
        ],
      },
      {
        title: 'Signals in the document',
        items: [
          '95% of GenAI pilots miss measurable impact',
          '65% of AI high performers define HITL processes',
          'Ambiguous instructions drive annotation error',
        ],
      },
      {
        title: 'Practical advice',
        items: [
          'Resolve category meaning early',
          'Stress-test labels against real examples',
          'Escalate ambiguity before production',
        ],
      },
    ],
  },
  {
    id: 'beta-training',
    slug: 'hermes-agent-beta-training-and-the-next-annotation-shift',
    section: 'Beta training',
    sectionIndex: '04',
    sectionTone: 'lavender',
    title: 'The New Hermes Agent Is Quietly Changing How AI Adapts To The Real World',
    deck:
      'Vivek Ganesan argues that Hermes is pushing annotation work upstream, from labeling outputs after deployment to designing reward loops and RL environments before users ever touch the agent.',
    author: 'Vivek Ganesan',
    authorAvatarUrl: '/people/vivek-ganesan.png',
    role:
      '2x Failed AI SaaS Maker, Published Author, AI-assisted Engineering Practices Educator, Public Speaker, DevOps Coach',
    readTime: '7 min read',
    publishedAt: 'April 12, 2026',
    imageLabel: 'Hermes Agent terminal-style cover graphic',
    imageSrc: '/articles/hermes-beta-training/image1.png',
    imageAlt:
      'A dark retro-styled Hermes Agent splash image listing available tools and skills.',
    tags: ['RL training', 'Agents', 'Annotation ops'],
    highlight:
      'The shift is from labeling data post-production to running RL environments pre-production: earlier in the lifecycle, higher in value.',
    breadcrumb: ['Issue 001', 'Beta training'],
    intro:
      'Every AI system already depends on human judgment, but Hermes suggests that judgment may now move earlier in the lifecycle, where people define what good looks like before a model ever goes live.',
    heroCaption:
      'The lead Hermes visual extracted from the uploaded document and used as the article hero image.',
    pullQuote: {
      quote:
        'You are not configuring a training pipeline. You are defining what good looks like, and the system does the rest.',
      attribution: 'Vivek Ganesan',
    },
    body: [
      {
        heading: 'The subtle shift from annotation to beta training',
        paragraphs: [
          'The document opens with a concise thesis. Today, offshore annotation teams label data to help train AI models. Hermes, a fast-growing open-source agent from Nous Research, ships with a built-in reinforcement learning pipeline where humans define tasks, scoring rules, and reward functions before a model goes live.',
          'Vivek frames that as beta training: structured, pre-deployment human-AI work that shapes how a model behaves in the real world. In that framing, the expertise annotation teams already have does not disappear. It moves earlier in the lifecycle and becomes more strategically valuable.',
        ],
        bullets: [
          'Current model: offshore teams label structured datasets and companies use that data to train and fine-tune models.',
          'Hermes model: humans define tasks, scoring functions, and rewards before deployment, then the agent trains against those rules.',
          'Strategic implication: annotation work moves from post-production correction to pre-production behavior design.',
        ],
      },
      {
        heading: 'Meet Hermes, the popular new kid on the block',
        paragraphs: [
          'As presented in the document, Hermes launched in February 2026 and has been shipping new versions at unusual speed. Vivek points to its April 8, 2026 release and the rapid rise in community attention as evidence that developers are paying close attention to the project.',
          'The argument is not just that Hermes is popular. It is that one feature buried in the documentation matters more than the rest for the annotation industry: RL training.',
        ],
        figures: [
          {
            src: '/articles/hermes-beta-training/image2.jpeg',
            alt: 'A star-history chart showing Hermes agent GitHub growth accelerating sharply into April 2026.',
            caption: 'The growth chart embedded in the document, used to underscore Hermes momentum.',
          },
        ],
      },
      {
        heading: 'What RL training means in plain English',
        paragraphs: [
          'Hermes includes a built-in reinforcement learning training pipeline. Vivek reduces it to three setup decisions: define the task, define the scoring function, and define the reward.',
          'The agent then runs those tasks repeatedly. Each run is a trajectory, meaning the full sequence of what the model did step by step to reach an answer. Those trajectories get scored, the scores become training signals, and the model improves for that specific task.',
          'The document stresses that Hermes exposes this through built-in tools rather than requiring users to write a training stack from scratch.',
        ],
        bullets: [
          'Task: what you want the AI to do, such as handling a customer query or processing a document category.',
          'Scoring function: how you evaluate whether the AI performed well or poorly.',
          'Reward: the signal that tells the model to do more of what worked and less of what did not.',
          'Built-in Hermes tools mentioned in the document: `rl_list_environments`, `rl_select_environment`, `rl_start_training`, `rl_check_status`, and `rl_stop_training`.',
        ],
      },
      {
        heading: 'The work nobody sees',
        paragraphs: [
          'The document places Hermes in the context of today\'s invisible human effort. Before a model can recognize an image, summarize a document, or answer a question, someone has labeled data, reviewed outputs, or corrected mistakes.',
          'That is still the active model in 2026: offshore teams label large datasets in structured tools, AI companies use that labeled data to train and fine-tune models, the model gets deployed, and when it needs to improve the cycle starts again.',
          'Hermes points toward a new phase in the lifecycle that is not yet standard at scale but is quietly being built: shaping behavior before deployment rather than mostly correcting behavior after deployment.',
        ],
      },
      {
        heading: 'Defining good before deployment',
        paragraphs: [
          'Vivek turns the article on three harder questions: who writes the scoring functions, who builds the RL environments, and who decides what correct looks like for a specific domain before a model goes live.',
          'That work is not automated. It still requires human judgment and domain understanding. Annotation teams already do a version of this whenever they apply quality criteria, make decisions about correctness, and distinguish useful from unusable outputs.',
          'The difference is that instead of saying the model got this wrong and here is the right answer, the team says here is the task, here is how to score it, and now train on this before we release you to the world.',
          'That is why the document calls the shift beta training rather than simply more labeling.',
        ],
        figures: [
          {
            src: '/articles/hermes-beta-training/image3.png',
            alt: 'A linear diagram showing beta usage, trajectory capture, feedback or outcome, RL training, improved agent, and repeat.',
            caption:
              'The process diagram embedded in the document, showing how real-task feedback loops into RL training.',
          },
        ],
      },
      {
        heading: 'Not annotation without labels',
        paragraphs: [
          'The article explicitly rejects the phrase annotation without labels. Labels have not disappeared. They are embedded differently inside scoring functions and reward signals rather than spreadsheet columns.',
          'A human still decides what score to assign a correct answer. A human still defines task boundaries. A human still reviews whether a training run is moving in the right direction.',
          'The better framing, according to the document, is that annotation is moving earlier in the product lifecycle and becoming more structured around the training loop.',
        ],
        bullets: [
          'Current annotation: label static data, work on isolated examples, correct outputs after deployment, and optimize for volume.',
          'RL-based beta training: define tasks, scoring, and rewards; work with full task trajectories; train before deployment; and optimize for expertise.',
        ],
      },
      {
        heading: 'Why offshore annotation teams are the natural fit',
        paragraphs: [
          'This is the commercial core of the document. Vivek argues that running RL training environments is not a job for developers alone. Developers can build the technical scaffolding, but the people who should define environments, write scoring functions, and validate whether reward signals reflect real-world usefulness are the same people who have been doing annotation work for years.',
          'He lists the required capabilities clearly: deep understanding of what a correct or useful output looks like in a specific domain, the ability to articulate quality criteria consistently across thousands of examples, experience running structured human review at scale, and knowledge of where AI models fail in real usage.',
          'That is not a new skill set. It is the accumulated capability of mature annotation teams. The shift is from running post-deployment labeling programs to running pre-deployment RL environments for the same AI-company clients.',
        ],
      },
      {
        heading: 'The bigger picture',
        paragraphs: [
          'The closing argument is that Hermes is shipping quickly, developers are building custom environments on top of its RL pipeline now, and more systems like it will increase demand for people who can design, run, and validate RL training environments.',
          'That work still requires domain expertise, structured processes, and the ability to operate at scale. Offshore annotation businesses already have those capabilities. The game is shifting, but the players do not necessarily have to change. They may just need to enter at an earlier phase.',
        ],
      },
      {
        heading: 'Document note',
        paragraphs: [
          'The uploaded document ends with a note to the editor offering a bio and photo from the author\'s website. The article body above preserves the document\'s argument and embedded visuals directly from the file itself.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Core shift',
        items: [
          'Post-deployment labels to pre-deployment RL environments',
          'Volume-based workflows to expertise-based workflows',
          'Correcting outputs to shaping behavior',
        ],
      },
      {
        title: 'Hermes workflow',
        items: [
          'Define tasks',
          'Define scoring functions',
          'Assign rewards',
          'Train on trajectories',
        ],
      },
      {
        title: 'Why it matters',
        items: [
          'Earlier intervention in the lifecycle',
          'Higher-value annotation work',
          'Natural fit for offshore review teams',
        ],
      },
    ],
  },
  {
    id: 'policy-essay',
    slug: 'data-annotation-powers-modern-ai',
    section: 'Policy essay',
    sectionIndex: '05',
    sectionTone: 'white',
    title: 'Data Annotation Powers Modern AI',
    deck:
      'Subimal Bhattacharjee argues that data annotation is the unglamorous backbone of AI progress, and that India now has a narrow chance to turn annotation quality, worker protections, and multilingual capacity into strategic advantage.',
    author: 'Subimal Bhattacharjee',
    authorAvatarUrl: '/people/subimal-bhattacharjee.jpeg',
    role: 'Author, Columnist & Policy adviser on tech and defence',
    readTime: '8 min read',
    publishedAt: 'April 13, 2026',
    imageLabel: 'Illustrated map of how annotated data powers modern AI systems',
    imageSrc: '/articles/data-annotation-powers-modern-ai/cover.jpeg',
    imageAlt:
      'An illustrated infographic showing labeled images, tagged text, audio transcripts, and machine learning models powering modern artificial intelligence.',
    tags: ['Policy', 'India', 'Annotation labor'],
    highlight:
      'Data annotation is not glamorous, but it is the soil in which modern AI models grow.',
    breadcrumb: ['Issue 001', 'Policy essay'],
    intro:
      'Every time a self-driving car recognizes a stop sign, a chatbot answers in fluent prose, or a moderation system flags a harmful image, human labeling work sits somewhere beneath that result.',
    heroCaption:
      'Cover image illustrating how annotated data flows into computer vision, speech recognition, chatbots, and other AI systems.',
    pullQuote: {
      quote:
        'Fair compensation, worker wellbeing, and annotator diversity are not peripheral concerns. They are quality variables.',
      attribution: 'Subimal Bhattacharjee',
    },
    body: [
      {
        paragraphs: [
          'Subimal Bhattacharjee opens with a blunt point: the artificial intelligence revolution depends on people who do not write the code, but label the data that allows systems to learn from the world. That invisible labor sits behind self-driving cars, fluent chatbots, and content moderation systems, yet remains one of the least scrutinized links in the AI value chain.',
          'The article frames data annotation as the process of tagging raw information so that machine learning models can learn from it. Without annotated images, text, audio, and video, even the most sophisticated neural network is effectively flying blind.',
        ],
      },
      {
        heading: 'What data annotation actually does',
        paragraphs: [
          'At its core, data annotation adds metadata to raw data so it becomes interpretable by algorithms. A tumor-detection model needs X-rays where a trained eye has already outlined and classified each tumor. A language model tuned to avoid toxicity needs human raters to score text for offensiveness. A voice assistant needs audio transcribed, accents noted, and emotions tagged.',
          'The article points to the scale of the market to show that this dependency is not incidental. The global data annotation market is projected to exceed 17 billion dollars by 2030, growing at a compound annual rate of more than 26 percent. As generative AI accelerates model creation, the need for high-quality labeled data is growing faster than automation can replace human judgment.',
        ],
      },
      {
        heading: 'The human cost nobody talks about',
        paragraphs: [
          'Bhattacharjee describes the business model of data annotation as a form of outsourced micro-labor. Platforms such as Amazon Mechanical Turk, Scale AI, and Appen connect AI companies in the Global North with workers, often in the Global South, who perform repetitive classification tasks for relatively low wages.',
          'The article highlights a 2023 TIME investigation reporting that workers in Kenya hired to filter disturbing content for OpenAI were paid less than two dollars an hour and suffered lasting psychological consequences.',
          'That leads to a harder ethical question: can the ethics of an AI system be separated from the conditions under which its training data was produced? The article’s answer is increasingly no. Bias in annotation caused by weak training, cultural unfamiliarity, or fatigue does not stay in the workflow. It flows directly into model behavior.',
        ],
      },
      {
        heading: "India's strategic moment",
        paragraphs: [
          'The article argues that few countries are better positioned than India to define what responsible data annotation looks like at scale. India already contributes a meaningful share of global annotation output, with hubs in Hyderabad, Bengaluru, Jaipur, and Bhubaneswar.',
          'What makes the country strategically important is not just labor cost. It is linguistic depth. With 22 scheduled languages and hundreds of dialects, India can build training datasets for Indic-language AI, an area global platforms have consistently underserved.',
          'Bhattacharjee points to the India AI Mission, launched in 2024 with a budgetary outlay of Rs 10,372 crore, and to the IndiaAI Datasets Platform as evidence that the central government has recognized the importance of high-quality datasets. He also notes that Skill India Digital has started incorporating AI data-labeling as a formal vocational skill rather than leaving the workforce entirely to informal gig markets.',
          'Even so, the article stresses that the gap between policy intention and implementation remains wide. India still lacks well-defined quality assurance standards for annotation, consistent audit frameworks, and a coherent regulatory regime for AI training data. The Digital Personal Data Protection Act of 2023 addresses privacy, but does not yet settle the broader governance problem for AI training use cases.',
        ],
      },
      {
        heading: 'The path forward',
        paragraphs: [
          'The article identifies three policy imperatives. First, India needs a national annotation quality standard that sets minimum benchmarks for annotation accuracy, annotator training, and domain certification, similar in spirit to how the Bureau of Indian Standards handles physical goods.',
          'Second, the welfare dimension needs structural treatment. Platform work legislation should extend protections such as health insurance, minimum piece-rate guarantees, and mental health support to annotation workers, particularly those handling sensitive content.',
          'Third, and most consequentially, India should treat its multilingual annotation capacity as a strategic asset for sovereign AI rather than only as a service export. Every high-quality dataset in Tamil, Bengali, or Kannada that is produced domestically and retained under open licensing becomes part of the country’s long-term AI capability.',
          'The closing argument is that the country that owns the annotation infrastructure for its own languages is the country that shapes AI for its own people. Invisible labor, in that sense, deserves visible policy.',
        ],
        bullets: [
          'Set national annotation quality benchmarks for accuracy, training, and certification.',
          'Extend social protections and mental health support to annotation workers.',
          'Treat multilingual annotated datasets as strategic sovereign AI infrastructure.',
        ],
      },
      {
        heading: 'About the author',
        paragraphs: [
          'Subimal Bhattacharjee is identified in the submission as the author of The Digital Decades, published in February 2026, and as a policy adviser on technology and defence.',
          'The note also states that he is the former country head of General Dynamics in India.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Core claim',
        items: [
          'Annotation is foundational AI infrastructure',
          'Worker conditions affect model quality',
          'Policy must treat annotation as strategic',
        ],
      },
      {
        title: 'India focus',
        items: [
          'Indic-language depth',
          'India AI Mission and dataset platform',
          'Need for local quality standards',
        ],
      },
      {
        title: 'Policy imperatives',
        items: [
          'Quality benchmarks',
          'Worker protections',
          'Sovereign multilingual datasets',
        ],
      },
    ],
  },
  {
    id: 'ai-ops-skillset',
    slug: 'building-ai-is-easy-making-it-work-is-hard',
    section: 'Career brief',
    sectionIndex: '06',
    sectionTone: 'coral',
    title: 'Building AI Is Easy. Making It Work Is Hard.',
    deck:
      'Benz Paul frames AI Ops and data annotation as the layer where enterprise AI either becomes reliable in the real world or breaks under messy data, weak context, and operational drift.',
    author: 'Benz Paul',
    authorAvatarUrl: '/people/benz-paul.jpeg',
    role: 'GenAI & Agentic AI Transformation Coach / Director, Boston Institute of Analytics',
    readTime: '5 min read',
    publishedAt: 'April 13, 2026',
    imageLabel: 'First page of the Benz Paul AI Ops article',
    imageSrc: '/articles/ai-ops-skillset/page-1.png',
    imageAlt:
      'The opening page of the article Building AI Is Easy. Making It Work Is Hard.',
    tags: ['AI Ops', 'Data annotation', 'Careers'],
    highlight:
      'The future will not belong to those who simply use AI, but to those who can teach it, correct it, and make it work.',
    layout: 'document-pages',
    breadcrumb: ['Issue 001', 'Career brief'],
    intro:
      'This article is presented from the source document pages so the original first page and the requested visual layouts are preserved inside the article view.',
    heroCaption:
      'This story uses the original document pages instead of the standard editorial hero treatment.',
    pullQuote: {
      quote:
        'The future will not belong to those who simply use AI, but to those who can teach it, correct it, and make it work.',
      attribution: 'Benz Paul',
    },
    body: [
      {
        heading: 'About the author',
        paragraphs: [
          'Benz Paul is a GenAI and Agentic AI Transformation Coach / Director at Boston Institute of Analytics, specializing in AI Ops, data annotation, and real-world AI deployment.',
          'With over two decades of enterprise experience, he mentors students and professionals to build practical careers in the evolving AI ecosystem.',
        ],
      },
    ],
    sidebar: [
      {
        title: 'Core argument',
        items: [
          'Strong models still fail when data quality and context break down.',
          'AI Ops is the operational layer that keeps AI reliable after the model is built.',
          'Data annotation is applied intelligence, not mechanical labeling.',
        ],
      },
      {
        title: 'What AI Ops covers',
        items: [
          'Preparing and refining data',
          'Ensuring accuracy and consistency',
          'Monitoring performance, cost, and continuous improvement',
        ],
      },
      {
        title: 'Career signal',
        items: [
          'Interpret context beyond what is visible',
          'Judge edge cases without a single obvious answer',
          'Bridge technology decisions with business outcomes',
        ],
      },
    ],
    documentPages: [
      {
        src: '/articles/ai-ops-skillset/page-1.png',
        alt: 'Page 1 of the Benz Paul AI Ops article.',
      },
      {
        src: '/articles/ai-ops-skillset/page-2.png',
        alt: 'Page 2 of the Benz Paul AI Ops article showing the AI Ops industry shift visual.',
      },
      {
        src: '/articles/ai-ops-skillset/page-3.png',
        alt: 'Page 3 of the Benz Paul AI Ops article about data annotation.',
      },
      {
        src: '/articles/ai-ops-skillset/page-4.png',
        alt: 'Page 4 of the Benz Paul AI Ops article about the emerging skillset.',
      },
    ],
  },
]

const getArticleById = (id: string) => {
  const article = articles.find((entry) => entry.id === id)

  if (!article) {
    throw new Error(`Missing article content for id: ${id}`)
  }

  return article
}

const pickArticles = (ids: string[]) => ids.map(getArticleById)
const shuffleArticles = <T,>(items: T[]) => {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled
}

const homepageArticlePool = shuffleArticles(
  pickArticles([
    'cover-story',
    'signal-essay',
    'beta-training',
    'strategy-brief',
    'policy-essay',
    'ai-ops-skillset',
  ]),
)

export const featuredArticle = homepageArticlePool[0]
export const editorialGridArticles = homepageArticlePool.slice(1)
export const secondaryRowArticles = shuffleArticles<Article>([])

export const founders: FounderSpotlight[] = [
  {
    id: 'chetan-bhambri',
    startup: 'UinLEAD',
    founder: 'Chetan Bhambri',
    role: 'Founder, UinLEAD',
    imageSrc: '/people/chetan-bhambri.jpeg',
    imageAlt: 'Portrait of Chetan Bhambri',
    location: 'India',
    stage: 'Founder',
    focus: 'AI governance',
    quote:
      'The most consequential AI decisions are often made before any model is chosen.',
    summary:
      'Chetan focuses on the definitions, category structures, and escalation rules that shape what enterprise AI systems learn.',
    cta: 'Read profile',
  },
  {
    id: 'vivek-ganesan',
    startup: 'AI Engineering Practice',
    founder: 'Vivek Ganesan',
    role:
      '2x Failed AI SaaS Maker, Published Author, AI-assisted Engineering Practices Educator, Public Speaker, DevOps Coach',
    imageSrc: '/people/vivek-ganesan.png',
    imageAlt: 'Portrait of Vivek Ganesan',
    location: 'India',
    stage: 'Educator',
    focus: 'AI engineering',
    quote:
      'Annotation is moving earlier in the product lifecycle and becoming more structured around the training loop.',
    summary:
      'Vivek teaches AI-assisted engineering practices and writes about how reward loops and RL environments change applied AI work.',
    cta: 'Read profile',
  },
  {
    id: 'benz-paul',
    startup: 'Boston Institute of Analytics',
    founder: 'Benz Paul',
    role: 'GenAI & Agentic AI Transformation Coach / Director, Boston Institute of Analytics',
    imageSrc: '/people/benz-paul.jpeg',
    imageAlt: 'Portrait of Benz Paul',
    location: 'India',
    stage: 'Coach',
    focus: 'Agentic AI',
    quote:
      'The future belongs to people who can teach AI, correct it, and make it work.',
    summary:
      'Benz works on GenAI transformation, agentic AI readiness, AI Ops, data annotation, and real-world enterprise deployment.',
    cta: 'Read profile',
  },
  {
    id: 'subimal-bhattacharjee',
    startup: 'Policy and Defence',
    founder: 'Subimal Bhattacharjee',
    role: 'Author, Columnist & Policy adviser on tech and defence',
    imageSrc: '/people/subimal-bhattacharjee.jpeg',
    imageAlt: 'Portrait of Subimal Bhattacharjee',
    location: 'India',
    stage: 'Author',
    focus: 'Tech policy',
    quote:
      'Data annotation is not glamorous, but it is the soil in which modern AI models grow.',
    summary:
      'Subimal writes on technology, defence, and the strategic choices shaping AI governance, worker protections, and multilingual capacity.',
    cta: 'Read profile',
  },
  {
    id: 'krishna-potnis',
    startup: 'Fintech Growth',
    founder: 'Krishna Potnis',
    role:
      'Fintech Growth Advisor | Delivered payment systems processing daily 100MN+ txns | Tokenization | CloudPOS & SoftPOS | AI in Fintech | RegTech | Author, Connecting Fintech | Digital Banking | Responsible AI | MicroERP',
    imageSrc: '/people/krishna-potnis.jpeg',
    imageAlt: 'Portrait of Krishna Potnis',
    location: 'India',
    stage: 'Advisor',
    focus: 'Fintech AI',
    quote:
      'The visible failure happens at the prediction layer. The real failure starts at the truth layer.',
    summary:
      'Krishna advises on fintech growth, payment infrastructure, tokenization, CloudPOS, SoftPOS, RegTech, responsible AI, and digital banking.',
    cta: 'Read profile',
  },
  {
    id: 'vijay-raghava-ks',
    startup: 'Innerverse Tech',
    founder: 'Vijay Raghava K S',
    role: 'COO, Innerverse Tech',
    imageSrc: '/people/vijay-raghava-ks.jpeg',
    imageAlt: 'Portrait of Vijay Raghava K S',
    location: 'India',
    stage: 'Operator',
    focus: 'Data factories',
    quote:
      'The companies that lead AI will treat data preparation as a core discipline, not a cost center.',
    summary:
      'Vijay focuses on the disciplined data pipelines and domain-aware annotation workflows that make AI systems reliable.',
    cta: 'Read profile',
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

export const componentShowcaseArticle = getArticleById('signal-essay')

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
