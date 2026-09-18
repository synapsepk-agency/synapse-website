import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ur";

const STORAGE_KEY = "synapse-lang";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About Us",
  "nav.services": "Services",
  "nav.pricing": "Pricing",
  "nav.process": "Process",
  "nav.work": "Portfolio",
  "nav.team": "Our Team",
  "nav.blog": "Blogs",
  "nav.contact": "Free Consultation",
  "nav.career": "Career",
  "nav.letsTalk": "Let's Talk",
  "nav.inbox": "Inbox",
  "nav.menu": "Menu",
  "nav.close": "Close",

  "hero.kicker": "Digital Marketing & Web Development Agency in Quetta, Balochistan",
  "hero.title": "Digital Marketing Agency Balochistan",
  "hero.sub": "Create. Connect. Grow, digital systems for local businesses.",
  "hero.body":
    "Synapse helps organizations design, build and grow digital presence that performs. From websites and brand identity to Meta Ads, SEO and social media, we combine marketing, technology and strategy into one practical system.",
  "hero.cta": "Free Consultation",
  "hero.secondary": "Explore Services",
  "hero.scroll": "Scroll",
  "hero.f1": "Digital marketing + web development",
  "hero.f2": "Founder-led team based in Quetta",
  "hero.f3": "Meta Ads, SEO, social, brand and video",
  "hero.f4": "Transparent starting-from pricing",
  "hero.f5": "Built for local businesses and startups",
  "hero.f6": "Serving Quetta and across Balochistan",
  "hero.f7": "English and Urdu support",
  "hero.f8": "WhatsApp-first communication",
  "hero.trustScore": "CREATE.",
  "hero.trustLabel": "Connect. Grow.",
  "hero.callScore": "24/7",
  "hero.callLabel": "Reach us on WhatsApp",

  "marquee.strategy": "STRATEGY",
  "marquee.creativity": "CREATIVITY",
  "marquee.technology": "TECHNOLOGY",
  "marquee.performance": "PERFORMANCE",
  "marquee.growth": "GROWTH",

  "stats.services": "Core Services",
  "stats.strategy": "Connected Strategy",
  "stats.approach": "Digital Growth Approach",
  "stats.presence": "Digital Presence",

  "about.kicker": "About Synapse",
  "about.title": "Your digital growth partner",
  "about.body":
    "Synapse Marketing Agency is a modern digital agency focused on helping businesses build stronger digital foundations, reach the right audiences and create meaningful growth. We bring together marketing, technology, creativity and strategy around real business objectives.",
  "about.cta": "Discover Synapse",
  "about.missionTitle": "Mission",
  "about.mission":
    "To help local businesses use digital platforms more effectively through practical marketing strategy, professional websites, social media and performance-focused advertising.",
  "about.visionTitle": "Vision",
  "about.vision":
    "To become a trusted digital growth partner by delivering transparent, modern and practical digital solutions.",
  "about.pageTitle": "About Synapse",
  "about.pageLead":
    "We focus on local businesses, starting in Quetta, and combine marketing, websites, social media and growth strategy under one agency.",
  "about.whyTitle": "Why Choose Synapse",
  "about.storyTitle": "Our Story",
  "about.storyBody":
    "Synapse started in Quetta as a founder-led digital agency. We build websites, run marketing and connect the work so local businesses can create a stronger presence, reach customers and grow without noise or fake claims.",
  "about.create": "CREATE",
  "about.createBody": "Modern websites, digital experiences and brand identities with a clear purpose.",
  "about.connect": "CONNECT",
  "about.connectBody": "Strategic marketing that puts the right message in front of the right audience.",
  "about.grow": "GROW",
  "about.growBody": "A connected system that turns presence into enquiries, customers and momentum.",

  "services.kicker": "Service",
  "services.title": "Our Services",
  "apart.kicker": "Why Synapse",
  "apart.title": "What Sets Synapse Apart",
  "apart.body":
    "Synapse works at the intersection of marketing, technology and creativity. We help local businesses solve real digital problems with clear process and honest delivery.",
  "partner.title": "Looking for a Reliable Digital Partner?",
  "partner.body": "Work with a team that understands local businesses, practical marketing and long-term growth.",
  "work.realTitle": "Real Projects. Real Foundations.",
  "work.realBody":
    "We are a growing agency. Portfolio pieces are labelled Concept Project until live client work is published.",
  "services.sub": "Everything you need to create, connect and grow online.",
  "services.starting": "Starting from",
  "services.getStarted": "Get Started",
  "services.book": "Book Consultation",
  "services.viewAll": "View all services",
  "services.adSpendNote": "Advertising budget is separate.",
  "services.hostingNote": "Hosting and domain may be charged separately.",
  "services.pageLead":
    "Six connected disciplines, plus video production, designed to work as one system, not as isolated tasks.",

  "svc.meta.name": "Meta Ads",
  "svc.meta.desc":
    "Performance-focused Meta advertising designed to reach the right audience and generate qualified leads or sales.",
  "svc.meta.f1": "Campaign setup",
  "svc.meta.f2": "Audience research",
  "svc.meta.f3": "Ad strategy",
  "svc.meta.f4": "Monitoring",
  "svc.meta.f5": "Optimization",
  "svc.meta.price": "PKR 10,000 / month",
  "svc.meta.long":
    "We plan, build and manage Facebook and Instagram campaigns around a clear objective, leads, messages, traffic or sales, then refine targeting and creative from the data. Advertising spend is paid directly to Meta and is never bundled into the management fee.",

  "svc.web.name": "Web Development",
  "svc.web.desc":
    "Modern responsive websites designed to create a professional digital presence and convert visitors into customers.",
  "svc.web.f1": "Responsive design",
  "svc.web.f2": "Modern UI",
  "svc.web.f3": "Mobile optimization",
  "svc.web.f4": "Basic SEO structure",
  "svc.web.f5": "Contact forms",
  "svc.web.price": "From PKR 30,000",
  "svc.web.long":
    "Custom business websites, landing pages and catalogues, designed to load quickly, read clearly on a phone, and give customers a reason to enquire. Final pricing depends on pages, features and content. Hosting and domain are quoted separately unless included in writing.",

  "svc.social.name": "Social Media Management",
  "svc.social.desc":
    "Strategic social media management designed to build consistency, engagement and a stronger brand presence.",
  "svc.social.f1": "Content planning",
  "svc.social.f2": "Social strategy",
  "svc.social.f3": "Creative direction",
  "svc.social.f4": "Posting management",
  "svc.social.f5": "Performance monitoring",
  "svc.social.price": "PKR 15,000 / month",
  "svc.social.long":
    "A monthly rhythm of planning, creative direction and publishing so the business shows up consistently, with a voice, not just a feed. We focus on platforms that actually matter for the audience, not on posting everywhere for the sake of it.",

  "svc.seo.name": "SEO",
  "svc.seo.desc":
    "SEO strategies designed to improve online visibility, organic traffic and search presence.",
  "svc.seo.f1": "Keyword research",
  "svc.seo.f2": "On-page SEO",
  "svc.seo.f3": "Technical SEO basics",
  "svc.seo.f4": "Content recommendations",
  "svc.seo.f5": "Performance monitoring",
  "svc.seo.price": "PKR 20,000 / month",
  "svc.seo.long":
    "Local and on-page search work so people looking for nearby services can actually find the business. We start with the fundamentals, structure, titles, Google Business, content, and build from there. SEO is a compounding process, not a one-week trick.",

  "svc.brand.name": "Brand Identity",
  "svc.brand.desc":
    "Professional visual identity systems designed to make businesses recognizable, consistent and trustworthy.",
  "svc.brand.f1": "Brand direction",
  "svc.brand.f2": "Logo development",
  "svc.brand.f3": "Color palette",
  "svc.brand.f4": "Typography",
  "svc.brand.f5": "Brand guidelines",
  "svc.brand.price": "PKR 15,000",
  "svc.brand.long":
    "A clear visual direction so every post, page and ad looks like it belongs to the same business. We define logo usage, color, type and a short set of guidelines the team can actually follow.",

  "svc.consult.name": "Business Growth Consultancy",
  "svc.consult.desc":
    "Strategic consulting designed to identify digital opportunities and improve customer acquisition.",
  "svc.consult.f1": "Business analysis",
  "svc.consult.f2": "Digital strategy",
  "svc.consult.f3": "Customer acquisition",
  "svc.consult.f4": "Growth opportunities",
  "svc.consult.f5": "Action plan",
  "svc.consult.price": "PKR 10,000 / session",
  "svc.consult.long":
    "A focused working session to map how the business currently gets customers, where digital can help, and what to do next. You leave with a written action plan, not a slide deck of jargon.",

  "svc.video.name": "Video Production & Reels",
  "svc.video.desc":
    "Speed-ramp, production and cinematography reels, shot, edited and delivered for social platforms.",
  "svc.video.f1": "Shooting",
  "svc.video.f2": "Editing",
  "svc.video.f3": "Scripting on selected packages",
  "svc.video.f4": "Lighting & mic on selected packages",
  "svc.video.f5": "Final delivery",
  "svc.video.price": "PKR 1,999 / reel",
  "svc.video.long":
    "Short-form video built for the platforms your customers already scroll. Packages range from fast speed-ramp edits to fully produced cinematic pieces, with monthly retainers if you need a consistent output.",

  "pricing.kicker": "Pricing",
  "pricing.title": "Simple pricing, Serious growth",
  "pricing.sub":
    "Choose a starting point or talk to us about a custom solution for your business.",
  "pricing.note":
    "Final pricing depends on project scope, requirements and deliverables. Advertising spend, hosting, domain and third-party platform fees are separate unless specifically included.",
  "pricing.customCta": "Request Custom Proposal",
  "pricing.videoTitle": "Video production & reels",
  "pricing.digitalTitle": "Digital services",
  "pricing.mostPopular": "Most Popular",
  "pricing.perReel": " / reel",
  "pricing.perMonth": " / month",
  "pricing.week": " / week",
  "pricing.monthlyOutput": "Monthly output",
  "pricing.combineTitle": "Need more than one service?",
  "pricing.combineBody":
    "Combine the services your business needs into a customized digital growth solution.",
  "pricing.starter": "Starter",
  "pricing.starterBody": "For businesses building their digital foundation, typically a website and a clear brand direction.",
  "pricing.growth": "Growth",
  "pricing.growthBody":
    "For businesses ready to increase visibility and customer acquisition, website, social and Meta ads working together.",
  "pricing.scale": "Scale",
  "pricing.scaleBody":
    "For businesses ready for a complete digital growth system, presence, acquisition, search and ongoing strategy.",
  "pricing.build": "Build My Package",
  "pricing.reel": "Reel",
  "pricing.month": "Month",
  "pricing.webTitle": "Web development",
  "pricing.web.basic": "Basic",
  "pricing.web.growth": "Growth",
  "pricing.web.premium": "Premium",
  "pricing.web.note": "Hosting and domain are quoted separately unless included in writing.",
  "pricing.web.cta": "Discuss Your Website",
  "pricing.metaTitle": "Meta Ads management",
  "pricing.metaNote": "Ad spend is not included. Client pays Meta separately. Synapse charges a management fee.",
  "pricing.socialTitle": "Social media management",
  "pricing.ads.cta": "Discuss Your Ads",
  "pricing.social.cta": "Discuss Your Social",

  "why.kicker": "Why Synapse",
  "why.title": "Why Synapse?",
  "why.s1": "Strategy first",
  "why.s1b": "We understand the business before deciding what to build or promote.",
  "why.s2": "Creative + performance",
  "why.s2b": "Strong creative work combined with data-driven decisions.",
  "why.s3": "One connected system",
  "why.s3b": "Website, marketing, social media and SEO should work together.",
  "why.s4": "Transparent",
  "why.s4b": "Clear communication, clear scope and clear deliverables.",
  "why.s5": "Growth focused",
  "why.s5b": "Every activity should contribute to visibility, leads, customers or growth.",

  "process.kicker": "How we work",
  "process.title": "How we work",
  "process.sub": "A calm, repeatable path from first conversation to ongoing growth.",
  "process.1": "Discover",
  "process.1b": "Understand the business, audience, goals and current digital presence.",
  "process.2": "Strategize",
  "process.2b": "Build the right marketing, web or brand strategy.",
  "process.3": "Execute",
  "process.3b": "Create, launch and manage the required digital work.",
  "process.4": "Grow",
  "process.4b": "Review performance, improve execution and identify growth opportunities.",

  "industries.kicker": "Industries",
  "industries.title": "Built for businesses ready to grow",
  "industries.sub": "We work with local businesses across categories, no invented case studies, just a clear fit.",
  "ind.retail": "Retail & Fashion",
  "ind.food": "Restaurants & Food",
  "ind.estate": "Real Estate",
  "ind.health": "Healthcare",
  "ind.edu": "Education",
  "ind.pro": "Professional Services",
  "ind.local": "Local Businesses",
  "ind.startups": "Startups & SMEs",

  "work.kicker": "Portfolio",
  "work.title": "Selected work",
  "work.sub":
    "Synapse is a growing agency. These are clearly labelled concept projects, not client results, and will be replaced with real work as it is completed.",
  "work.concept": "Concept Project",
  "work.coming": "Coming soon",
  "work.c1": "Hospitality website concept",
  "work.c1b": "A conversion-minded restaurant site: menu, location, reservation path.",
  "work.c2": "Clinic landing page concept",
  "work.c2b": "A focused page for appointment enquiries, built for local search and ads.",
  "work.c3": "Social launch kit concept",
  "work.c3b": "A month of branded frames, stories and offer posts for a retail launch.",
  "work.c4": "Identity system concept",
  "work.c4b": "Logo, type, color and a short guideline set a team can actually use.",
  "work.c5": "Lead campaign concept",
  "work.c5b": "Ad angles, landing structure and a follow-up path for service businesses.",

  "team.kicker": "Our Team",
  "team.title": "Meet Our Team",
  "team.pageTitle": "Meet Our Team",
  "team.lead":
    "Behind every strategy, campaign and digital experience is a team combining creativity, technology and business thinking.",
  "team.view": "Meet everyone",
  "team.intro":
    "A small founder-led team in Quetta. Strategy, websites, ads, design and automation sit together, so the work stays practical and honest.",
  "team.meerak.role": "Founder & CEO",
  "team.meerak.bio": "Business strategy, client acquisition, operations and brand growth.",
  "team.soaima.role": "Co-Founder & Senior Web Developer",
  "team.soaima.bio":
    "Custom business websites, responsive design, landing pages, catalogues and ongoing maintenance.",
  "team.muzammil.role": "Performance Marketing Specialist",
  "team.muzammil.bio":
    "Meta Ads, campaign strategy, audience targeting, lead generation, optimization and reporting.",
  "team.tahir.role": "Growth Marketing Specialist",
  "team.tahir.bio":
    "Meta advertising, sales funnel strategy, conversion optimization, ad copy and retargeting.",
  "team.muqaddas.role": "Creative Designer & Social Media Specialist",
  "team.muqaddas.bio":
    "Graphic design, brand identity, social media management, content planning and visual systems.",
  "team.shahzor.role": "AI Automation & Chatbot Expert",
  "team.shahzor.bio":
    "AI automation, chatbot development, workflow automation and conversational customer support.",

  "stories.title": "Client stories",
  "stories.body": "Real client success stories will appear here as we grow.",

  "faq.kicker": "FAQs",
  "faq.title": "Questions, answered",
  "faq.q1": "What services does Synapse provide?",
  "faq.a1":
    "Meta Ads, web development, social media management, SEO, brand identity, business growth consultancy, and video production & reels. Services can be taken individually or combined.",
  "faq.q2": "How much does a website cost?",
  "faq.a2":
    "Web development starts from PKR 35,000. Final pricing depends on pages, features and content. Hosting and domain may be charged separately.",
  "faq.q3": "How much does Meta Ads management cost?",
  "faq.a3":
    "Meta Ads management starts from PKR 15,000 per month. The advertising budget is paid to Meta separately and is never included in the management fee unless we say so in writing.",
  "faq.q4": "Is advertising spend included?",
  "faq.a4": "No. Advertising spend is paid directly to the platform (for example Meta) and is separate from Synapse’s fee.",
  "faq.q5": "Do you provide hosting and domain?",
  "faq.a5":
    "We can arrange or advise on hosting and domain. They are quoted separately unless specifically included in a proposal.",
  "faq.q6": "How long does a website take?",
  "faq.a6":
    "A typical brochure or business site takes two to four weeks once content is ready. Larger catalogues or custom features take longer, we confirm a timeline after the discover call.",
  "faq.q7": "Can I combine multiple services?",
  "faq.a7": "Yes. Most clients do. We will propose a single scope and a single monthly or project fee rather than stacking disconnected work.",
  "faq.q8": "Do you work with businesses outside Quetta?",
  "faq.a8":
    "Yes. Our focus began with local businesses in Quetta, and we work with businesses across Pakistan.",
  "faq.q9": "How do I start a project?",
  "faq.a9":
    "Send a project inquiry, chat on WhatsApp, or book a free introductory call. We learn about the business first, then propose a clear next step.",

  "cta.title": "Ready to create, connect & grow?",
  "cta.body":
    "Let’s turn your digital presence into something your customers remember and your business can grow from.",
  "cta.primary": "Start a Project",
  "cta.secondary": "Book a Consultation",

  "blog.kicker": "Journal",
  "blog.title": "Insights",
  "blog.sub": "Practical writing on digital marketing, websites and growth for local businesses.",
  "blog.soon": "Insights coming soon",
  "blog.soonBody":
    "We will publish original notes here. No filler, no invented case studies. Categories are ready so the first pieces have a home.",
  "blog.a1.title": "Create, Connect, Grow: a digital studio for businesses in Quetta",
  "blog.a1.meta": "Synapse Marketing Agency, Quetta, Pakistan",
  "blog.all": "All",
  "blog.search": "Search articles",
  "blog.empty": "No articles match that filter yet.",
  "blog.readMore": "Read More",
  "blog.related": "Related posts",
  "blog.back": "All articles",
  "blog.cat.dm": "Digital Marketing",
  "blog.cat.meta": "Meta Ads",
  "blog.cat.seo": "SEO",
  "blog.cat.web": "Web Development",
  "blog.cat.social": "Social Media",
  "blog.cat.growth": "Business Growth",

  "contact.kicker": "Contact",
  "contact.title": "Let’s build something that grows.",
  "contact.sub": "Tell us about your business, your goals and what you want to achieve.",
  "contact.name": "Full name",
  "contact.email": "Email",
  "contact.phone": "WhatsApp number",
  "contact.business": "Business name",
  "contact.service": "Service required",
  "contact.budget": "Budget",
  "contact.details": "Project details",
  "contact.send": "Send Project Inquiry",
  "contact.whatsapp": "Chat on WhatsApp",
  "contact.or": "or",
  "contact.success": "Thank you, your inquiry has been received.",
  "contact.successNote": "Our team will review it and get back to you on WhatsApp and email shortly.",
  "contact.successNew": "Add new inquiry",
  "contact.successBack": "Back",
  "contact.successNote": "Our team will review it and get back to you on WhatsApp and email shortly.",
  "contact.successNew": "Add new inquiry",
  "contact.successBack": "Back",
  "contact.successWa": "Continue on WhatsApp",
  "contact.error": "Something went wrong. Please try WhatsApp or email instead.",
  "contact.sending": "Sending…",
  "contact.selectService": "Select a service",
  "contact.linktree": "linktr.ee/synapsemarketingagency",
  "contact.requiredNote": "Name, email, WhatsApp, business name and service are required. Budget and details are optional.",
  "contact.inboxHint": "Every inquiry is emailed to synapseagency.pk@gmail.com as a visitor list, and saved in the team inbox.",
  "contact.destination":
    "Your name, email and WhatsApp are sent to Synapse. We will contact you for the details.",
  "contact.successMail": "Email copy",

  "opt.meta-ads": "Meta Ads",
  "opt.web-development": "Web Development",
  "opt.social-media": "Social Media Management",
  "opt.seo": "SEO",
  "opt.brand-identity": "Brand Identity",
  "opt.consultancy": "Business Growth Consultancy",
  "opt.video": "Video Production",
  "opt.multiple": "Multiple services",
  "opt.under-25": "Under PKR 25,000",
  "opt.25-50": "PKR 25,000–50,000",
  "opt.50-100": "PKR 50,000–100,000",
  "opt.100-200": "PKR 100,000–200,000",
  "opt.200-plus": "PKR 200,000+",
  "opt.not-sure": "Not sure",

  "wa.chat": "Chat with us",
  "bot.title": "Synapse Assist",
  "bot.chat": "Chat with AI",
  "bot.sub": "Trained on Synapse services, pricing and contact",
  "bot.hello": "Hello, I am Synapse Assist. How can I help today?",
  "bot.placeholder": "English, Urdu or Roman Urdu…",
  "bot.send": "Send",
  "bot.new": "New chat",
  "footer.company": "Company",
  "footer.services": "Services",
  "footer.follow": "Follow Synapse",
  "footer.contact": "Contact",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms & Conditions",
  "footer.rights": "© 2026 Synapse Marketing Agency. All rights reserved.",
  "footer.tagline": "CREATE CONNECT GROW",

  "legal.privacyTitle": "Privacy Policy",
  "legal.privacyLead": "How Synapse handles the information you share with us.",
  "legal.termsTitle": "Terms & Conditions",
  "legal.termsLead": "The simple terms that cover work with Synapse Marketing Agency.",

  "inbox.title": "Admin inbox",
  "inbox.empty": "No inquiries yet.",
  "inbox.signIn": "Sign in to read inquiries.",
  "inbox.when": "Received",
  "inbox.unlockBody": "Admin only. Enter your username and password to read client inquiries.",
  "inbox.code": "Inbox code",
  "inbox.user": "Username",
  "inbox.pass": "Password",
  "inbox.open": "Open inbox",
  "inbox.badCode": "Username or password is not correct.",
  "inbox.lead": "Every website inquiry is saved here, sent to WhatsApp, and emailed to synapseagency.pk@gmail.com.",
  "inbox.forward": "Forward to Gmail",
  "inbox.whatsapp": "Open on WhatsApp",
  "inbox.signOut": "Sign out",
  "inbox.copy": "Copy",
  "inbox.copyAll": "Copy all",
  "inbox.excel": "Download Excel",
  "inbox.copied": "Copied",
  "inbox.delete": "Delete",
  "inbox.copySheet": "Copy sheet",
  "inbox.clear": "Empty inbox",

  "login.title": "Staff sign in",
  "login.body": "Sign in to open the inquiry inbox.",
  "login.disabled": "Sign-in is currently disabled.",

  "career.kicker": "Career",
  "career.title": "Work with Synapse",
  "career.sub": "A growing team in Quetta, building digital systems for local businesses.",
  "career.body":
    "Synapse is a founder-led agency. We do not list fake openings. When a role is open, it will appear here with a clear description.",
  "career.open": "There are no open roles listed right now. If you want to introduce yourself, email a short note and your work.",
  "career.email": "Email your introduction",

  "notfound.title": "Page not found",
  "notfound.body": "That page does not exist. Head home, or talk to us.",
  "notfound.home": "Back home",
};

const ur: Dict = {
  "nav.home": "ہوم",
  "nav.about": "ہمارے بارے میں",
  "nav.services": "خدمات",
  "nav.pricing": "قیمتیں",
  "nav.process": "طریقۂ کار",
  "nav.work": "پورٹ فولیو",
  "nav.team": "ہماری ٹیم",
  "nav.blog": "بلاگز",
  "nav.contact": "مفت مشاورت",
  "nav.career": "کیریئر",
  "nav.letsTalk": "بات کریں",
  "nav.inbox": "ان باکس",
  "nav.menu": "مینو",
  "nav.close": "بند کریں",

  "hero.kicker": "کوئٹہ، بلوچستان میں ڈیجیٹل مارکیٹنگ اور ویب ڈویلپمنٹ ایجنسی",
  "hero.title": "ڈیجیٹل مارکیٹنگ ایجنسی بلوچستان",
  "hero.sub": "تخلیق کریں۔ رابطہ قائم کریں۔ ترقی کریں۔",
  "hero.body":
    "سینیپس کاروبار کو ڈیجیٹل موجودگی بنانے، گاہکوں سے جڑنے اور ترقی کرنے میں مدد دیتا ہے۔ ویب سائٹس، برانڈ، میٹا اشتہارات، ایس ای او اور سوشل میڈیا ایک عملی نظام میں۔",
  "hero.cta": "مفت مشاورت",
  "hero.secondary": "خدمات دیکھیں",
  "hero.scroll": "اسکرول",
  "hero.f1": "ڈیجیٹل مارکیٹنگ + ویب ڈویلپمنٹ",
  "hero.f2": "بانی کی قیادت میں ٹیم، کوئٹہ",
  "hero.f3": "میٹا اشتہارات، ایس ای او، سوشل، برانڈ اور ویڈیو",
  "hero.f4": "شفاف ابتدائی قیمتیں",
  "hero.f5": "مقامی کاروبار اور سٹارٹ اپس کے لیے",
  "hero.f6": "کوئٹہ اور بلوچستان بھر میں",
  "hero.f7": "انگریزی اور اردو",
  "hero.f8": "واٹس ایپ پر بات",
  "hero.trustScore": "تخلیق۔",
  "hero.trustLabel": "رابطہ۔ ترقی۔",
  "hero.callScore": "24/7",
  "hero.callLabel": "واٹس ایپ پر رابطہ",

  "marquee.strategy": "حکمت عملی",
  "marquee.creativity": "تخلیقیت",
  "marquee.technology": "ٹیکنالوجی",
  "marquee.performance": "کارکردگی",
  "marquee.growth": "ترقی",

  "stats.services": "بنیادی خدمات",
  "stats.strategy": "جڑی ہوئی حکمت عملی",
  "stats.approach": "ڈیجیٹل ترقی کا طریقہ",
  "stats.presence": "ڈیجیٹل موجودگی",

  "about.kicker": "سینیپس کے بارے میں",
  "about.title": "آپ کا ڈیجیٹل گروتھ پارٹنر",
  "about.body":
    "سینیپس مارکیٹنگ ایجنسی ایک جدید ڈیجیٹل ایجنسی ہے جو کاروبار کو مضبوط ڈیجیٹل بنیادیں بنانے، درست سامعین تک پہنچنے اور معنی خیز ترقی حاصل کرنے میں مدد دیتی ہے۔ ہم مارکیٹنگ، ٹیکنالوجی، تخلیقیت اور حکمت عملی کو حقیقی کاروباری مقاصد کے گرد جوڑتے ہیں۔",
  "about.cta": "سینیپس جانیں",
  "about.missionTitle": "مشن",
  "about.mission":
    "مقامی کاروبار کو عملی مارکیٹنگ حکمت عملی، پیشہ ورانہ ویب سائٹس، سوشل میڈیا اور پرفارمنس اشتہارات کے ذریعے ڈیجیٹل پلیٹ فارمز بہتر استعمال کرنے میں مدد دینا۔",
  "about.visionTitle": "وژن",
  "about.vision":
    "شفاف، جدید اور عملی ڈیجیٹل حل دے کر ایک قابلِ اعتماد ڈیجیٹل گروتھ پارٹنر بننا۔",
  "about.pageTitle": "سینیپس کے بارے میں",
  "about.pageLead":
    "ہم مقامی کاروبار پر توجہ رکھتے ہیں, کوئٹہ سے آغاز, اور مارکیٹنگ، ویب سائٹس، سوشل میڈیا اور گروتھ حکمت عملی کو ایک ایجنسی میں جمع کرتے ہیں۔",
  "about.whyTitle": "سینیپس کیوں منتخب کریں",
  "about.storyTitle": "ہماری کہانی",
  "about.storyBody":
    "سینیپس کوئٹہ میں بانی کی قیادت میں ڈیجیٹل ایجنسی کے طور پر شروع ہوئی۔ ہم ویب سائٹس بناتے ہیں، مارکیٹنگ چلاتے ہیں اور کام کو جوڑتے ہیں تاکہ مقامی کاروبار بغیر شور اور فرضی دعووں کے بڑھ سکیں۔",
  "about.create": "تخلیق",
  "about.createBody": "واضح مقصد کے ساتھ جدید ویب سائٹس، ڈیجیٹل تجربات اور برانڈ شناخت۔",
  "about.connect": "رابطہ",
  "about.connectBody": "ایسی حکمت عملی جو درست پیغام درست سامعین تک پہنچائے۔",
  "about.grow": "ترقی",
  "about.growBody": "ایک جڑا ہوا نظام جو موجودگی کو انکوائری، گاہک اور رفتار میں بدل دے۔",

  "services.kicker": "خدمات",
  "services.title": "ہماری خدمات",
  "apart.kicker": "سینیپس کیوں",
  "apart.title": "سینیپس کو کیا ممتاز بناتا ہے",
  "apart.body":
    "سینیپس مارکیٹنگ، ٹیکنالوجی اور تخلیق کے سنگم پر کام کرتا ہے۔ ہم مقامی کاروبار کے حقیقی ڈیجیٹل مسائل صاف عمل اور ایماندار ڈیلیوری سے حل کرتے ہیں۔",
  "partner.title": "قابلِ اعتماد ڈیجیٹل پارٹنر تلاش ہے؟",
  "partner.body": "ایسی ٹیم کے ساتھ کام کریں جو مقامی کاروبار، عملی مارکیٹنگ اور طویل المدتی ترقی سمجھتی ہے۔",
  "work.realTitle": "حقیقی بنیادیں۔ واضح لیبل۔",
  "work.realBody":
    "ہم ایک بڑھتی ہوئی ایجنسی ہیں۔ پورٹ فولیو آئٹمز Concept Project کے طور پر لیبل ہیں جب تک لائیو کلائنٹ کام شائع نہ ہو۔",
  "services.sub": "آن لائن تخلیق، رابطہ اور ترقی کے لیے جو کچھ درکار ہے۔",
  "services.starting": "شروعات",
  "services.getStarted": "شروع کریں",
  "services.book": "مشاورت بک کریں",
  "services.viewAll": "تمام خدمات",
  "services.adSpendNote": "اشتہاری بجٹ الگ ہے۔",
  "services.hostingNote": "ہوسٹنگ اور ڈومین الگ سے لگ سکتے ہیں۔",
  "services.pageLead":
    "چھ جڑی ہوئی مہارتیں, اور ویڈیو پروڈکشن, جو الگ الگ کام نہیں بلکہ ایک نظام کی طرح چلتی ہیں۔",

  "svc.meta.name": "میٹا اشتہارات",
  "svc.meta.desc":
    "پرفارمنس پر مبنی میٹا اشتہارات جو درست سامعین تک پہنچیں اور اہل لیڈز یا فروخت پیدا کریں۔",
  "svc.meta.f1": "کیمپین سیٹ اپ",
  "svc.meta.f2": "سامعین کی تحقیق",
  "svc.meta.f3": "اشتہاری حکمت عملی",
  "svc.meta.f4": "نگرانی",
  "svc.meta.f5": "بہتری",
  "svc.meta.price": "ماہانہ PKR 10,000 سے",
  "svc.meta.long":
    "ہم فیس بک اور انسٹاگرام کیمپینز کو واضح مقصد, لیڈز، میسجز، ٹریفک یا سیلز, کے گرد بناتے اور چلاتے ہیں، پھر ڈیٹا سے ٹارگٹنگ اور تخلیق بہتر کرتے ہیں۔ اشتہاری خرچ میٹا کو براہِ راست ادا ہوتا ہے اور مینجمنٹ فیس میں شامل نہیں۔",

  "svc.web.name": "ویب ڈویلپمنٹ",
  "svc.web.desc":
    "جدید ریسپانسو ویب سائٹس جو پیشہ ورانہ ڈیجیٹل موجودگی بنائیں اور وزٹرز کو گاہک بنائیں۔",
  "svc.web.f1": "ریسپانسو ڈیزائن",
  "svc.web.f2": "جدید یوزر انٹرفیس",
  "svc.web.f3": "موبائل بہتری",
  "svc.web.f4": "بنیادی ایس ای او ڈھانچہ",
  "svc.web.f5": "رابطہ فارم",
  "svc.web.price": "PKR 30,000 سے",
  "svc.web.long":
    "کسٹم کاروباری ویب سائٹس، لینڈنگ پیجز اور کیٹلاگ, تیز لوڈ، موبائل پر واضح، اور انکوائری کا واضح راستہ۔ حتمی قیمت صفحات، فیچرز اور مواد پر منحصر ہے۔ ہوسٹنگ اور ڈومین الگ بتائے جاتے ہیں جب تک تحریری طور پر شامل نہ ہوں۔",

  "svc.social.name": "سوشل میڈیا مینجمنٹ",
  "svc.social.desc":
    "حکمت عملی پر مبنی سوشل میڈیا جو تسلسل، مشغولیت اور مضبوط برانڈ موجودگی بنائے۔",
  "svc.social.f1": "مواد کی منصوبہ بندی",
  "svc.social.f2": "سوشل حکمت عملی",
  "svc.social.f3": "تخلیقی سمت",
  "svc.social.f4": "پوسٹنگ کا انتظام",
  "svc.social.f5": "کارکردگی کی نگرانی",
  "svc.social.price": "ماہانہ PKR 15,000 سے",
  "svc.social.long":
    "ماہانہ منصوبہ بندی، تخلیقی سمت اور پبلشنگ تاکہ کاروبار باقاعدگی سے نظر آئے, صرف فیڈ نہیں، آواز کے ساتھ۔ ہم ان پلیٹ فارمز پر توجہ دیتے ہیں جو سامعین کے لیے واقعی اہم ہیں۔",

  "svc.seo.name": "ایس ای او",
  "svc.seo.desc":
    "ایس ای او حکمت عملیاں جو آن لائن نظر آنے، آرگینک ٹریفک اور سرچ موجودگی بہتر بنائیں۔",
  "svc.seo.f1": "کی ورڈ ریسرچ",
  "svc.seo.f2": "آن پیج ایس ای او",
  "svc.seo.f3": "تکنیکی بنیادی باتیں",
  "svc.seo.f4": "مواد کی تجاویز",
  "svc.seo.f5": "کارکردگی کی نگرانی",
  "svc.seo.price": "ماہانہ PKR 20,000 سے",
  "svc.seo.long":
    "مقامی اور آن پیج سرچ کام تاکہ قریبی خدمات تلاش کرنے والے کاروبار کو ڈھونڈ سکیں۔ ہم ڈھانچے، ٹائٹلز، گوگل بزنس اور مواد سے شروع کرتے ہیں۔ ایس ای او ایک جمع ہونے والا عمل ہے، ایک ہفتے کا جادو نہیں۔",

  "svc.brand.name": "برانڈ شناخت",
  "svc.brand.desc":
    "پیشہ ورانہ بصری شناخت تاکہ کاروبار پہچانا جائے، مستقل رہے اور قابلِ اعتماد لگے۔",
  "svc.brand.f1": "برانڈ کی سمت",
  "svc.brand.f2": "لوگو ڈویلپمنٹ",
  "svc.brand.f3": "رنگ پیلیٹ",
  "svc.brand.f4": "ٹائپوگرافی",
  "svc.brand.f5": "برانڈ گائیڈ لائنز",
  "svc.brand.price": "PKR 15,000 سے",
  "svc.brand.long":
    "ایک واضح بصری سمت تاکہ ہر پوسٹ، صفحہ اور اشتہار ایک ہی کاروبار کا لگے۔ ہم لوگو استعمال، رنگ، ٹائپ اور مختصر گائیڈ لائنز طے کرتے ہیں جن پر ٹیم عمل کر سکے۔",

  "svc.consult.name": "بزنس گروتھ کنسلٹنسی",
  "svc.consult.desc":
    "حکمت عملی پر مبنی مشاورت جو ڈیجیٹل مواقع شناخت کرے اور گاہک حاصل کرنا بہتر بنائے۔",
  "svc.consult.f1": "کاروباری جائزہ",
  "svc.consult.f2": "ڈیجیٹل حکمت عملی",
  "svc.consult.f3": "گاہک حاصل کرنا",
  "svc.consult.f4": "ترقی کے مواقع",
  "svc.consult.f5": "عملی منصوبہ",
  "svc.consult.price": "فی سیشن PKR 10,000 سے",
  "svc.consult.long":
    "ایک مرکوز سیشن جس میں دیکھا جاتا ہے کاروبار اب گاہک کیسے حاصل کرتا ہے، ڈیجیٹل کہاں مدد دے سکتا ہے، اور اگلا قدم کیا ہے۔ آپ کے پاس تحریری ایکشن پلان ہوتا ہے, اصطلاحات کی سلائیڈ نہیں۔",

  "svc.video.name": "ویڈیو پروڈکشن اور ریلز",
  "svc.video.desc":
    "سپیڈ ریمپ، پروڈکشن اور سینیماٹوگرافی ریلز, شوٹ، ایڈٹ اور سوشل پلیٹ فارمز کے لیے ڈیلیوری۔",
  "svc.video.f1": "شوٹنگ",
  "svc.video.f2": "ایڈیٹنگ",
  "svc.video.f3": "منتخب پیکیجز میں اسکرپٹ",
  "svc.video.f4": "منتخب پیکیجز میں لائٹنگ اور مائیک",
  "svc.video.f5": "حتمی ڈیلیوری",
  "svc.video.price": "فی ریل PKR 1,999 سے",
  "svc.video.long":
    "مختصر ویڈیو ان پلیٹ فارمز کے لیے جہاں آپ کے گاہک پہلے سے اسکرول کرتے ہیں۔ پیکیجز تیز سپیڈ ریمپ ایڈٹس سے مکمل سینیماٹک پروڈکشن تک ہیں، ماہانہ آؤٹ پٹ کے ساتھ اگر تسلسل درکار ہو۔",

  "pricing.kicker": "قیمتیں",
  "pricing.title": "سادہ قیمتیں، سنجیدہ ترقی",
  "pricing.sub": "ایک نقطۂ آغاز چنیں، یا اپنے کاروبار کے لیے کسٹم حل پر بات کریں۔",
  "pricing.note":
    "حتمی قیمت پراجیکٹ کی وسعت، ضروریات اور ڈیلیوریبلز پر منحصر ہے۔ اشتہاری خرچ، ہوسٹنگ، ڈومین اور فریقِ ثالث فیس الگ ہیں جب تک واضح طور پر شامل نہ ہوں۔",
  "pricing.customCta": "کسٹم تجویز مانگیں",
  "pricing.videoTitle": "ویڈیو پروڈکشن اور ریلز",
  "pricing.digitalTitle": "ڈیجیٹل خدمات",
  "pricing.mostPopular": "سب سے مقبول",
  "pricing.perReel": " / ریل",
  "pricing.perMonth": " / ماہ",
  "pricing.week": " / ہفتہ",
  "pricing.monthlyOutput": "ماہانہ آؤٹ پٹ",
  "pricing.combineTitle": "ایک سے زیادہ خدمات درکار ہیں؟",
  "pricing.combineBody": "جو خدمات آپ کے کاروبار کو درکار ہیں انہیں ایک کسٹم ڈیجیٹل گروتھ حل میں جوڑیں۔",
  "pricing.starter": "اسٹارٹر",
  "pricing.starterBody": "ڈیجیٹل بنیاد بنانے والے کاروبار کے لیے, عام طور پر ویب سائٹ اور واضح برانڈ سمت۔",
  "pricing.growth": "گروتھ",
  "pricing.growthBody":
    "نظر آنے اور گاہک حاصل کرنے کے لیے تیار کاروبار, ویب سائٹ، سوشل اور میٹا اشتہارات ایک ساتھ۔",
  "pricing.scale": "اسکیل",
  "pricing.scaleBody":
    "مکمل ڈیجیٹل گروتھ سسٹم کے لیے تیار کاروبار, موجودگی، حصول، سرچ اور مسلسل حکمت عملی۔",
  "pricing.build": "میرا پیکیج بنائیں",
  "pricing.reel": "ریل",
  "pricing.month": "ماہ",
  "pricing.webTitle": "ویب ڈویلپمنٹ",
  "pricing.web.basic": "بیسک",
  "pricing.web.growth": "گروتھ",
  "pricing.web.premium": "پریمیم",
  "pricing.web.note": "ہوسٹنگ اور ڈومین الگ بتائے جاتے ہیں جب تک تحریری طور پر شامل نہ ہوں۔",
  "pricing.web.cta": "اپنی ویب سائٹ پر بات کریں",
  "pricing.metaTitle": "میٹا اشتہارات مینجمنٹ",
  "pricing.metaNote": "اشتہاری خرچ شامل نہیں۔ کلائنٹ میٹا کو الگ ادا کرتا ہے۔ سینیپس مینجمنٹ فیس لیتی ہے۔",
  "pricing.socialTitle": "سوشل میڈیا مینجمنٹ",
  "pricing.ads.cta": "اپنے اشتہارات پر بات کریں",
  "pricing.social.cta": "اپنے سوشل پر بات کریں",

  "why.kicker": "سینیپس کیوں",
  "why.title": "سینیپس کیوں؟",
  "why.s1": "پہلے حکمت عملی",
  "why.s1b": "ہم پہلے کاروبار سمجھتے ہیں، پھر فیصلہ کرتے ہیں کیا بنانا یا پروموٹ کرنا ہے۔",
  "why.s2": "تخلیق + کارکردگی",
  "why.s2b": "مضبوط تخلیقی کام، ڈیٹا پر مبنی فیصلوں کے ساتھ۔",
  "why.s3": "ایک جڑا ہوا نظام",
  "why.s3b": "ویب سائٹ، مارکیٹنگ، سوشل میڈیا اور ایس ای او کو ایک ساتھ کام کرنا چاہیے۔",
  "why.s4": "شفاف",
  "why.s4b": "واضح بات، واضح دائرۂ کار، واضح ڈیلیوریبلز۔",
  "why.s5": "ترقی پر توجہ",
  "why.s5b": "ہر سرگرمی نظر، لیڈز، گاہک یا ترقی میں حصہ ڈالے۔",

  "process.kicker": "کام کا طریقہ",
  "process.title": "ہم کیسے کام کرتے ہیں",
  "process.sub": "پہلی گفتگو سے مسلسل ترقی تک ایک پرسکون، دہرایا جانے والا راستہ۔",
  "process.1": "جاننا",
  "process.1b": "کاروبار، سامعین، اہداف اور موجودہ ڈیجیٹل موجودگی سمجھنا۔",
  "process.2": "حکمت عملی",
  "process.2b": "صحیح مارکیٹنگ، ویب یا برانڈ حکمت عملی بنانا۔",
  "process.3": "عمل",
  "process.3b": "درکار ڈیجیٹل کام تخلیق، لانچ اور منظم کرنا۔",
  "process.4": "ترقی",
  "process.4b": "کارکردگی کا جائزہ، عمل بہتر کرنا اور ترقی کے مواقع شناخت کرنا۔",

  "industries.kicker": "شعبے",
  "industries.title": "ان کاروبار کے لیے جو بڑھنے کو تیار ہیں",
  "industries.sub": "ہم مختلف زمروں کے مقامی کاروبار کے ساتھ کام کرتے ہیں, فرضی کیس اسٹڈیز نہیں، واضح فٹ۔",
  "ind.retail": "ریٹیل اور فیشن",
  "ind.food": "ریستوران اور فوڈ",
  "ind.estate": "ریئل اسٹیٹ",
  "ind.health": "ہیلتھ کیئر",
  "ind.edu": "تعلیم",
  "ind.pro": "پیشہ ورانہ خدمات",
  "ind.local": "مقامی کاروبار",
  "ind.startups": "اسٹارٹ اپس اور ایس ایم ایز",

  "work.kicker": "پورٹ فولیو",
  "work.title": "منتخب کام",
  "work.sub":
    "سینیپس ایک بڑھتی ہوئی ایجنسی ہے۔ یہ واضح طور پر لیبل شدہ تصوراتی پراجیکٹس ہیں, کلائنٹ نتائج نہیں, اور حقیقی کام مکمل ہونے پر تبدیل کر دیے جائیں گے۔",
  "work.concept": "تصوری پراجیکٹ",
  "work.coming": "جلد آ رہا ہے",
  "work.c1": "ہاسپٹالٹی ویب سائٹ کا تصور",
  "work.c1b": "ریستوران سائٹ: مینو، مقام، ریزرویشن کا راستہ۔",
  "work.c2": "کلینک لینڈنگ پیج کا تصور",
  "work.c2b": "اپائنٹمنٹ انکوائریز کے لیے مرکوز صفحہ، مقامی سرچ اور اشتہارات کے لیے۔",
  "work.c3": "سوشل لانچ کٹ کا تصور",
  "work.c3b": "ریٹیل لانچ کے لیے برانڈڈ فریمز، سٹوریز اور آفر پوسٹس کا ایک مہینہ۔",
  "work.c4": "شناخت کے نظام کا تصور",
  "work.c4b": "لوگو، ٹائپ، رنگ اور مختصر گائیڈ لائنز جن پر ٹیم عمل کر سکے۔",
  "work.c5": "لیڈ کیمپین کا تصور",
  "work.c5b": "سروس بزنس کے لیے اشتہاری زاویے، لینڈنگ ڈھانچہ اور فالو اپ راستہ۔",

  "team.kicker": "ہماری ٹیم",
  "team.title": "ٹیم سے ملیے",
  "team.pageTitle": "ٹیم سے ملیے",
  "team.lead":
    "ہر حکمت عملی، کیمپین اور ڈیجیٹل تجربے کے پیچھے ایک ٹیم ہے جو تخلیقیت، ٹیکنالوجی اور کاروباری سوچ کو جوڑتی ہے۔",
  "team.view": "پوری ٹیم",
  "team.intro":
    "کوئٹہ میں ایک چھوٹی، بانی کی قیادت والی ٹیم۔ حکمت عملی، ویب سائٹس، اشتہارات، ڈیزائن اور آٹومیشن ایک ساتھ ہیں تاکہ کام عملی اور ایماندار رہے۔",
  "team.meerak.role": "بانی اور سی ای او",
  "team.meerak.bio": "کاروباری حکمت عملی، کلائنٹ حصول، آپریشنز اور برانڈ گروتھ۔",
  "team.soaima.role": "شریک بانی اور سینئر ویب ڈویلپر",
  "team.soaima.bio":
    "کسٹم کاروباری ویب سائٹس، ریسپانسو ڈیزائن، لینڈنگ پیجز، کیٹلاگ اور مسلسل مینٹیننس۔",
  "team.muzammil.role": "پرفارمنس مارکیٹنگ سپیشلسٹ",
  "team.muzammil.bio":
    "میٹا اشتہارات، کیمپین حکمت عملی، سامعین ٹارگٹنگ، لیڈ جنریشن، بہتری اور رپورٹنگ۔",
  "team.tahir.role": "گروتھ مارکیٹنگ سپیشلسٹ",
  "team.tahir.bio":
    "میٹا اشتہارات، سیلز فنل حکمت عملی، کنورژن بہتری، اشتہاری کاپی اور ری ٹارگٹنگ۔",
  "team.muqaddas.role": "کری ایٹیو ڈیزائنر اور سوشل میڈیا سپیشلسٹ",
  "team.muqaddas.bio":
    "گرافک ڈیزائن، برانڈ شناخت، سوشل میڈیا مینجمنٹ، مواد کی منصوبہ بندی اور بصری نظام۔",
  "team.shahzor.role": "اے آئی آٹومیشن اور چیٹ بوٹ ماہر",
  "team.shahzor.bio":
    "اے آئی آٹومیشن، چیٹ بوٹ ڈویلپمنٹ، ورک فلو آٹومیشن اور گفتگو پر مبنی کسٹمر سپورٹ۔",

  "stories.title": "کلائنٹ کہانیاں",
  "stories.body": "حقیقی کلائنٹ کامیابی کی کہانیاں یہاں آئیں گی جیسے جیسے ہم بڑھیں گے۔",

  "faq.kicker": "عمومی سوالات",
  "faq.title": "سوالات کے جواب",
  "faq.q1": "سینیپس کون سی خدمات فراہم کرتا ہے؟",
  "faq.a1":
    "میٹا اشتہارات، ویب ڈویلپمنٹ، سوشل میڈیا مینجمنٹ، ایس ای او، برانڈ شناخت، بزنس گروتھ کنسلٹنسی، اور ویڈیو پروڈکشن و ریلز۔ خدمات الگ یا مل کر لی جا سکتی ہیں۔",
  "faq.q2": "ویب سائٹ کی قیمت کتنی ہے؟",
  "faq.a2":
    "ویب ڈویلپمنٹ PKR 35,000 سے شروع ہوتی ہے۔ حتمی قیمت صفحات، فیچرز اور مواد پر منحصر ہے۔ ہوسٹنگ اور ڈومین الگ ہو سکتے ہیں۔",
  "faq.q3": "میٹا اشتہارات مینجمنٹ کی قیمت کتنی ہے؟",
  "faq.a3":
    "میٹا اشتہارات مینجمنٹ ماہانہ PKR 15,000 سے شروع ہوتی ہے۔ اشتہاری بجٹ میٹا کو الگ ادا ہوتا ہے اور مینجمنٹ فیس میں شامل نہیں جب تک ہم تحریری طور پر نہ کہیں۔",
  "faq.q4": "کیا اشتہاری خرچ شامل ہے؟",
  "faq.a4": "نہیں۔ اشتہاری خرچ پلیٹ فارم (مثلاً میٹا) کو براہِ راست ادا ہوتا ہے اور سینیپس کی فیس سے الگ ہے۔",
  "faq.q5": "کیا آپ ہوسٹنگ اور ڈومین دیتے ہیں؟",
  "faq.a5":
    "ہم ہوسٹنگ اور ڈومین کا بندوبست یا مشورہ دے سکتے ہیں۔ انہیں الگ قیمت دی جاتی ہے جب تک تجویز میں واضح طور پر شامل نہ ہوں۔",
  "faq.q6": "ویب سائٹ کتنے عرصے میں تیار ہوتی ہے؟",
  "faq.a6":
    "عام کاروباری سائٹ مواد تیار ہونے کے بعد دو سے چار ہفتے لیتی ہے۔ بڑے کیٹلاگ یا کسٹم فیچرز زیادہ وقت لیتے ہیں, ہم دریافت کال کے بعد ٹائم لائن بتاتے ہیں۔",
  "faq.q7": "کیا میں کئی خدمات ملا سکتا ہوں؟",
  "faq.a7": "جی ہاں۔ زیادہ تر کلائنٹس ایسا ہی کرتے ہیں۔ ہم الگ الگ کام کے بجائے ایک دائرۂ کار اور ایک فیس تجویز کرتے ہیں۔",
  "faq.q8": "کیا آپ کوئٹہ سے باہر کے کاروبار کے ساتھ کام کرتے ہیں؟",
  "faq.a8":
    "جی ہاں۔ ہماری توجہ کوئٹہ کے مقامی کاروبار سے شروع ہوئی، اور ہم پاکستان بھر کے کاروبار کے ساتھ کام کرتے ہیں۔",
  "faq.q9": "پروجیکٹ کیسے شروع کروں؟",
  "faq.a9":
    "پروجیکٹ انکوائری بھیجیں، واٹس ایپ پر بات کریں، یا مفت تعارفی کال بک کریں۔ ہم پہلے کاروبار سمجھتے ہیں، پھر واضح اگلا قدم تجویز کرتے ہیں۔",

  "cta.title": "تخلیق، رابطہ اور ترقی کے لیے تیار ہیں؟",
  "cta.body":
    "آئیے آپ کی ڈیجیٹل موجودگی کو ایسا بنائیں جسے گاہک یاد رکھیں اور کاروبار اس سے بڑھ سکے۔",
  "cta.primary": "پروجیکٹ شروع کریں",
  "cta.secondary": "مشاورت بک کریں",

  "blog.kicker": "جرنل",
  "blog.title": "خیالات",
  "blog.sub": "مقامی کاروبار کے لیے ڈیجیٹل مارکیٹنگ، ویب سائٹس اور ترقی پر عملی تحریر۔",
  "blog.soon": "تحریریں جلد آ رہی ہیں",
  "blog.soonBody":
    "ہم یہاں اصل نوٹس شائع کریں گے۔ بھرپور الفاظ نہیں، فرضی کیس اسٹڈیز نہیں۔ زمرے تیار ہیں تاکہ پہلی تحریروں کا گھر ہو۔",
  "blog.a1.title": "تخلیق، رابطہ، ترقی: کوئٹہ کے کاروبار کے لیے ایک ڈیجیٹل سٹوڈیو",
  "blog.a1.meta": "سینیپس مارکیٹنگ ایجنسی، کوئٹہ، پاکستان",
  "blog.all": "تمام",
  "blog.search": "مضامین تلاش کریں",
  "blog.empty": "اس فلٹر سے کوئی مضمون نہیں ملا۔",
  "blog.readMore": "مزید پڑھیں",
  "blog.related": "متعلقہ مضامین",
  "blog.back": "تمام مضامین",
  "blog.cat.dm": "ڈیجیٹل مارکیٹنگ",
  "blog.cat.meta": "میٹا اشتہارات",
  "blog.cat.seo": "ایس ای او",
  "blog.cat.web": "ویب ڈویلپمنٹ",
  "blog.cat.social": "سوشل میڈیا",
  "blog.cat.growth": "کاروباری ترقی",

  "contact.kicker": "رابطہ",
  "contact.title": "آئیے ایسی چیز بنائیں جو بڑھے۔",
  "contact.sub": "اپنے کاروبار، اہداف اور جو حاصل کرنا چاہتے ہیں وہ بتائیں۔",
  "contact.name": "پورا نام",
  "contact.email": "ای میل",
  "contact.phone": "واٹس ایپ نمبر",
  "contact.business": "کاروبار کا نام",
  "contact.service": "درکار خدمت",
  "contact.budget": "بجٹ",
  "contact.details": "پروجیکٹ کی تفصیل",
  "contact.send": "پروجیکٹ انکوائری بھیجیں",
  "contact.whatsapp": "واٹس ایپ پر بات کریں",
  "contact.or": "یا",
  "contact.success": "شکریہ، آپ کی انکوائری موصول ہو گئی ہے۔",
  "contact.successNote": "ہماری ٹیم اسے دیکھے گی اور جلد واٹس ایپ اور ای میل پر رابطہ کرے گی۔",
  "contact.successNew": "نئی انکوائری شامل کریں",
  "contact.successBack": "واپس",
  "contact.successWa": "واٹس ایپ پر جاری رکھیں",
  "contact.error": "کچھ غلط ہو گیا۔ براہ کرم واٹس ایپ یا ای میل استعمال کریں۔",
  "contact.sending": "بھیجا جا رہا ہے…",
  "contact.selectService": "سروس منتخب کریں",
  "contact.linktree": "linktr.ee/synapsemarketingagency",
  "contact.requiredNote": "نام، ای میل، واٹس ایپ، کاروبار کا نام اور سروس لازمی ہیں۔ بجٹ اور تفصیل اختیاری ہیں۔",
  "contact.inboxHint": "ہر انکوائری synapseagency.pk@gmail.com پر وزٹر لسٹ کی صورت میں ای میل ہوتی ہے، اور ٹیم ان باکس میں محفوظ ہوتی ہے۔",
  "contact.destination":
    "آپ کا نام، ای میل اور واٹس ایپ سینیپس کو بھیج دیا جاتا ہے۔ تفصیل ہم بعد میں لیں گے۔",
  "contact.successMail": "ای میل کاپی",

  "opt.meta-ads": "میٹا اشتہارات",
  "opt.web-development": "ویب ڈویلپمنٹ",
  "opt.social-media": "سوشل میڈیا مینجمنٹ",
  "opt.seo": "ایس ای او",
  "opt.brand-identity": "برانڈ شناخت",
  "opt.consultancy": "بزنس گروتھ کنسلٹنسی",
  "opt.video": "ویڈیو پروڈکشن",
  "opt.multiple": "متعدد خدمات",
  "opt.under-25": "PKR 25,000 سے کم",
  "opt.25-50": "PKR 25,000–50,000",
  "opt.50-100": "PKR 50,000–100,000",
  "opt.100-200": "PKR 100,000–200,000",
  "opt.200-plus": "PKR 200,000+",
  "opt.not-sure": "یقین نہیں",

  "wa.chat": "ہم سے رابطہ کریں",
  "bot.title": "سینیپس اسسٹ",
  "bot.chat": "AI سے بات کریں",
  "bot.sub": "سینیپس سروسز، پرائسنگ اور رابطے پر تربیت یافتہ",
  "bot.hello": "السلام علیکم، میں سینیپس اسسٹ ہوں۔ آج کیا مدد چاہیے؟",
  "bot.placeholder": "اردو، انگلش یا رومن اردو…",
  "bot.send": "بھیجیں",
  "bot.new": "نئی چیٹ",
  "footer.company": "کمپنی",
  "footer.services": "خدمات",
  "footer.follow": "سینیپس کو فالو کریں",
  "footer.contact": "رابطہ",
  "footer.privacy": "پرائیویسی پالیسی",
  "footer.terms": "شرائط و ضوابط",
  "footer.rights": "© 2026 سینیپس مارکیٹنگ ایجنسی۔ جملہ حقوق محفوظ ہیں۔",
  "footer.tagline": "تخلیق کریں۔ رابطہ قائم کریں۔ ترقی کریں۔",

  "legal.privacyTitle": "پرائیویسی پالیسی",
  "legal.privacyLead": "آپ جو معلومات ہمارے ساتھ شیئر کرتے ہیں سینیپس اسے کیسے سنبھالتا ہے۔",
  "legal.termsTitle": "شرائط و ضوابط",
  "legal.termsLead": "سینیپس مارکیٹنگ ایجنسی کے ساتھ کام کی سادہ شرائط۔",

  "inbox.title": "ایڈمن ان باکس",
  "inbox.empty": "ابھی کوئی انکوائری نہیں۔",
  "inbox.signIn": "انکوائریز پڑھنے کے لیے سائن ان کریں۔",
  "inbox.when": "موصول",
  "inbox.unlockBody": "صرف ایڈمن۔ کلائنٹ انکوائریز پڑھنے کے لیے یوزر نیم اور پاس ورڈ لکھیں۔",
  "inbox.code": "ان باکس کوڈ",
  "inbox.user": "یوزر نیم",
  "inbox.pass": "پاس ورڈ",
  "inbox.open": "ان باکس کھولیں",
  "inbox.badCode": "یوزر نیم یا پاس ورڈ درست نہیں۔",
  "inbox.lead": "ہر ویب سائٹ انکوائری یہاں محفوظ ہوتی ہے، واٹس ایپ پر جاتی ہے، اور synapseagency.pk@gmail.com پر ای میل ہوتی ہے۔",
  "inbox.forward": "جیمیل پر بھیجیں",
  "inbox.whatsapp": "واٹس ایپ پر کھولیں",
  "inbox.signOut": "سائن آؤٹ",
  "inbox.copy": "کاپی",
  "inbox.copyAll": "سب کاپی",
  "inbox.excel": "ایکسل ڈاؤن لوڈ",
  "inbox.copied": "کاپی ہو گیا",
  "inbox.delete": "حذف",
  "inbox.copySheet": "شیٹ کاپی",
  "inbox.clear": "ان باکس خالی",

  "login.title": "اسٹاف سائن ان",
  "login.body": "انکوائری ان باکس کھولنے کے لیے سائن ان کریں۔",
  "login.disabled": "سائن ان فی الحال بند ہے۔",

  "career.kicker": "کیریئر",
  "career.title": "سینیپس کے ساتھ کام کریں",
  "career.sub": "کوئٹہ میں ایک بڑھتی ہوئی ٹیم، مقامی کاروبار کے لیے ڈیجیٹل سسٹم بناتی ہے۔",
  "career.body":
    "سینیپس بانی کی قیادت میں ایجنسی ہے۔ ہم فرضی نوکریاں نہیں دکھاتے۔ جب کوئی رول کھلے گا، وہ یہاں واضح تفصیل کے ساتھ آئے گا۔",
  "career.open": "ابھی کوئی کھلی پوزیشن درج نہیں۔ اگر تعارف بھیجنا ہو تو مختصر نوٹ اور اپنا کام ای میل کریں۔",
  "career.email": "تعارف ای میل کریں",

  "notfound.title": "صفحہ نہیں ملا",
  "notfound.body": "یہ صفحہ موجود نہیں۔ ہوم پر جائیں، یا ہم سے بات کریں۔",
  "notfound.home": "ہوم پر واپس",
};

const dictionaries: Record<Lang, Dict> = { en, ur };

type I18nValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function loadUrduFonts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("urdu-fonts")) return;
  const link = document.createElement("link");
  link.id = "urdu-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap";
  document.head.appendChild(link);
}

function applyLang(lang: Lang) {
  const root = document.documentElement;
  root.lang = lang === "ur" ? "ur" : "en";
  root.dir = lang === "ur" ? "rtl" : "ltr";
  if (lang === "ur") loadUrduFonts();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof document === "undefined") return "en";
    if (document.documentElement.lang === "ur" || document.documentElement.dir === "rtl") return "ur";
    try {
      return localStorage.getItem(STORAGE_KEY) === "ur" ? "ur" : "en";
    } catch {
      return "en";
    }
  });

  const setLang = useCallback((next: Lang) => {
    applyLang(next);
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    applyLang(lang);
  }, [lang]);

  const t = useCallback(
    (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    [lang],
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, dir: lang === "ur" ? "rtl" : "ltr", t, setLang }),
    [lang, t, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
