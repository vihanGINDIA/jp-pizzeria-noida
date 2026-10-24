# JP Pizzeria Noida — plan de reprise

## Implementation

The supplied Vite multi-page site remains the source of truth. Keep the four direct routes `/`, `/menu/`, `/story/`, and `/visit/`, with shared navigation, a static `public/manus-routes.json` manifest, and no server/database because the requested experience is static.

The header Call Us journey uses `/visit/#phone-number`, a real `tel:+919870320025` link on the Visit page, and a small client-side fallback so the same-page link uses Lenis and visibly highlights the contact panel. The menu uses verified public highlights only: Traditional Neapolitan Margherita Pizza, Burrata Pizza with Pesto Drizzle, Pizza Bianca, Mediterranean, and Quattro Formaggi. Each menu image and details control opens a native dialog with a source link and a call CTA; price and ingredient claims are intentionally omitted when the public source does not provide them. Hash links from the homepage carousel open the matching menu dialog directly.

Lenis owns smooth scrolling, GSAP/ScrollTrigger owns reveal motion, and the React Bits carousel remains the featured menu interaction. All motion has a reduced-motion escape hatch, and the controls remain keyboard and touch accessible.

## Design

- **Design movement:** editorial neighbourhood trattoria — warm paper, olive ink, tomato accents, and oversized serif headlines.
- **Core principles:** grounded local information, asymmetrical editorial rhythm, honest source labels, and generous touch targets.
- **Color philosophy:** paper and olive create a calm, handmade base; tomato is reserved for calls to action and emphasis.
- **Layout paradigm:** a sequence of full-bleed editorial bands and offset split layouts rather than a dashboard-like grid.
- **Signature elements:** circular brand mark, tomato-dot eyebrow labels, and rounded image crops / map-like rings.
- **Interaction philosophy:** every image is an invitation to inspect, every CTA has an obvious destination, and every external/source link is labeled.
- **Animation:** restrained upward reveals with GSAP and soft Lenis scrolling; no motion is required to understand the content.
- **Typography system:** DM Serif Display for the food-led voice; DM Sans for navigation, labels and utility text.
- **Brand essence:** a warm Noida neighbourhood pizzeria that makes the process part of the meal — thoughtful, welcoming, transparent.
- **Brand voice:** concise, hospitable and specific. Example lines: “Good pizza starts long before the oven.” / “Ask the team what’s fresh today.”
- **Wordmark & logo:** the supplied JP monogram remains the compact mark beside the stacked editorial wordmark.
- **Signature brand color:** tomato red, used sparingly for the call journey and menu emphasis.
