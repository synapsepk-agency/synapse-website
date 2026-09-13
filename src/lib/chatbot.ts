export type ChatTurn = { role: "bot" | "user" | "typing"; text: string };
export type BotReply = { text: string; chips: string[] };
export type ChatSession = { topic: string | null };
export type Mode = "en" | "ur" | "ro";

export function createSession(): ChatSession {
  return { topic: null };
}

const ROMAN =
  /\b(kya|hai|han|haan|chahiye|chahye|kitna|kitne|kitni|paise|mujhe|mujh|mera|meri|mere|karo|banao|banana|aap|ap|kaam|batao|bataein|kese|kaise|krna|karna|kesy|engy|ayengy|detay|dety|ho|hain|par|mein|mai|ke|ki|ko|se|sy|liye|zarurat|bilkul)\b/i;

function modeOf(text: string, lang: "en" | "ur"): Mode {
  if (/[\u0600-\u06FF]/.test(text)) return "ur";
  if (ROMAN.test(text)) return "ro";
  if (lang === "ur") return "ro";
  return "en";
}

function norm(q: string) {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s@.+-]/gu, " ")
    .replace(/\b(webiste|websit|web site)\b/g, " website ")
    .replace(/\b(fb|face book)\b/g, " facebook ")
    .replace(/\b(insta)\b/g, " instagram ")
    .replace(/\b(ads?|adss|boost)\b/g, " ads ")
    .replace(/\b(ril|reels?)\b/g, " reel ")
    .replace(/\s+/g, " ")
    .trim();
}

function has(q: string, keys: string[]) {
  return keys.some((k) => q.includes(k));
}

function say(mode: Mode, en: string, ur: string, ro: string) {
  return mode === "ur" ? ur : mode === "ro" ? ro : en;
}

const CHIPS = {
  en: ["Website", "Meta Ads", "Reels", "Social", "Start"],
  ur: ["ویب سائٹ", "میٹا اشتہارات", "ریلز", "سوشل", "شروع"],
  ro: ["Website", "Meta Ads", "Reels", "Social", "Start"],
} as const;

export const SUGGESTIONS = CHIPS;

const UNCLEAR = {
  en: "Sorry, I could not understand that clearly. Could you share your query in a bit more detail?",
  ur: "معاف کیجیے، میں آپ کی بات ٹھیک سے سمجھ نہیں سکا۔ کیا آپ اپنی query تھوڑی تفصیل سے دوبارہ بتا سکتے ہیں؟",
  ro: "Sorry, main aapki baat properly samajh nahi saka. Kya aap apni query thori detail mein dobara bata sakte hain?",
};

export function replyTo(question: string, lang: "en" | "ur", session: ChatSession): BotReply {
  const raw = question.trim();
  const mode = modeOf(raw, lang);
  const q = norm(raw);
  const chips = [...CHIPS[mode]];

  if (!q || q.length < 2 || /^(ok+|hmm+|uh+|ha+|h+\?+|[\?]+|asdf+|test|ok)$/i.test(q)) {
    return { text: UNCLEAR[mode], chips };
  }

  const offTopic = has(q, ["weather", "cricket", "joke", "recipe", "homework", "bitcoin", "crypto"]);
  if (offTopic) {
    return {
      text: say(
        mode,
        "I am Synapse Assist. I can help with websites, Meta Ads, social, SEO, reels, brand, consultancy or how to start. What do you need?",
        "میں سینیپس اسسٹ ہوں۔ ویب سائٹ، میٹا اشتہارات، سوشل، SEO، ریلز یا شروعات میں مدد کر سکتا ہوں۔ کیا چاہیے؟",
        "Main Synapse Assist hoon. Website, Meta Ads, social, SEO, reels ya start karne mein help kar sakta hoon. Kya chahiye?",
      ),
      chips,
    };
  }

  const wantPrice = has(q, ["price", "pricing", "cost", "rate", "kitna", "kitne", "kitni", "paise", "charges", "fee", "package", "قیمت", "کتنے", "کتنا", "پیکیج"]);
  const wantHow = has(q, ["how", "kaise", "kese", "kesy", "process", "step", "کیسے"]);

  // Website
  if (has(q, ["website", "shopify", "woocommerce", "site banana", "site banao", "ویب سائٹ", "ویب"])) {
    session.topic = "website";
    if (wantPrice) {
      return {
        text: say(
          mode,
          "Website packages on our site: Basic PKR 30,000 (up to 30 products, 5 pages), Growth PKR 45,000 (up to 100 products, 8 pages), Premium PKR 65,000. Hosting and domain may be separate. What is your business type?",
          "ویب پیکیجز: بیسک PKR 30,000 (30 پروڈکٹس، 5 صفحات)، گروتھ 45,000، پریمیم 65,000۔ ہوسٹنگ/ڈومین الگ ہو سکتے ہیں۔ آپ کا کاروبار کس قسم کا ہے؟",
          "Website packages: Basic PKR 30,000 (30 products, 5 pages), Growth 45,000, Premium 65,000. Hosting/domain alag ho sakte hain. Aapka business kis type ka hai?",
        ),
        chips,
      };
    }
    return {
      text: say(
        mode,
        "Yes, Synapse builds business websites (WooCommerce or Shopify). Packages start from PKR 30,000. Is your goal an online store, a brochure site, or leads?",
        "جی، سینیپس کاروباری ویب سائٹس بناتی ہے۔ پیکیجز PKR 30,000 سے۔ کیا آپ کو آن لائن سٹور چاہیے، معلومات کی سائٹ، یا لیڈز؟",
        "Ji, Synapse business websites banati hai. Packages PKR 30,000 se. Aapko online store chahiye, info site, ya leads?",
      ),
      chips,
    };
  }

  // Meta Ads / Facebook customers
  if (has(q, ["facebook", "meta", "ads", "customers chahiye", "customer chahiye", "leads", "اشتہار", "ایڈز", "میٹا"])) {
    session.topic = "ads";
    return {
      text: say(
        mode,
        "Meta Ads can help bring customers from Facebook and Instagram. Management starts from PKR 10,000/month. The ad budget is paid to Meta separately. Would you like me to explain the process?",
        "میٹا اشتہارات فیس بک/انسٹاگرام سے کسٹمرز لا سکتے ہیں۔ مینجمنٹ ماہانہ PKR 10,000 سے۔ اشتہاری بجٹ میٹا کو الگ ادا ہوتا ہے۔ کیا process بتاؤں؟",
        "Iske liye Meta Ads suitable ho sakti hain. Management mahana PKR 10,000 se. Ad budget Meta ko alag jata hai. Agar aap chahein to main process explain kar doon?",
      ),
      chips: mode === "ur" ? ["جی، بتاؤ", "قیمت", "شروع"] : mode === "ro" ? ["Haan, batao", "Pricing", "Start"] : ["Yes, explain", "Pricing", "Start"],
    };
  }

  // Reels
  if (has(q, ["reel", "video", "cinematography", "speed ramp", "shoot", "ریل", "ویڈیو"])) {
    session.topic = "reels";
    return {
      text: say(
        mode,
        "These are reels, not long videos. Speed Ramp from PKR 1,999 (4 reels/week, 30–40 sec). Production from PKR 3,999. Cinematography from PKR 5,999. How many reels do you need?",
        "یہ ریلز ہیں، لمبی ویڈیوز نہیں۔ سپیڈ ریمپ PKR 1,999 سے (ہفتے میں 4، 30–40 سیکنڈ)۔ کتنی ریلز چاہیے؟",
        "Ye reels hain, lambi videos nahi. Speed Ramp PKR 1,999 se (hafte mein 4, 30–40 sec). Kitni reels chahiye?",
      ),
      chips,
    };
  }

  // Social
  if (has(q, ["social", "instagram", "tiktok", "posting", "page chalani", "سوشل", "انسٹا", "ٹک"])) {
    session.topic = "social";
    return {
      text: say(
        mode,
        "Social media management starts from PKR 15,000/month, including planning and posting for Instagram and TikTok. Do you already have pages, or should we set them up?",
        "سوشل میڈیا مینجمنٹ ماہانہ PKR 15,000 سے۔ کیا پیجز پہلے سے ہیں؟",
        "Social media management mahana PKR 15,000 se. Pages pehle se hain, ya setup chahiye?",
      ),
      chips,
    };
  }

  // SEO
  if (has(q, ["seo", "google rank", "ranking", "search engine", "ایس ای او"])) {
    session.topic = "seo";
    return {
      text: say(
        mode,
        "SEO starts from PKR 20,000/month. We work on pages and keywords for Quetta and Pakistan. Rankings are not overnight. Do you already have a website?",
        "SEO ماہانہ PKR 20,000 سے۔ رینکنگ راتوں رات نہیں۔ کیا ویب سائٹ پہلے سے ہے؟",
        "SEO mahana PKR 20,000 se. Ranking raaton raat nahi milti. Website pehle se hai?",
      ),
      chips,
    };
  }

  // Brand
  if (has(q, ["brand", "logo", "identity", "branding", "لوگو", "برانڈ"])) {
    session.topic = "brand";
    return {
      text: say(
        mode,
        "Brand identity starts from PKR 15,000: name, colour, type and a short story. What is the business name?",
        "برانڈ شناخت PKR 15,000 سے۔ کاروبار کا نام کیا ہے؟",
        "Brand identity PKR 15,000 se. Business ka naam kya hai?",
      ),
      chips,
    };
  }

  // Consultancy
  if (has(q, ["consult", "consultancy", "session", "mashwara", "کنسلٹ", "مشورہ"])) {
    session.topic = "consult";
    return {
      text: say(
        mode,
        "Business growth consultancy is PKR 10,000 per session. We understand the business first, then suggest a next step. Shall I share the WhatsApp number?",
        "کنسلٹنسی فی سیشن PKR 10,000۔ واٹس ایپ نمبر بھیجوں؟",
        "Consultancy per session PKR 10,000. WhatsApp number bhejoon?",
      ),
      chips,
    };
  }

  // AI
  if (has(q, ["ai", "automation", "chatbot", "workflow", "آٹومیشن", "چیٹ بوٹ", "چیٹ باٹ"])) {
    session.topic = "ai";
    return {
      text: say(
        mode,
        "Shahzor Ahmed handles AI automation and chatbots. There is no public package price on the site. Share what you want automated on WhatsApp 03303129882 and the team will scope it.",
        "شاہزور احمد AI آٹومیشن سنبھالتے ہیں۔ سائٹ پر پبلک قیمت نہیں۔ واٹس ایپ 03303129882 پر لکھیں، ٹیم اسکوپ بتا دے گی۔",
        "Shahzor Ahmed AI automation handle karte hain. Site par public price nahi. WhatsApp 03303129882 par likhein, team scope bata degi.",
      ),
      chips,
    };
  }

  // Contact
  if (has(q, ["contact", "whatsapp", "phone", "email", "number", "nmbr", "rabta", "call", "رابطہ", "واٹس", "نمبر", "ای میل", "فون"])) {
    session.topic = "contact";
    return {
      text: say(
        mode,
        "WhatsApp / phone: +92 330 3129882. Email: synapseagency.pk@gmail.com. You can also use the Contact page.",
        "واٹس ایپ / فون: +92 330 3129882۔ ای میل: synapseagency.pk@gmail.com۔",
        "WhatsApp / phone: +92 330 3129882. Email: synapseagency.pk@gmail.com.",
      ),
      chips: mode === "ro" ? ["Start", "Services"] : chips,
    };
  }

  // Location
  if (has(q, ["quetta", "balochistan", "where", "location", "kahan", "kaha", "address", "کوئٹہ", "بلوچستان", "کہاں"])) {
    session.topic = "location";
    return {
      text: say(
        mode,
        "We are based in Quetta, Balochistan, and work with businesses across Pakistan.",
        "ہم کوئٹہ، بلوچستان میں ہیں، پاکستان بھر کے کاروبار کے ساتھ کام کرتے ہیں۔",
        "Hum Quetta, Balochistan mein hain, Pakistan bhar ke businesses ke saath kaam karte hain.",
      ),
      chips,
    };
  }

  // Team
  if (has(q, ["team", "founder", "meerak", "soaima", "muzammil", "shahzor", "muqaddas", "tahir", "ٹیم", "میرک", "بانی"])) {
    session.topic = "team";
    return {
      text: say(
        mode,
        "Founder & CEO: Meerak Baloch. Co-Founder & Senior Web Developer: Soaima Tahir. The team also covers ads, growth, design, social and AI automation.",
        "بانی: میرک بلوچ۔ شریک بانی: سوعیمہ طاہر۔ ٹیم اشتہارات، ڈیزائن، سوشل اور AI بھی کرتی ہے۔",
        "Founder: Meerak Baloch. Co-Founder: Soaima Tahir. Team ads, design, social aur AI bhi cover karti hai.",
      ),
      chips,
    };
  }

  // About / help my business
  if (has(q, ["about", "synapse", "help my business", "kaise help", "kesy help", "who are", "siniips", "سینیپس", "ایجنسی"])) {
    session.topic = "about";
    return {
      text: say(
        mode,
        "Synapse is a digital growth agency in Quetta. We help with websites, Meta Ads, social, SEO, brand, reels and consultancy. What is your main goal: sales, leads, or online presence?",
        "سینیپس کوئٹہ کی ڈیجیٹل گروتھ ایجنسی ہے۔ ویب سائٹ، اشتہارات، سوشل، SEO، برانڈ، ریلز۔ آپ کا ہدف سیلز، لیڈز یا آن لائن موجودگی؟",
        "Synapse Quetta ki digital growth agency hai. Website, ads, social, SEO, brand, reels. Aapka main goal sales, leads ya online presence hai?",
      ),
      chips,
    };
  }

  // Services list
  if (has(q, ["service", "services", "kya kartay", "kya karte", "kya dety", "kya dete", "offer", "خدمات", "سروس"])) {
    session.topic = "services";
    return {
      text: say(
        mode,
        "We offer website development, Meta Ads, social media, SEO, brand identity, consultancy, reels, and AI automation. Which of these do you need?",
        "ہم ویب سائٹ، میٹا اشتہارات، سوشل، SEO، برانڈ، کنسلٹنسی، ریلز اور AI دیتے ہیں۔ کون سی چاہیے؟",
        "Hum website, Meta Ads, social, SEO, brand, consultancy, reels aur AI dete hain. Kaun si chahiye?",
      ),
      chips,
    };
  }

  // General pricing
  if (wantPrice) {
    session.topic = "pricing";
    return {
      text: say(
        mode,
        "Starting prices: websites from PKR 30,000, Meta Ads from PKR 10,000/month (ad spend separate), social from PKR 15,000/month, SEO from PKR 20,000/month, brand from PKR 15,000, consultancy PKR 10,000/session, reels from PKR 1,999. Which one should I open?",
        "شروعات: ویب PKR 30,000 سے، میٹا ماہانہ 10,000 (بجٹ الگ)، سوشل 15,000، SEO 20,000، برانڈ 15,000، کنسلٹنسی 10,000، ریلز 1,999 سے۔ کس کی تفصیل؟",
        "Starting: website PKR 30,000 se, Meta Ads mahana 10,000 (budget alag), social 15,000, SEO 20,000, brand 15,000, consultancy 10,000, reels 1,999 se. Kis ki detail chahiye?",
      ),
      chips,
    };
  }

  // Start
  if (has(q, ["start", "shuru", "begin", "hire", "quote", "inquiry", "book", "order", "get started", "شروع", "پروجیکٹ"])) {
    session.topic = "start";
    return {
      text: say(
        mode,
        "To start: message WhatsApp +92 330 3129882 or use the Contact page with your business name, goal and service. The team replies with a clear next step.",
        "شروع: واٹس ایپ +92 330 3129882 یا Contact پیج، کاروبار، ہدف اور سروس لکھیں۔",
        "Start: WhatsApp +92 330 3129882 ya Contact page par business, goal aur service likhein. Team agla step bata degi.",
      ),
      chips,
    };
  }

  // Online presence / bring business online — clarify, don't dump
  if (has(q, ["online", "digital", "presence", "business online", "online lana", "grow", "growth"])) {
    session.topic = "clarify";
    return {
      text: say(
        mode,
        "Of course. Do you need a website, social media, or online advertising? I will point you to the right option.",
        "بالکل۔ ویب سائٹ، سوشل میڈیا یا آن لائن اشتہارات میں سے کیا چاہیے؟",
        "Bilkul. Aapko website, social media ya online advertising mein se kis cheez ki zarurat hai? Main aapko right option guide kar deta hoon.",
      ),
      chips,
    };
  }

  // Customers without a channel
  if (has(q, ["customer", "customers", "sale", "sales", "order", "کسٹمر", "سیلز"])) {
    session.topic = "clarify";
    return {
      text: say(
        mode,
        "Understood. Do you want more customers through a website, Facebook/Instagram ads, or social media content?",
        "سمجھ گیا۔ کسٹمرز ویب سائٹ سے، فیس بک/انسٹا اشتہارات سے، یا سوشل کنٹینٹ سے؟",
        "Samajh gaya. Customers website se chahiye, Facebook/Instagram ads se, ya social content se?",
      ),
      chips,
    };
  }

  // Follow-up yes/explain after ads
  if (session.topic === "ads" && has(q, ["yes", "haan", "han", "explain", "batao", "bata", "process", "جی"])) {
    return {
      text: say(
        mode,
        "Process: we set up Business Manager and pixel, run campaigns, and send a monthly report. Ad spend is paid to Meta. Basic PKR 10,000/month, Growth 15,000, Premium 20,000. WhatsApp +92 330 3129882 to start.",
        "عمل: بزنس منیجر اور پکسل، کیمپینز، ماہانہ رپورٹ۔ بجٹ میٹا کو الگ۔ بیسک 10,000، گروتھ 15,000، پریمیم 20,000۔ شروع: +92 330 3129882۔",
        "Process: Business Manager aur pixel, campaigns, monthly report. Budget Meta ko alag. Basic 10,000, Growth 15,000, Premium 20,000. Start: +92 330 3129882.",
      ),
      chips,
    };
  }

  if (wantHow && session.topic) {
    return {
      text: say(
        mode,
        "Send business name, goal and the service on WhatsApp +92 330 3129882 or the Contact page. The team will reply with the next step.",
        "کاروبار، ہدف اور سروس واٹس ایپ +92 330 3129882 پر بھیجیں۔",
        "Business, goal aur service WhatsApp +92 330 3129882 par bhejein. Team agla step bata degi.",
      ),
      chips,
    };
  }

  return { text: UNCLEAR[mode], chips };
}

export const HELLO: Record<Mode, string> = {
  en: "Hello, I am Synapse Assist. How can I help today? Website, ads, reels, social, or something else?",
  ur: "السلام علیکم، میں سینیپس اسسٹ ہوں۔ آج کیا مدد چاہیے؟ ویب سائٹ، اشتہارات، ریلز، سوشل؟",
  ro: "Salam, main Synapse Assist hoon. Aaj kya help chahiye? Website, ads, reels, social?",
};
