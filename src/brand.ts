/**
 * EV Street Co 
 *
 * Anything still unresolved is `null` on purpose. `null` values render as a
 * visible amber TBD chip (see `src/components/Tbd.astro`) instead of silently
 * disappearing or, worse, being filled with a plausible-looking guess.
 *
 * Rule: if a number is not in this file, it does not go on the page.
 * Every open item below is tracked in
 * `Desktop/EV charging/astrowind-EVC-template.md` § "OPEN — costs money if unresolved".
 */

export const BRAND = {
  name: 'EV Street Co',

  /** OPEN — domain not yet registered for EV Street Co. Was arclightcurb.com under the old name. */
  domain: 'evstreetco.com',
  city: 'Chicago, IL',

  /** OPEN 9 — replace before launch. Needs an @ the new EV Street Co domain once it is registered. */
  email: 'info@evstreetco.com' as string | null,

  /** OPEN — $4k installs do not close on a form alone. */
  phone: '773-234-4394' as string | null,


  /** Claim the handles before linking them. An icon pointing at an empty profile is worse than no icon. */
  social: {
    instagram: 'https://instagram.com/evstreetco' as string | null,
    linkedin: 'https://linkedin.com/company/evstreetco' as string | null,
    x: 'https://x.com/evstreetco' as string | null,
  },
} as const;

/**
 * The fee. Settled: $1.00 per session plus 10% of the charge.
 * Holds 79–83% gross margin at every session size — the percentage component is
 * what keeps a flat fee from inverting on large sessions.
 */
export const FEE = {
  perSession: 1.0,
  percentOfCharge: 10,
  label: '$1 per session + 10%',
} as const;

/**
 * Install pricing.
 *
 * `costTypical` is EV Street Co's cost. `priceLow`/`priceHigh` is the customer
 * range at roughly 50% gross margin.
 *
 * OPEN 2 — the ABC book's own curbside line items (Level 2 Underground Circuit
 * $2,080 + 18" Trench $948 + Disconnect $1,259 + Permit $192) total $4,479
 * retail before hardware, pedestal, or concrete restoration. The range below
 * assumes $2,000 was cost, not price. If it was meant as the customer price,
 * the job loses money on line one.
 */
export const PRICING = {
  costTypical: 2000,
  priceLow: 4000,
  priceHigh: 5500,
  panelUpgradeFrom: 7220,

  /** OPEN 3 — curbside means the public right-of-way. Not in any price book yet. */
  cdotPublicWayPermit: null as number | null,

  /**
   * OPEN 1 — the single decision that determines whether this product works.
   * At $1 + 10% with no minimum, a host nets $5.53/month. At a $5.00 minimum
   * they net $78.15/month. Same fee. Do not publish earnings language until set.
   */
  sessionMinimum: null as number | null,
} as const;

/**
 * Station specification.
 *
 * `kW` is 9.6, not 12. NEC 625.41 treats EV charging as a continuous load, so a
 * 50A circuit may only be loaded to 80% of its rating: 40A x 240V = 9.6 kW.
 * 12 kW is the nameplate arithmetic (240 x 50) and is not deliverable on a 50A
 * breaker. Quoting 12 kW on a public page would be a spec the install cannot
 * meet.
 */
export const HARDWARE = {
  level: 'Level 2',
  volts: 240,
  breakerAmps: 50,
  kW: 9.6,
  connector: 'J1772',
} as const;

/** OPEN 5 — the rebate is the business. Every claim here is gated on the credential. */
export const REBATE = {
  /** Have we been approved as a ComEd EV Service Provider? Until true, no rebate copy ships. */
  isApprovedEVSP: false,
  comEdMakeReadyLow: 5000,
  comEdMakeReadyHigh: 7500,
  programEnds: '2026-12-31',
} as const;

/**
 * Payout timing.
 *
 * OPEN: there is no committed payout schedule yet, so the word "weekly" must not
 * appear anywhere on the site. It was on the page in several places and has been
 * pulled from all of them. Set `schedule` here once it is real, and the copy can
 * state it again.
 */
export const PAYOUT = {
  schedule: null as string | null,
  disclaimer:
    'Payout timing is still being finalized. We will confirm your payout schedule in writing, in your service agreement, before your station goes live.',
} as const;

/** OPEN — warranty and insurance. Both get asked on the first sales call. */
export const TERMS = {
  installWarranty: null as string | null,
  hardwareWarranty: null as string | null,
  insuranceCarried: null as string | null,
} as const;

/**
 * Where the estimate form posts.
 *
 * null = the form renders in a visibly disabled state rather than pretending to
 * submit. AstroWind's built-in <Form> has no action attribute and silently
 * swallows submissions; that is a worse failure than an honest disabled button.
 *
 * Set to a Tally or Formspree endpoint before launch, then test that a real
 * submission lands in an inbox someone reads.
 */
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit' as string | null;

/**
 * Web3Forms access key. Public by design (see web3forms.com/faq — it's a
 * routing address, not a secret), which is why it's fine sitting here in the
 * client-shipped bundle rather than an env var.
 */
export const FORM_ACCESS_KEY = '8a89794d-333b-44ca-9f97-e0e8b01d48b4' as string | null;

/** Pre-revenue. No customers, no logos, no press, no counts. Keep this empty. */
export const PROOF = {
  installsCompleted: 0,
  unitsInService: 0,
} as const;

export const money = (n: number) => `$${n.toLocaleString('en-US')}`;
