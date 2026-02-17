# AGENTS.md

Guidelines for agentic coding agents operating in this repository.

## Project Overview

This is **cutesite**, an aesthetic personal website built with Astro 5 and TailwindCSS v4. It features a nostalgic desktop interface with cherry blossom animations, customizable themes, and interactive draggable windows.

## Build/Lint/Test Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site to ./docs/
npm run preview      # Preview production build locally
npm run astro ...    # Run Astro CLI commands (e.g., astro check)
```

### Type Checking

```bash
npx astro check      # Run Astro's type checking
```

### Testing

No test framework is currently configured. When adding tests, consider Vitest (Astro's recommended test runner).

## Project Structure

```
/
├── public/               # Static assets (images, icons, sounds)
│   ├── images/           # Website images and decorations
│   └── audio/            # Sound effect files
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (Window, DesktopIcon, ThemeToggle)
│   │   └── features/     # Feature components (CherryBlossoms, etc.)
│   ├── layouts/          # Page layouts (BaseLayout.astro, BlogLayout.astro)
│   ├── pages/            # Astro pages (index.astro, posts.astro)
│   ├── stores/           # Nanostores state management
│   │   ├── windows.ts    # Window state (open, close, position, z-index)
│   │   ├── theme.ts      # Theme state (mode, background, decoration)
│   │   └── audio.ts      # Audio state (muted, volume, initialized)
│   ├── hooks/            # Client-side hooks (useWindowManager.ts)
│   ├── styles/
│   │   ├── base.css      # CSS variables, Tailwind theme, global styles
│   │   └── components/   # Component-scoped CSS modules
│   └── lib/
│       ├── constants.ts  # Site configuration (userName, socialLinks, etc.)
│       └── animations.ts # Motion One animation utilities
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # TailwindCSS configuration
└── tsconfig.json        # TypeScript configuration (strict mode)
```

## Key Dependencies

- **nanostores**: Tiny state manager (~300 bytes) for reactive stores
- **motion**: Animation library (formerly Framer Motion) for smooth transitions
- **howler**: Audio library for sound effects

## Code Style Guidelines

### TypeScript

- **Strict mode**: Project extends `astro/tsconfigs/strict`
- **ES Modules**: Uses `type: "module"` in package.json
- **Exports**: Prefer named exports over default exports
- **Types**: Define interfaces at the top of files before usage
- **Store naming**: Prefix stores with `$` (e.g., `$windows`, `$theme`)

```typescript
// Types first
export interface WindowState {
  id: string
  title: string
  position: WindowPosition
  zIndex: number
}

// Store with $ prefix
export const $windows = atom<WindowState[]>([])
```

### Imports

Order imports as follows:
1. External libraries (nanostores, motion, howler)
2. Internal stores (`../stores/*`)
3. Internal modules (`../lib/*`, `../hooks/*`)

```typescript
import { atom, computed } from 'nanostores'
import { $windows, openWindow } from '../stores/windows'
import { playSound } from '../stores/audio'
import { USER_NAME } from '../lib/constants'
```

### State Management (Nanostores)

Use atoms for primitive values, maps for objects, computed for derived state:

```typescript
import { atom, map, computed } from 'nanostores'

// Atom for primitive/array state
export const $highestZIndex = atom(10)

// Map for object state
export const $theme = map<ThemeState>({
  mode: 'light',
  background: 'default',
})

// Computed for derived state
export const $isDark = computed($theme, theme => theme.mode === 'dark')
```

### Client-Side Scripts

Use `astro:page-load` lifecycle event for View Transitions compatibility:

```astro
<script>
  import { initTheme } from '../stores/theme'
  
  document.addEventListener('astro:page-load', () => {
    initTheme()
  })
</script>
```

### CSS and Styling

- **TailwindCSS v4**: Use `@theme` directive for design tokens
- **CSS Variables**: Use for theming in `src/styles/base.css`
- **Component CSS**: Scoped styles in `<style>` tags or `styles/components/`

```css
@theme {
  --color-primary: #562135;
  --color-secondary: #c3829e;
  --animate-float: float 6s ease-in-out infinite;
}
```

### Dark Mode

Dark mode uses CSS variables with `.dark` class on `<html>`:

```typescript
import { toggleDarkMode, $isDark } from '../stores/theme'

// Toggle
toggleDarkMode()

// Subscribe to changes
$isDark.subscribe(isDark => console.log(isDark))
```

### Animations (Motion One)

Use the animation utilities from `src/lib/animations.ts`:

```typescript
import { animateWindowOpen, animateShake } from '../lib/animations'

// Open animation
animateWindowOpen(element)

// Shake on already-open window
animateShake(element)
```

### Error Handling

- Use `console.error` for development errors
- Provide fallback UI when operations fail
- Check for null/undefined before accessing properties

```typescript
const window = $windows.get().find(w => w.id === id)
if (!window) {
  console.error(`Window ${id} not found`)
  return
}
```

### File Organization

- **Stores**: All state in `src/stores/` with `$` prefix naming
- **Hooks**: Client-side logic in `src/hooks/`
- **UI Components**: Reusable in `src/components/ui/`
- **Feature Components**: Complex features in `src/components/features/`
- **CSS**: Base styles in `src/styles/base.css`, component styles co-located

## Important Notes

- Output directory is `docs/` (for GitHub Pages), not `dist/`
- The site uses `static` output mode (no SSR)
- View Transitions enabled via `<ClientRouter />` in BaseLayout
- Images are optimized using Astro's image service (Sharp)
- Audio requires user interaction before playing (browser autoplay policies)
- Use `astro:page-load` event for scripts to work with View Transitions