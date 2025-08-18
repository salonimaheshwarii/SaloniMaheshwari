## Portfolio — Next.js + Tailwind CSS + Framer Motion

A modern, interactive portfolio built with Next.js App Router, Tailwind CSS, and Framer Motion. It showcases animated sections, micro-interactions, and delightful 3D-like effects, optimized for performance and responsiveness.

### Live Demo
- Add your live link here (e.g., Vercel)

### Features
- **Animated UI**: Smooth transitions, parallax, progress bar, and section reveals with Framer Motion
- **Custom cursor + particles**: Interactive hover states and particle trails
- **Sections**: Hero, About, Projects, Experience, Skills, Contact, and Footer
- **Responsive and accessible**: Tailwind CSS utilities, focus states, and reduced motion-friendly animations
- **Easter egg**: Press `S` to trigger confetti
- **App Router**: Next.js 15 app directory with optimized bundling (Turbopack in dev)

### Tech Stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS 3 with custom theme, global utilities, and component layers
- **Animation**: Framer Motion 12
- **3D Ready**: `three`, `@react-three/fiber`, `@react-three/drei` are installed for future 3D scenes

### Getting Started
#### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

#### Install
```bash
npm install
```

#### Development
```bash
npm run dev
# opens http://localhost:3000
```

#### Production Build
```bash
npm run build
npm start
```

#### Linting
```bash
npm run lint
```

### Project Structure
```text
src/
  app/
    layout.js          # Global layout, fonts, metadata
    page.js            # Home route; renders portfolio page
    globals.css        # Tailwind base + custom utilities/animations
    portfolio/
      page.jsx         # Main portfolio component with all sections
public/
  logo.svg             # App icon (configured in metadata)
```

### Configuration & Customization
- **Branding & Metadata**: Update `title`, `description`, and `icons` in `src/app/layout.js`.
- **Content**: Edit arrays and content in `src/app/portfolio/page.jsx`:
  - `facts`, `projects`, `experiences`, `skillCategories`, contact details, and social links
- **Styling**:
  - Tailwind theme, colors, fonts, and custom animations in `tailwind.config.js`
  - Global utility classes and effects in `src/app/globals.css` (`gradient-*`, `glass-*`, custom keyframes)
- **Routes**: Uses App Router; `src/app/page.js` renders `portfolio/page.jsx` as the homepage.

### Deployment
- **Vercel (recommended)**
  1. Push to GitHub
  2. Import the repo on Vercel
  3. Use default Next.js settings
- Any Node host that supports Next.js can work. Build with `npm run build` and run `npm start`.

### Notes
- This project currently simulates 3D via CSS transforms and motion; `react-three-fiber` is available if you want real 3D scenes.
- Turbopack is enabled in dev for faster HMR.

### Scripts
- **dev**: `next dev --turbopack`
- **build**: `next build`
- **start**: `next start`
- **lint**: `next lint`

### License
- No license specified. Add one if needed (e.g., MIT).
