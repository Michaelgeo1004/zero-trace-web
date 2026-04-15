export const site = {
  name: "Zero Trace",
  /** Campaign assets in `/public/brand/` (Gemini-generated set) */
  assets: {
    /** Primary brand badge in circle form; favicon is still from `src/app/icon.png`. */
    logo: "/brand/logo-zero-trace.png",
    /** Default wide kit reference (latest Gemini set) */
    kitFlatlay: "/brand/kit-showcase-spread.png",
    kit: {
      /** Campaign hero — distinct from tier cards & solution showcase */
      hero: "/brand/hero-campaign.png",
      solutionBanner: "/brand/kit-showcase-spread.png",
    },
  },
  tagline: "Reusable Sustainable Event Kits as a Service",
  description:
    "End-to-end zero-waste event kits—delivered, collected, cleaned, and redeployed—for organizers who want less plastic and less stress.",
  program:
    "Venture developed through the Wadhwani Foundation Ignite India program; MBA coursework at Sathyabama Institute of Science and Technology, Chennai.",
  links: {
    landing: "https://zero-trace-web-eta.vercel.app/",
    pitchVideo: "https://res.cloudinary.com/dfh82ci4t/video/upload/v1776242102/zero-trace-promo.mp4",
  },
  contact: {
    email: "hello.0.trace@gmail.com",
    phone: "+91 — 8056891004",
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
    /** Stable sentence + animated keyword typing in `HeroRotatingHeadline`. */
    headlinePrefix: "Zero-waste events, without the hassle of",
    headlineKeywords: [
      "disposable hangover",
      "single-use mess",
      "plastic aftertaste",
      "wasteful aftermath",
      "environmental impact",
      "sustainable solutions",
      "eco-friendly events",
      "zero-waste initiatives",
      "eco-conscious gatherings",
      "sustainable operations",
      "eco-friendly event kits",
      "zero-waste event kits",
    ],
    headlineSuffix: ".",
    sub:
      "Rent complete reusable kits for weddings, corporate gatherings, and campus events—so sustainability is operational, not optional.",
    ctaPrimary: "Plan an event",
    ctaSecondary: "See the kits",
    operationsCaption:
      "Sanitized kits, polished brand touchpoints, and dependable logistics that hold up during real event runs.",
    /**
     * Single hero carousel (see `HeroVisualDeck`) — omits warehouse fulfillment frame
     * so it does not repeat Tier 3 card art.
     */
    visualDeck: [
      {
        src: "/brand/hero-campaign.png",
        label: "Signature",
        alt: "Campaign hero — reusable event kits and branded presentation",
      },
      {
        src: "/brand/kit-showcase-spread.png",
        label: "Full kit",
        alt: "Full reusable kit on table with tote, glassware, and linens",
      },
      {
        src: "/brand/kit-tier-social.png",
        label: "Social",
        alt: "Wedding and celebration tablescape with reusables",
      },
      {
        src: "/brand/kit-tier-corporate.png",
        label: "Programs",
        alt: "Corporate desk kit with notebook, cup, and program collateral",
      },
    ],
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
    /**
     * Hero-style showcase (replaces a single ultra-wide crop).
     * Mirrors venture story: deliver → use → collect → redeploy.
     */
    /** Shown above the three tier cards */
    kitTiersIntro:
      "Three distinct compositions—intimate socials, branded programs, and operations—not the same plate-and-spoon crop repeated.",
    showcase: {
      kicker: "End-to-end kit service",
      title: "Built for real event operations",
      lead:
        "Validated with organizers and stakeholders—kits are designed around rental, return, cleaning, and inventory—not a one-off swap for disposables.",
      /** Full table + tote spread; inset = corporate program props */
      imagePrimary: "/brand/kit-showcase-spread.png",
      imageSecondary: "/brand/kit-tier-corporate.png",
      steps: [
        {
          title: "Deliver",
          detail: "Kits sized to guest count, venue flow, and event type.",
        },
        {
          title: "Use",
          detail: "Service-ware, signage, and segregation tools guests actually touch.",
        },
        {
          title: "Collect & sanitize",
          detail: "Pickup and professional cleaning so everything is event-ready again.",
        },
        {
          title: "Redeploy",
          detail: "Tracked inventory and repeat deployment—where the model earns its margin.",
        },
      ],
    },
    /** Latest tier art in `/public/brand/kit-tier-*.png` */
    kitImages: [
      {
        kind: "dining",
        tier: "Tier 1 · Intimate & social",
        title: "Weddings & celebrations",
        image: "/brand/kit-tier-social.png",
        objectPosition: "50% 48%",
        blurb: "Full tablescape—ceramics, glassware, cutlery, linens, florals, and printed run-of-show.",
        includes: [
          "Plates, bowls & glassware",
          "Cutlery + green tumblers",
          "Linen + tent / menu cards",
          "Centerpiece-ready styling",
        ],
      },
      {
        kind: "signage",
        tier: "Tier 2 · Corporate & campus",
        title: "Programs & venues",
        image: "/brand/kit-tier-corporate.png",
        objectPosition: "50% 45%",
        blurb: "Desk and registration touchpoints—notebook, pen, cup, QR stand, and badge-ready collateral.",
        includes: [
          "Notebook & wood pen",
          "QR / program tent",
          "ID badge + tray",
          "Conference-ready palette",
        ],
      },
      {
        kind: "loop",
        tier: "Tier 3 · Fulfillment",
        title: "Sanitize & redeploy",
        image: "/brand/kit-loop.png",
        objectPosition: "50% 48%",
        blurb: "Circularity in practice—return, sanitation, and inventory so the same kit line serves the next guest list.",
        includes: [
          "Reuse-first workflow",
          "Cleaning & QA handoff",
          "Tracked kit lines",
          "Ready for the next deployment",
        ],
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
