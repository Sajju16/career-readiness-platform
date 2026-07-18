---
name: Apex Narrative
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464554'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#545c72'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c748b'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The brand identity is rooted in the concept of "Guided Velocity"—the intersection of career ambition and AI-driven precision. This design system prioritizes a high-utility, low-friction interface inspired by industry-leading developer and productivity tools. 

The aesthetic is **Modern SaaS Minimalism** with subtle **Glassmorphic** accents. It leverages expansive whitespace, a restrained color palette, and high-fidelity micro-interactions to evoke a sense of professional mastery. The target audience—high-achieving professionals and career changers—should feel a sense of clarity, trust, and technological empowerment. The emotional response is focused, calm, and sophisticated.

## Colors

The palette is anchored by a "Digital Indigo" primary and a "Vibrant Violet" accent, typically utilized in high-intent areas like primary actions or AI-generated insights. 

- **Primary (Indigo):** Used for core branding, active states, and focus indicators.
- **Accent (Violet):** Reserved for AI-specific features, highlights, and subtle gradients to denote "premium" functionality.
- **Neutral/Surface:** A range of Slate grays (from #0f172a for text to #f8fafc for backgrounds) ensures high legibility and a clean, layered environment.
- **Semantic Colors:** Success (Emerald), Warning (Amber), and Error (Rose) should be used with low-saturation backgrounds and high-saturation text to maintain the professional tone.

## Typography

The typography system uses **Inter** exclusively to achieve a systematic, neutral, and utilitarian feel. 

- **Headlines:** Utilize tighter letter-spacing and heavier weights to create a strong visual anchor.
- **Body Text:** Optimized for long-form reading in resume reviews and interview feedback. Use `body-md` for standard interface text and `body-lg` for introductory passages.
- **Labels:** High-contrast, often using uppercase or semibold weights to distinguish metadata from content.
- **Hierarchy:** Ensure a clear vertical rhythm by adhering strictly to the defined line heights.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. Content is housed within a maximum width of 1280px to maintain readability on large monitors, centered with generous side margins.

- **Grid:** A 12-column system is used for dashboard layouts.
- **Rhythm:** An 8px linear scale (with 4px increments for tight components) governs all padding and margins. 
- **Density:** Use "Comfortable" density for landing pages and onboarding, switching to "Compact" density for data-heavy career analytics and resume editors.
- **Desktop Strategy:** Sidebar navigation is fixed to the left (240px or 280px), while the main content area utilizes dynamic flexbox containers to distribute cards and modules.

## Elevation & Depth

This design system uses a combination of **Tonal Layering** and **Ambient Shadows** to create a structured sense of depth without visual clutter.

- **Level 0 (Background):** Soft gray (#f8fafc) or white.
- **Level 1 (Cards/Sidebar):** White surface with a 1px border (#e2e8f0). No shadow.
- **Level 2 (Dropdowns/Popovers):** White surface with a subtle ambient shadow (0px 4px 20px rgba(0, 0, 0, 0.05)).
- **Level 3 (Modals):** White surface with a deep, diffused shadow and a 40% backdrop blur (Glassmorphism) for the overlay to maintain context of the background.
- **AI Accents:** Elements powered by AI may use a subtle, 1px inner-glow or a very soft purple tinted shadow to indicate their "active" status.

## Shapes

The shape language is sophisticated and approachable. While the base `roundedness` is set to level 2 (0.5rem), significant UI containers such as cards and primary buttons utilize `rounded-2xl` (1rem) or even `rounded-3xl` (1.5rem) to align with the premium SaaS aesthetic.

- **Standard Elements:** Inputs and small buttons use 8px (0.5rem).
- **Feature Containers:** Main dashboard cards and modal windows use 16px (1rem).
- **Selection States:** Use subtle rounded pill shapes for tags and chips to contrast against the more structured grid.

## Components

### Buttons
- **Primary:** Solid Indigo background, white text. Large horizontal padding, 1rem corner radius.
- **Secondary:** White background, 1px border (#e2e8f0), Slate text.
- **AI-Action:** Linear gradient from Indigo to Violet with a subtle sparkle icon.

### Input Fields
- Clean, 1px bordered boxes that transition to a 2px Indigo border on focus. 
- Placeholder text in a light slate (#94a3b8).

### Cards
- White background, 1px border (#f1f5f9). 
- Headers should have a subtle bottom border or a slightly different background tint to separate title from content.

### Chips & Badges
- High-contrast labels. Use small, bold caps for status indicators (e.g., "AI-VERIFIED").
- Backgrounds should be very desaturated versions of the label color.

### Progress Indicators
- Smooth, animated bars using the primary Indigo-to-Violet gradient. 
- For "Career Readiness" scores, use circular gauges with thick stroke weights.

### Glassmorphic Sidebar (Optional)
- For a premium feel, the left navigation can use a semi-transparent white background with a `backdrop-filter: blur(12px)`.