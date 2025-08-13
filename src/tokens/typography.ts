// Typography Design Tokens
// Based on base-100 scale (100 = 1rem) using minor third scale
// Core tokens are size-independent, application styles are separate

// ============================================================================
// CORE TYPE FACES
// ============================================================================

export const typefaces = {
  // Primary serif font for headings and display text
  serif: {
    primary: "'TT Ramillas', serif",
    secondary: "'DM Serif Display', serif",
    fallback: "Georgia, 'Times New Roman', Times, serif",
  },
  
  // Primary sans-serif font for body text and UI
  sans: {
    primary: "'PolySans', sans-serif",
    secondary: "'PolySans', 'Fira Sans', 'Arial', sans-serif",
    fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  
  // Monospace font for code, labels, and technical content
  mono: {
    primary: "'Space Mono', 'Fira Mono', 'Menlo', monospace",
    fallback: "Consolas, 'Courier New', monospace",
  },
} as const;

// ============================================================================
// CORE FONT WEIGHTS
// ============================================================================

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// ============================================================================
// CORE LINE HEIGHTS
// ============================================================================

export const lineHeights = {
  tight: 1.1,        // Very tight (hero titles)
  snug: 1.2,         // Snug (headings)
  normal: 1.4,       // Normal (body text)
  relaxed: 1.5,      // Relaxed (body text)
  loose: 1.6,        // Loose (body text)
  veryLoose: 1.7,    // Very loose (body text)
} as const;

// ============================================================================
// CORE LETTER SPACING
// ============================================================================

export const letterSpacing = {
  tight: "-0.02em",  // Tight (hero titles)
  normal: "0em",     // Normal
  wide: "0.12em",    // Wide (labels, chips)
} as const;

// ============================================================================
// CORE FONT SIZES (Base-100 scale with Minor Third)
// ============================================================================

// Minor Third scale: 1.2 ratio
// Base: 100 = 1rem
// Scale: 100, 120, 144, 173, 207, 248, 298, 357, 429, 514, 617, 740

export const fontSizes = {
  // Small scale (captions, labels, fine print)
  xs: "0.8rem",      // 80 (514 ÷ 1.2)
  sm: "0.9rem",      // 90 (617 ÷ 1.2)
  
  // Base scale (body text, UI elements)
  base: "1rem",      // 100 (base)
  md: "1.2rem",      // 120
  
  // Large scale (headings, emphasis)
  lg: "1.44rem",     // 144
  xl: "1.73rem",     // 173
  
  // Display scale (hero, large headings)
  xxl: "2.07rem",    // 207
  xxxl: "2.48rem",   // 248
  display: "2.98rem", // 298
  
  // Hero scale (very large display text)
  hero: "3.57rem",   // 357
  heroLg: "4.29rem", // 429
  heroXl: "5.14rem", // 514
} as const;

// ============================================================================
// CORE TYPOGRAPHY TOKENS (Size-independent)
// ============================================================================

export const typographyTokens = {
  // Font families
  fontFamily: {
    serif: typefaces.serif.primary,
    sans: typefaces.sans.primary,
    mono: typefaces.mono.primary,
  },
  
  // Font weights
  fontWeight: fontWeights,
  
  // Line heights
  lineHeight: lineHeights,
  
  // Letter spacing
  letterSpacing: letterSpacing,
  
  // Font sizes
  fontSize: fontSizes,
} as const;

// ============================================================================
// APPLICATION-SPECIFIC TYPOGRAPHY STYLES
// ============================================================================

export const typographyStyles = {
  // Display styles (hero, large headings)
  display: {
    hero: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.hero,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.tight,
      letterSpacing: typographyTokens.letterSpacing.tight,
    },
    heroMobile: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.display,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.snug,
      letterSpacing: typographyTokens.letterSpacing.tight,
    },
    large: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.heroLg,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
    medium: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.xxxl,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
    small: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.xxl,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
  },
  
  // Heading styles
  heading: {
    h1: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.xl,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
    h2: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.lg,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
    h3: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.md,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
    h4: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.base,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.snug,
    },
  },
  
  // Body text styles
  body: {
    large: {
      fontFamily: typographyTokens.fontFamily.sans,
      fontSize: typographyTokens.fontSize.lg,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.relaxed,
    },
    medium: {
      fontFamily: typographyTokens.fontFamily.sans,
      fontSize: typographyTokens.fontSize.md,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.relaxed,
    },
    base: {
      fontFamily: typographyTokens.fontFamily.sans,
      fontSize: typographyTokens.fontSize.base,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.normal,
    },
    small: {
      fontFamily: typographyTokens.fontFamily.sans,
      fontSize: typographyTokens.fontSize.sm,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.normal,
    },
  },
  
  // UI text styles
  ui: {
    label: {
      fontFamily: typographyTokens.fontFamily.mono,
      fontSize: typographyTokens.fontSize.xs,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.normal,
      letterSpacing: typographyTokens.letterSpacing.wide,
      textTransform: "uppercase" as const,
    },
    caption: {
      fontFamily: typographyTokens.fontFamily.mono,
      fontSize: typographyTokens.fontSize.sm,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.normal,
    },
    button: {
      fontFamily: typographyTokens.fontFamily.sans,
      fontSize: typographyTokens.fontSize.base,
      fontWeight: typographyTokens.fontWeight.semibold,
      lineHeight: typographyTokens.lineHeight.normal,
    },
    nav: {
      fontFamily: typographyTokens.fontFamily.sans,
      fontSize: typographyTokens.fontSize.base,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.normal,
    },
  },
  
  // Special purpose styles
  special: {
    eyebrow: {
      fontFamily: typographyTokens.fontFamily.mono,
      fontSize: typographyTokens.fontSize.xs,
      fontWeight: typographyTokens.fontWeight.bold,
      lineHeight: typographyTokens.lineHeight.normal,
      letterSpacing: typographyTokens.letterSpacing.wide,
      textTransform: "uppercase" as const,
    },
    quote: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: typographyTokens.fontSize.xl,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.relaxed,
    },
    code: {
      fontFamily: typographyTokens.fontFamily.mono,
      fontSize: typographyTokens.fontSize.base,
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.normal,
    },
  },
} as const;

// ============================================================================
// RESPONSIVE TYPOGRAPHY HELPERS
// ============================================================================

export const responsiveTypography = {
  // Responsive font size helpers using clamp
  clamp: {
    hero: "clamp(2.5rem, 6vw, 3.5rem)",
    heroMobile: "clamp(2rem, 8vw, 2.8rem)",
    heading: "clamp(1.8rem, 4vw, 2.5rem)",
    body: "clamp(1rem, 2vw, 1.2rem)",
  },
  
  // Breakpoint-specific adjustments
  breakpoints: {
    mobile: {
      hero: typographyStyles.display.heroMobile,
      heading: typographyStyles.heading.h3,
      body: typographyStyles.body.base,
    },
    tablet: {
      hero: typographyStyles.display.hero,
      heading: typographyStyles.heading.h2,
      body: typographyStyles.body.medium,
    },
    desktop: {
      hero: typographyStyles.display.hero,
      heading: typographyStyles.heading.h1,
      body: typographyStyles.body.large,
    },
  },
} as const;

// ============================================================================
// THEME TOKENS (How typography styles get applied)
// ============================================================================

export const typographyTheme = {
  // Page-level typography
  page: {
    title: typographyStyles.display.hero,
    subtitle: {
      fontFamily: typographyTokens.fontFamily.serif,
      fontSize: "clamp(20px, 2.5vw, 24px)",
      fontWeight: typographyTokens.fontWeight.normal,
      lineHeight: typographyTokens.lineHeight.normal,
    },
    intro: typographyStyles.body.large,
  },
  
  // Section-level typography
  section: {
    title: typographyStyles.heading.h1,
    subtitle: typographyStyles.heading.h3,
    body: typographyStyles.body.base,
    caption: typographyStyles.ui.caption,
  },
  
  // Component-level typography
  component: {
    card: {
      title: typographyStyles.heading.h3,
      body: typographyStyles.body.base,
      meta: typographyStyles.ui.label,
    },
    navigation: {
      primary: typographyStyles.ui.nav,
      secondary: typographyStyles.ui.label,
    },
    form: {
      label: typographyStyles.ui.label,
      input: typographyStyles.body.base,
      help: typographyStyles.ui.caption,
    },
    button: {
      primary: typographyStyles.ui.button,
      secondary: typographyStyles.ui.button,
    },
  },
  
  // Content-specific typography
  content: {
    article: {
      title: typographyStyles.heading.h2,
      subtitle: typographyStyles.heading.h3,
      body: typographyStyles.body.base,
      lead: typographyStyles.body.large,
      caption: typographyStyles.ui.caption,
    },
    caseStudy: {
      hero: typographyStyles.display.hero,
      section: typographyStyles.heading.h1,
      subsection: typographyStyles.heading.h3,
      body: typographyStyles.body.base,
      highlight: typographyStyles.body.large,
      meta: typographyStyles.ui.label,
    },
    list: {
      title: typographyStyles.heading.h4,
      item: typographyStyles.body.base,
      meta: typographyStyles.ui.caption,
    },
  },
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Typeface = typeof typefaces;
export type FontWeight = typeof fontWeights;
export type LineHeight = typeof lineHeights;
export type LetterSpacing = typeof letterSpacing;
export type FontSize = typeof fontSizes;
export type TypographyToken = typeof typographyTokens;
export type TypographyStyle = typeof typographyStyles;
export type TypographyTheme = typeof typographyTheme;
export type ResponsiveTypography = typeof responsiveTypography; 