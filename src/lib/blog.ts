export const BLOG_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "web-development", label: "Web Development" },
  { id: "seo", label: "SEO" },
  { id: "social-media", label: "Social Media Management" },
  { id: "branding", label: "Branding" },
  { id: "video", label: "Videography & Content Creation" },
  { id: "growth", label: "Business Growth" },
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORIES)[number]["id"];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategoryId, "all">;
  date: string;
  author: string;
  authorId: string;
  image: string;
  featured?: boolean;
  body: { heading?: string; text: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "create-connect-grow-quetta",
    title: "Create, Connect, Grow: a digital studio for businesses in Quetta",
    excerpt:
      "Most local businesses already know they need to be online. The harder part is joining the website, ads and content into one practical system.",
    category: "growth",
    date: "September 8, 2026",
    author: "Meerak Baloch",
    authorId: "meerak",
    image: "/blog/grow.jpg",
    featured: true,
    body: [
      {
        text: "Most local businesses in Quetta already know they need to be online. The harder part is knowing where to start. A Facebook page here, a WhatsApp status there, a website that looks unfinished, ads that spend money without a clear offer. The pieces exist, but they do not work as one system.",
      },
      {
        text: "Synapse Marketing Agency was built for that gap. We are a digital marketing and web development studio based in Quetta, working with local businesses, startups and growing SMEs across Pakistan. Our tagline is simple on purpose: Create. Connect. Grow.",
      },
      {
        heading: "Create",
        text: "Create is the foundation. It is the website that loads on a phone, the brand that looks considered, the landing page that gives a customer a reason to enquire. We design and build modern, responsive websites, from a focused five-page business site to Shopify and WooCommerce stores, with basic SEO, WhatsApp, and tracking in place from day one.",
      },
      {
        heading: "Connect",
        text: "Connect is how people find you. Meta Ads, social media management, SEO and content are not separate hobbies. They are the channels that take a clear offer to the right audience in Quetta and beyond. Advertising spend stays with Meta. Our job is the strategy, creative, targeting and weekly optimisation.",
      },
      {
        heading: "Grow",
        text: "Grow is what happens when the pieces talk to each other. A website that converts, ads that send the right traffic, social that stays consistent, and a simple way to measure what is working. We would rather ship a practical system than a slide deck of jargon.",
      },
      {
        heading: "Who we are",
        text: "Synapse is founder-led. Meerak Baloch is Founder and CEO. Soaima Tahir is Co-Founder and Senior Web Developer. The team covers performance marketing, growth, design, social media and AI automation, so a local business does not need five freelancers to get a joined-up result. We are a growing agency, and we say that plainly. We do not invent clients, awards or case-study numbers.",
      },
      {
        heading: "How to start",
        text: "Send a project inquiry, or message us on WhatsApp. Tell us what the business does, who you want to reach, and what you want the next 90 days to look like. We will come back with a clear next step, not a hard sell.",
      },
    ],
  },
  {
    slug: "digital-marketing-for-local-businesses-pakistan",
    title: "Digital marketing for local businesses in Pakistan, where to begin",
    excerpt:
      "You do not need every channel on day one. Start with a clear offer, a place to send people, and one channel you can keep consistent.",
    category: "digital-marketing",
    date: "September 5, 2026",
    author: "Tahir Majeed",
    authorId: "tahir",
    image: "/blog/digital.jpg",
    body: [
      {
        text: "A clinic in Quetta, a retailer in Karachi, a new brand in Lahore: the tools are the same, but the starting point is not. Digital marketing is not a pile of apps. It is a sequence: who you serve, what you offer, where people find you, and what they should do next.",
      },
      {
        heading: "Fix the offer before the ads",
        text: "If a stranger cannot tell what you sell and why they should enquire, paid traffic will only make the confusion louder. Write one sentence a customer would actually say. Then make sure the website, WhatsApp reply and social bio all say the same thing.",
      },
      {
        heading: "Pick one primary channel",
        text: "Most growing businesses in Pakistan get more from doing Meta well, or search well, than from being weak on five platforms. Choose the place your buyers already spend time. For many local services that is Instagram, Facebook and WhatsApp. For research-heavy offers, it is Google.",
      },
      {
        heading: "Measure something small",
        text: "Track enquiries, not vanity. A weekly count of WhatsApp chats, form fills or store visits tied to a campaign is enough to decide what to keep. Synapse helps businesses join these pieces without promising numbers we cannot stand behind.",
      },
    ],
  },
  {
    slug: "meta-ads-without-wasting-budget",
    title: "Meta Ads without wasting budget: a practical brief for SMEs",
    excerpt:
      "Ad spend stays with Meta. What you control is the offer, the creative, the audience and how quickly you stop what is not working.",
    category: "meta-ads",
    date: "August 28, 2026",
    author: "Muzammil Mehmood",
    authorId: "muzammil",
    image: "/blog/meta.jpg",
    body: [
      {
        text: "Meta Ads can send the right people to a WhatsApp number or a landing page. They can also spend a month of budget on a weak offer. The difference is rarely a secret targeting trick. It is preparation.",
      },
      {
        heading: "What belongs in the brief",
        text: "Who should see the ad, what they should do, what proof you can show, and what you will not claim. Pakistani businesses often skip the last point. Platform policies and customer trust both punish exaggeration.",
      },
      {
        heading: "Creative is the targeting",
        text: "A clear photo, a local context, and a sentence that sounds like the customer will outperform a generic template. Reels and stills should lead to the same next step: message, call or form.",
      },
      {
        heading: "Budget honesty",
        text: "Advertising spend is paid to Meta, not to the agency, unless a proposal says otherwise. Results depend on budget, competition, offer and the landing experience. We do not guarantee a number of leads or sales. We do commit to structured testing and weekly optimisation.",
      },
    ],
  },
  {
    slug: "why-your-business-needs-a-website-in-pakistan",
    title: "Why your business still needs a website in Pakistan",
    excerpt:
      "Instagram is a channel. A website is the place you own: offers, trust, WhatsApp, and a page Google can actually rank.",
    category: "web-development",
    date: "August 21, 2026",
    author: "Soaima Tahir",
    authorId: "soaima",
    image: "/blog/web.jpg",
    body: [
      {
        text: "A strong Instagram presence is useful. It is not a substitute for a site that loads on a phone, states what you do, and lets someone enquire without hunting through highlights.",
      },
      {
        heading: "What a first site should include",
        text: "Who you are, what you offer, where you operate, proof you can show honestly, WhatsApp, a contact form, and basic SEO titles. Five clear pages beat a 20-page brochure that never ships.",
      },
      {
        heading: "Mobile is the real desktop",
        text: "Most customers in Quetta and across Pakistan will open you on a phone. Slow images, tiny type and forms that fail on Chrome are not a design preference. They are lost enquiries.",
      },
      {
        heading: "Build for the next 12 months",
        text: "Leave room for a blog, a service page, or a store later. Domain and hosting should be in the client’s name. Synapse builds the site; the business should own the keys.",
      },
    ],
  },
  {
    slug: "seo-for-quetta-and-pakistan-search",
    title: "SEO for Quetta and Pakistan: be findable for the searches you can win",
    excerpt:
      "National keywords are crowded. Local intent, service pages and a site that Google can read are a more honest starting point.",
    category: "seo",
    date: "August 14, 2026",
    author: "Tahir Majeed",
    authorId: "tahir",
    image: "/blog/seo.jpg",
    body: [
      {
        text: "Search engine optimisation is not a ranking you buy. It is making sure the pages you already need, service, city, contact, answer the questions people type.",
      },
      {
        heading: "Local before national",
        text: "A clinic, workshop or retailer in Quetta should first be findable for the city and the service. That means Google Business Profile, consistent NAP details, and pages that name the area without stuffing.",
      },
      {
        heading: "Content that is useful",
        text: "A blog helps when it answers real questions: pricing ranges, process, what to prepare before a shoot, how ads and a website work together. Thin posts written only for keywords waste the crawl.",
      },
      {
        heading: "Technical basics",
        text: "Titles, descriptions, fast mobile pages, HTTPS, and a sitemap. SEO work at Synapse starts there. We do not sell guaranteed first-page rankings.",
      },
    ],
  },
  {
    slug: "social-media-management-that-stays-consistent",
    title: "Social media management that a small team can actually keep",
    excerpt:
      "Consistency beats volume. A weekly rhythm, a clear visual system and replies that sound human will do more than 30 random posts.",
    category: "social-media",
    date: "August 7, 2026",
    author: "Muqaddas Saba",
    authorId: "muqaddas",
    image: "/blog/social.jpg",
    body: [
      {
        text: "Many Pakistani SMEs start posting with energy and stop in week three. Audiences notice the silence more than they notice a missed aesthetic.",
      },
      {
        heading: "A simple operating rhythm",
        text: "Decide the platforms you will keep. Plan a week of posts that support one offer. Reply to comments and DMs on a schedule. Report what led to enquiries, not only likes.",
      },
      {
        heading: "Look like one brand",
        text: "Colour, type, photography style and the way you write captions should match the website. That is brand identity doing its job on a smaller canvas.",
      },
      {
        heading: "WhatsApp is part of social",
        text: "If the bio points to WhatsApp, someone must answer. A delayed reply is a lost walk-in, whether you call it customer service or social media.",
      },
    ],
  },
  {
    slug: "brand-identity-before-you-run-ads",
    title: "Brand identity before you run ads",
    excerpt:
      "A logo is not the whole brand. Name, colour, type and a short story make every ad and every reel cheaper to produce later.",
    category: "branding",
    date: "July 31, 2026",
    author: "Muqaddas Saba",
    authorId: "muqaddas",
    image: "/blog/brand.jpg",
    body: [
      {
        text: "Paid ads amplify whatever you already are. If the visual system is unfinished, you pay to show that unfinished look to more people.",
      },
      {
        heading: "What to lock early",
        text: "A distinctive mark, a small colour set, type that holds in Urdu and English, and three sentences that explain who you serve. That is enough to brief a website and a content calendar.",
      },
      {
        heading: "Local does not mean generic",
        text: "Quetta and Pakistan have strong visual cultures. Using them with care is not the same as downloading a template with a minaret watermark. Identity should feel considered, not loud for the sake of it.",
      },
      {
        heading: "Then build the system",
        text: "Once the identity is set, ads, reels and packaging can reuse it. That is how a growing brand stays recognisable without redesigning every Friday.",
      },
    ],
  },
  {
    slug: "videography-and-reels-for-local-brands",
    title: "Videography and reels for local brands, plan the shoot before the camera",
    excerpt:
      "A useful reel starts with location, offer and a delivery format. Extra shoots and raw files are not automatic extras.",
    category: "video",
    date: "July 24, 2026",
    author: "Meerak Baloch",
    authorId: "meerak",
    image: "/blog/video.jpg",
    body: [
      {
        text: "Short video is how many customers in Pakistan now judge a business in ten seconds. That does not mean every brand needs a cinematic campaign. It means the shoot should match the offer.",
      },
      {
        heading: "Agree the scope in writing",
        text: "Number of reels, duration, location, date, revisions and delivery format. If a second location or a reshoot appears, it should be priced, not assumed.",
      },
      {
        heading: "The client’s job on the day",
        text: "Access, products, people who can speak on camera if needed, and a clear idea of what should happen in the frame. Delays on set delay the edit.",
      },
      {
        heading: "Editing and rights",
        text: "Revisions follow the package. Raw footage and project files are included only if the agreement says so. Final films are for the client’s business use once payment is complete, as set out in our terms.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, category: BlogPost["category"], limit = 3) {
  const same = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === category);
  const rest = BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== category);
  return [...same, ...rest].slice(0, limit);
}

export function categoryLabel(id: string) {
  return BLOG_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
