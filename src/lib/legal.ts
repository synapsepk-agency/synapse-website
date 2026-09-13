export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h"; text: string };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export const PRIVACY_UPDATED = "September 12, 2026";
export const TERMS_UPDATED = "September 12, 2026";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: "1. Introduction",
    blocks: [
      {
        type: "p",
        text: "Welcome to Synapse Marketing Agency. We are a digital marketing and web development agency based in Pakistan, serving local businesses, startups, and growing businesses.",
      },
      {
        type: "p",
        text: "This Privacy Policy explains how we collect, use, and protect your information when you visit our website, contact us, or use our services.",
      },
      {
        type: "p",
        text: "By using our website, you agree to the practices described in this policy.",
      },
    ],
  },
  {
    title: "2. About Us",
    blocks: [
      {
        type: "ul",
        items: [
          "Business Name: Synapse Marketing Agency",
          "Business Type: Digital Marketing & Web Development Agency",
          "Location: Quetta, Balochistan, Pakistan",
          "Email: synapseagency.pk@gmail.com",
          "Phone / WhatsApp: +92 330 3129882",
        ],
      },
    ],
  },
  {
    title: "3. Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We may collect the following information when you contact us or use our website.",
      },
      { type: "h", text: "Information You Provide" },
      {
        type: "ul",
        items: [
          "Your name",
          "Email address",
          "Phone number or WhatsApp number",
          "Business or company name",
          "Service you are interested in",
          "Project requirements and other information you choose to share",
        ],
      },
      { type: "h", text: "Information Collected Automatically" },
      {
        type: "p",
        text: "Our website or hosting provider may collect basic technical information, such as:",
      },
      {
        type: "ul",
        items: ["IP address", "Browser and device information", "Pages visited", "Website usage and security logs"],
      },
      {
        type: "p",
        text: "The information collected depends on the tools and features enabled on our website.",
      },
    ],
  },
  {
    title: "4. How We Use Your Information",
    blocks: [
      { type: "p", text: "We may use your information to:" },
      {
        type: "ul",
        items: [
          "Respond to your inquiries and messages.",
          "Discuss your project requirements.",
          "Provide information about our services.",
          "Prepare project proposals or pricing details when requested.",
          "Deliver and manage our services.",
          "Improve website performance and user experience.",
          "Maintain business and communication records.",
          "Protect our website against spam, misuse, and security threats.",
        ],
      },
    ],
  },
  {
    title: "5. Services and Client Information",
    blocks: [
      {
        type: "p",
        text: "If you become our client, you may share business information, website content, marketing requirements, or access to digital platforms necessary for the agreed services.",
      },
      {
        type: "p",
        text: "We use such information only for legitimate business purposes and to deliver the agreed work.",
      },
      {
        type: "p",
        text: "Please do not share passwords, payment card details, or other sensitive information through public forms or ordinary messages. Use secure methods when sharing information required for a project.",
      },
    ],
  },
  {
    title: "6. Information Sharing",
    blocks: [
      { type: "p", text: "We do not sell your personal information." },
      {
        type: "p",
        text: "We may share information with trusted service providers when necessary to operate our website or deliver services, such as:",
      },
      {
        type: "ul",
        items: [
          "Website hosting providers",
          "Email and communication services",
          "Analytics or security tools",
          "Other service providers required for a project",
        ],
      },
      {
        type: "p",
        text: "We may also disclose information where required by law or necessary to protect our legal rights and website security.",
      },
    ],
  },
  {
    title: "7. Third-Party Websites",
    blocks: [
      {
        type: "p",
        text: "Our website may contain links to third-party platforms, including WhatsApp, Instagram, Facebook, TikTok, and other websites.",
      },
      {
        type: "p",
        text: "When you visit those platforms, their own privacy policies and terms apply. Synapse Marketing Agency does not control how third-party platforms collect or use your information.",
      },
    ],
  },
  {
    title: "8. Cookies",
    blocks: [
      {
        type: "p",
        text: "Our website may use cookies or similar technologies to improve functionality, remember preferences, understand website usage, or support security.",
      },
      {
        type: "p",
        text: "The use of cookies depends on the features and tools installed on our website. You can manage cookies through your browser settings.",
      },
    ],
  },
  {
    title: "9. Data Security",
    blocks: [
      {
        type: "p",
        text: "We take reasonable steps to protect the information shared with us against unauthorized access, misuse, or disclosure.",
      },
      {
        type: "p",
        text: "However, no website or online communication system can be guaranteed to be completely secure.",
      },
    ],
  },
  {
    title: "10. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal and business information only for as long as reasonably necessary for the purposes described in this policy, to maintain business records, or to meet applicable legal obligations.",
      },
    ],
  },
  {
    title: "11. Your Privacy Choices",
    blocks: [
      { type: "p", text: "You may contact us to:" },
      {
        type: "ul",
        items: [
          "Ask what personal information we hold about you.",
          "Request correction of inaccurate information.",
          "Ask us to delete information where appropriate.",
          "Request that we stop using your information for optional communications.",
        ],
      },
      {
        type: "p",
        text: "Some information may need to be retained where required for legal, security, or business record purposes.",
      },
    ],
  },
  {
    title: "12. Children’s Privacy",
    blocks: [
      {
        type: "p",
        text: "Our website and services are intended for businesses and general audiences. We do not knowingly collect personal information from children for business purposes.",
      },
    ],
  },
  {
    title: "13. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date.",
      },
    ],
  },
  {
    title: "14. Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have any questions about this Privacy Policy or how we handle your information, please contact us.",
      },
      {
        type: "ul",
        items: [
          "Synapse Marketing Agency",
          "Email: synapseagency.pk@gmail.com",
          "Phone / WhatsApp: +92 330 3129882",
          "Location: Quetta, Balochistan, Pakistan",
        ],
      },
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: "1. Introduction",
    blocks: [
      { type: "p", text: "Welcome to Synapse Marketing Agency." },
      {
        type: "p",
        text: "These Terms & Conditions govern your use of our website and the services provided by Synapse Marketing Agency.",
      },
      {
        type: "p",
        text: "By accessing our website, contacting us, or engaging our services, you agree to these Terms & Conditions.",
      },
      {
        type: "p",
        text: "If you do not agree with these terms, please do not use our website or services.",
      },
    ],
  },
  {
    title: "2. About Us",
    blocks: [
      {
        type: "ul",
        items: [
          "Business Name: Synapse Marketing Agency",
          "Tagline: CREATE. CONNECT. GROW.",
          "Business Type: Digital Marketing & Web Development Agency",
          "Location: Quetta, Balochistan, Pakistan",
          "Email: synapseagency.pk@gmail.com",
          "Phone / WhatsApp: +92 330 3129882",
        ],
      },
    ],
  },
  {
    title: "3. Our Services",
    blocks: [
      { type: "p", text: "Synapse Marketing Agency provides the following services:" },
      {
        type: "ul",
        items: [
          "Meta Ads",
          "Web Development",
          "Social Media Management",
          "SEO",
          "Brand Identity Themes",
          "Business Growth Consultancy",
          "Videography & Content Creation",
        ],
      },
      {
        type: "p",
        text: "The exact services, deliverables, pricing, and timelines will be confirmed with the client before work begins.",
      },
    ],
  },
  {
    title: "4. Website Use",
    blocks: [
      {
        type: "p",
        text: "You may use our website to learn about our services and contact us for business inquiries.",
      },
      { type: "p", text: "You agree not to:" },
      {
        type: "ul",
        items: [
          "Use our website for unlawful or fraudulent purposes.",
          "Attempt to damage, disrupt, or gain unauthorized access to our website.",
          "Copy or reproduce our website content, branding, or designs without permission.",
          "Submit false, misleading, or abusive information.",
          "Use our website to distribute spam or harmful material.",
        ],
      },
    ],
  },
  {
    title: "5. Service Agreements",
    blocks: [
      {
        type: "p",
        text: "Each client project will be based on a mutual agreement between the client and Synapse Marketing Agency.",
      },
      { type: "p", text: "The agreement may include:" },
      {
        type: "ul",
        items: [
          "Service scope and deliverables",
          "Project timeline",
          "Pricing and payment schedule",
          "Revision limits",
          "Client responsibilities",
          "Hosting, domain, and third-party costs",
          "Other project-specific terms",
        ],
      },
      {
        type: "p",
        text: "Any written proposal, agreement, or confirmed communication may form part of the agreed project terms.",
      },
    ],
  },
  {
    title: "6. Pricing and Payments",
    blocks: [
      {
        type: "p",
        text: "Our service prices depend on the selected package, project requirements, and agreed scope.",
      },
      { type: "p", text: "Payment terms will be communicated before work begins." },
      { type: "p", text: "Unless otherwise agreed:" },
      {
        type: "ul",
        items: [
          "The client must provide the agreed initial payment before project work starts.",
          "Additional payments, milestones, or monthly fees will follow the agreed schedule.",
          "Additional work outside the agreed scope may require additional charges.",
          "Domain, hosting, advertising budgets, premium tools, plugins, and other third-party costs are separate unless specifically included in the agreement.",
        ],
      },
      {
        type: "p",
        text: "For videography and content creation, any agreed shoot-related expenses will be confirmed with the client before work begins.",
      },
    ],
  },
  {
    title: "7. Videography & Content Creation",
    blocks: [
      {
        type: "p",
        text: "For videography and content creation projects, the agreed Service Scope will specify where applicable:",
      },
      {
        type: "ul",
        items: [
          "Number of reels or videos",
          "Video duration",
          "Recording / shoot location",
          "Shoot date and timing",
          "Editing requirements",
          "Number of revisions",
          "Final delivery format",
          "Expected delivery date",
        ],
      },
      { type: "h", text: "7.1 Recording and Shoot" },
      {
        type: "p",
        text: "The client must provide the required information, products, location access, models, and other materials necessary for the agreed shoot, unless otherwise included in writing.",
      },
      {
        type: "p",
        text: "Additional shoot sessions, recording, travel, location charges, equipment, or production requirements outside the agreed scope may be charged separately.",
      },
      { type: "h", text: "7.2 Editing and Revisions" },
      {
        type: "p",
        text: "Video editing will be completed according to the agreed creative direction and Service Scope.",
      },
      {
        type: "p",
        text: "Revisions are included according to the selected package. Major changes, additional revisions, reshoots, or new creative requirements outside the agreed scope may require additional charges.",
      },
      { type: "h", text: "7.3 Content Delivery" },
      {
        type: "p",
        text: "Final videos will be delivered according to the agreed format, platform requirements, and delivery schedule.",
      },
      {
        type: "p",
        text: "Raw footage, editable project files, and source materials are not included unless specifically agreed in writing.",
      },
      { type: "h", text: "7.4 Content Usage and Ownership" },
      {
        type: "p",
        text: "Ownership and usage rights for final videos, edited reels, and other content deliverables will be according to the agreed project terms and full payment.",
      },
      {
        type: "p",
        text: "The client receives the agreed rights to use the final delivered content for its business purposes. The agency retains ownership of its pre-existing materials, templates, methods, and internal resources.",
      },
    ],
  },
  {
    title: "8. Web Development Services",
    blocks: [
      { type: "p", text: "For website development:" },
      {
        type: "ul",
        items: [
          "The client must provide accurate content, images, logos, and required materials.",
          "Project timelines depend on receiving the necessary information and approvals.",
          "Additional features or changes outside the agreed scope may require extra charges.",
          "Domain and hosting arrangements will be confirmed with the client.",
          "The client is responsible for reviewing and approving final website content before launch.",
        ],
      },
    ],
  },
  {
    title: "9. Meta Ads and Marketing Services",
    blocks: [
      { type: "p", text: "For Meta Ads and other marketing services:" },
      {
        type: "ul",
        items: [
          "Advertising budgets are paid by the client unless otherwise agreed.",
          "Advertising campaigns are managed according to the agreed service scope.",
          "Results depend on budget, audience, competition, offer, platform performance, and other factors.",
          "We do not guarantee a specific number of leads, sales, followers, revenue, or return on investment.",
          "Meta, Instagram, and other advertising platforms may reject, restrict, or change campaigns according to their policies.",
          "The client is responsible for ensuring that their business, products, claims, and advertising materials comply with applicable laws and platform rules.",
        ],
      },
    ],
  },
  {
    title: "10. Client Responsibilities",
    blocks: [
      { type: "p", text: "Clients agree to:" },
      {
        type: "ul",
        items: [
          "Provide accurate information and required materials.",
          "Respond to project communications in a timely manner.",
          "Provide necessary approvals and access when required.",
          "Make payments according to the agreed schedule.",
          "Ensure they have the right to use supplied content, images, logos, and materials.",
          "Avoid requesting unlawful, fraudulent, or harmful services.",
        ],
      },
    ],
  },
  {
    title: "11. Revisions and Changes",
    blocks: [
      {
        type: "p",
        text: "Revisions will be handled according to the agreed package or project scope.",
      },
      {
        type: "p",
        text: "Requests for additional revisions, features, or changes beyond the agreed scope may result in additional charges or changes to the timeline.",
      },
    ],
  },
  {
    title: "12. Intellectual Property",
    blocks: [
      { type: "p", text: "Unless otherwise agreed in writing:" },
      {
        type: "ul",
        items: [
          "Synapse Marketing Agency retains ownership of its pre-existing designs, templates, methods, branding, and internal materials.",
          "Client-provided content remains the property of the client or its rightful owner.",
          "Ownership or usage rights for final project deliverables will depend on the agreed project terms and payment completion.",
          "We may display completed work in our portfolio only where permitted by the client or agreed in writing.",
        ],
      },
    ],
  },
  {
    title: "13. Third-Party Platforms",
    blocks: [
      {
        type: "p",
        text: "Our services may involve third-party platforms such as Meta, Instagram, WhatsApp, hosting providers, analytics tools, editing software, or other services.",
      },
      {
        type: "p",
        text: "We do not control third-party platform availability, policies, pricing, technical issues, or account decisions.",
      },
      {
        type: "p",
        text: "Clients are responsible for complying with the terms and policies of platforms they use.",
      },
    ],
  },
  {
    title: "14. Cancellation and Refund",
    blocks: [
      {
        type: "p",
        text: "If the client cancels after work has started, payment for completed work and incurred third-party costs remains payable.",
      },
      {
        type: "p",
        text: "Advance payments may be non-refundable once work has commenced, subject to the agreed project terms and applicable law.",
      },
      { type: "h", text: "14.1 Videography Cancellation" },
      {
        type: "p",
        text: "If a client cancels or postpones a confirmed shoot after arrangements have been made, any applicable completed work, booked resources, travel expenses, location charges, or other incurred costs remain payable.",
      },
      {
        type: "p",
        text: "Any rescheduling or cancellation arrangements will be handled according to the agreed project terms.",
      },
    ],
  },
  {
    title: "15. Confidentiality",
    blocks: [
      {
        type: "p",
        text: "Both parties agree to keep confidential business, account, pricing, and project information private unless disclosure is authorized or legally required.",
      },
      {
        type: "p",
        text: "Any confidential information shared during videography, content creation, marketing, or other services will be handled for the agreed business purpose.",
      },
    ],
  },
  {
    title: "16. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "We will make reasonable efforts to deliver the agreed services professionally.",
      },
      {
        type: "p",
        text: "However, we are not responsible for losses or delays caused by circumstances beyond our reasonable control, including:",
      },
      {
        type: "ul",
        items: [
          "Third-party platform outages or policy changes",
          "Advertising account restrictions or suspensions",
          "Hosting or domain issues caused by third-party providers",
          "Client delays in providing content, approvals, or payments",
          "Unforeseen technical or operational issues",
        ],
      },
      {
        type: "p",
        text: "We do not guarantee specific business results, revenue, rankings, or advertising performance.",
      },
      {
        type: "p",
        text: "To the extent permitted by applicable law, any liability arising from a specific service will be limited to the amount paid for that service, unless otherwise required by law or agreed in writing.",
      },
    ],
  },
  {
    title: "17. Termination",
    blocks: [
      {
        type: "p",
        text: "Either party may request to end a project or ongoing service according to the agreed project terms.",
      },
      {
        type: "p",
        text: "The client remains responsible for approved work completed and outstanding payments up to the effective termination date.",
      },
      {
        type: "p",
        text: "Any refund or cancellation arrangements will depend on the applicable agreement and work already completed.",
      },
    ],
  },
  {
    title: "18. Privacy",
    blocks: [
      {
        type: "p",
        text: "Information collected through our website or services is handled according to our Privacy Policy.",
      },
      {
        type: "p",
        text: "Please review our Privacy Policy for details about information collection, use, and protection.",
      },
    ],
  },
  {
    title: "19. Changes to These Terms",
    blocks: [
      { type: "p", text: "We may update these Terms & Conditions from time to time." },
      {
        type: "p",
        text: "The updated version will be posted on this page with a revised “Last Updated” date.",
      },
    ],
  },
  {
    title: "20. Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms & Conditions are intended to be interpreted under the applicable laws of Pakistan, subject to any mandatory rights or legal requirements that apply.",
      },
    ],
  },
  {
    title: "21. Contact Us",
    blocks: [
      {
        type: "p",
        text: "For questions about these Terms & Conditions, please contact us.",
      },
      {
        type: "ul",
        items: [
          "Synapse Marketing Agency",
          "Email: synapseagency.pk@gmail.com",
          "Phone / WhatsApp: +92 330 3129882",
          "Location: Quetta, Balochistan, Pakistan",
        ],
      },
    ],
  },
];
