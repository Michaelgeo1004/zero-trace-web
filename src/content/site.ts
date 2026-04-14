export const site = {
  name: "Zero Trace",
  tagline: "Reusable Sustainable Event Kits as a Service",
  description:
    "End-to-end zero-waste event kits—delivered, collected, cleaned, and redeployed—for organizers who want less plastic and less stress.",
  program:
    "Venture developed through the Wadhwani Foundation Ignite India program; MBA coursework at Sathyabama Institute of Science and Technology, Chennai.",
  links: {
    landing: "https://zerotraceevents.my.canva.site",
    pitchVideo: "https://youtu.be/zerotracepitch",
  },
  contact: {
    email: "hello@zerotrace.events",
    phone: "+91 — update with your number",
    city: "Chennai, Tamil Nadu",
    instagram: "@zerotraceevents",
  },
  marquee: [
    "Reusable cutlery · plates · cups",
    "Décor · signage · waste-segregation tools",
    "Rental · return · professional cleaning",
    "Subscription-first · pay-per-use available",
    "Chennai & Tamil Nadu → metros next",
  ],
  hero: {
    headline: "Zero-waste events, without the disposable hangover.",
    sub:
      "Rent complete reusable kits for weddings, corporate gatherings, and campus events—so sustainability is operational, not optional.",
    ctaPrimary: "Plan an event",
    ctaSecondary: "See the kits",
  },
  problem: {
    title: "The problem",
    lead: "Single-use culture at events is expensive—for the planet and for organizers.",
    stats: [
      {
        label: "Event waste",
        value: "40%+",
        detail: "Single-use plastics drive a large share of event waste, adding landfill pressure and disposal cost.",
      },
      {
        label: "Organizer pain",
        value: "Logistics + guilt",
        detail:
          "Disposables are easy to buy but hard to justify; eco options are often piecemeal and inconsistent.",
      },
      {
        label: "What we heard",
        value: "25 interviews",
        detail:
          "Problem validation included 10 in-person and 15 virtual conversations; 30 stakeholders saw the problem as important; 8 were dissatisfied with current alternatives.",
      },
    ],
    narrative: [
      "Events lean on disposables for convenience, then pay again in hauling, sorting, and reputational risk.",
      "The gap isn’t intent—it’s access to a turnkey reusable system that matches real event operations.",
    ],
  },
  solution: {
    title: "The solution",
    subtitle: "Reusable Sustainable Event Kits as a Service",
    body: [
      "We provide end-to-end, zero-waste kits—reusable cutlery, plates, cups, décor, signage, and waste-segregation tools—on a rental basis.",
      "Core building blocks: eco materials, durable kit design, cleaning and sanitation, reuse logistics, and inventory tracking.",
    ],
    features: [
      "Reusable kits with durable materials",
      "Rental, pickup, and return workflow",
      "Customizable sets by event type",
      "Hygienic cleaning and packaging",
      "Designed to cut single-use plastic intensity",
    ],
    uniqueness: [
      "Circular, reuse-first model—not a disposable swap that still lands in the bin",
      "Cost discipline through repeat deployment",
      "Modular kits planners can standardize across clients",
    ],
    kitImages: [
      {
        kind: "dining",
        title: "Dining starter kit",
      },
      {
        kind: "signage",
        title: "Signage and decor set",
      },
      {
        kind: "loop",
        title: "Return and clean loop",
      },
    ],
    pricing: {
      headline: "Pricing (rental)",
      detail:
        "Rs. 50–100 per kit (rental basis), with subscription as the primary revenue model and pay-per-use as secondary.",
      volume:
        "Planning basis: 200–300 kits per month in Year 1 with roughly 10–15% expected monthly sales growth.",
    },
  },
  impact: {
    title: "Impact & financial outlook",
    subtitle: "Figures from the venture performance summary (Year 1 projections).",
    metrics: [
      { label: "Year 1 revenue", value: "Rs. 2,98,000" },
      { label: "Gross profit (Year 1)", value: "Rs. 1,78,000" },
      { label: "Net profit (Year 1)", value: "Rs. 98,000" },
      { label: "Break-even", value: "Month 8" },
    ],
    market: [
      {
        label: "Global eco-event market (TAM reference)",
        value: "~$500B",
        source: "Fortune Business Insights 2024 industry report (cited in venture report).",
      },
      {
        label: "India reusable segment",
        value: "7–8% CAGR",
        source: "Macro view cited in venture materials.",
      },
      {
        label: "SOM anchor",
        value: "Rs. 50L / 2 yrs",
        detail:
          "Serviceable obtainable market noted for the first two operating years in urban India.",
      },
    ] as const,
    viability: {
      score: "86.66%",
      label: "Venture viability index (course assessment)",
      note: "Strengths: committed team, differentiated reusable positioning, feasible operations. Improvement areas: deepen pricing validation, marketing execution, and customer insight.",
    },
    prototype: {
      title: "Prototype signal",
      stats: [
        { label: "Users engaged", value: "20" },
        { label: "Loved the prototype", value: "15" },
        { label: "Neutral / unhappy", value: "5" },
      ],
      feedback:
        "Loved the concept, kit completeness, and packaging; concerns included perceived upfront cost vs. disposables and return logistics convenience.",
    },
  },
  team: {
    title: "Team",
    members: [
      {
        name: "Mickence Jaba Joel M",
        role: "Marketing & Sales",
        skills: "Marketing, Sales",
        image: "/team-mickence.svg",
      },
      {
        name: "Shanmuga Priya K",
        role: "Strategy & Planning",
        skills: "Strategy, Research",
        image: "/team-shanmuga.svg",
      },
      {
        name: "Merina Abil A",
        role: "Operations & Finance",
        skills: "Operations, Finance",
        image: "/team-merina.svg",
      },
    ],
  },
  contactSection: {
    title: "Start a zero-waste event",
    lead: "Tell us about your date, guest count, and city—we’ll follow up with kit options and logistics.",
    privacy:
      "We use your details only to respond to this inquiry. We do not sell personal data.",
  },
  footer: {
    mission:
      "Make events zero-waste with reusable kits that cut environmental impact and keep celebrations responsible.",
    mentor: "Faculty mentor: Dr. K. Sasirekha, School of Management Studies, Sathyabama.",
  },
} as const;

export type SiteContent = typeof site;
