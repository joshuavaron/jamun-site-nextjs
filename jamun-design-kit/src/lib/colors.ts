// Brand palette for the design system.
//
// The design uses raw hex at the call site (e.g. `text-[#397bce]`,
// `panelBg="#f97316"`) rather than Tailwind color utilities, so the colors
// stay visible where they're used. These constants are the single source of
// truth — re-theme the whole site by changing them here and updating the
// matching CSS variables in `globals.css`.

export const palette = {
  /** Primary — buttons, links, the blue testimonial panel. */
  blue: "#397bce",
  /** Primary hover / dark. */
  blueDark: "#2a5fa3",
  /** Accent — highlights, orange testimonial panel, Donate CTA. */
  orange: "#f97316",
  /** Accent hover / dark. */
  orangeDark: "#ea580c",
  /** Theme purple — purple testimonial panel. */
  purple: "#9333ea",
  /** Theme emerald — emerald testimonial panel. */
  emerald: "#10b981",
  /** Body text on light backgrounds. */
  ink: "#0a0a0a",
  /** Footer / dark sections. */
  slate900: "#0f172a",
} as const;

// Accent cycle for skill / feature grids. Each card's IconTile and ArrowLink
// take the next color in the cycle so a long grid stays visually varied.
export const accentCycle = [
  "#397bce", // blue
  "#9333ea", // purple
  "#10b981", // emerald
  "#f97316", // orange
  "#0ea5e9", // sky
  "#eab308", // yellow
  "#ec4899", // pink
  "#f97316", // orange
] as const;
