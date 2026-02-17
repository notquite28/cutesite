import { map, computed } from 'nanostores'

export type ThemeMode = 'light' | 'dark'
export type ThemeBackground = 'default' | 'lain'
export type ThemeDecoration = 'sakura' | 'lily'

export interface ThemeState {
  mode: ThemeMode
  background: ThemeBackground
  decoration: ThemeDecoration
}

export interface EasterEggState {
  isActive: boolean
  previousTheme: ThemeState | null
}

const STORAGE_KEY = 'cutesite-theme'

function getSystemPreference(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function loadStoredTheme(): Partial<ThemeState> | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    return null
  }
  return null
}

function saveTheme(state: ThemeState): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: state.mode }))
  } catch {
    console.warn('Failed to save theme to localStorage')
  }
}

export const $theme = map<ThemeState>({
  mode: 'light',
  background: 'default',
  decoration: 'sakura',
})

export const $easterEgg = map<EasterEggState>({
  isActive: false,
  previousTheme: null,
})

export function initTheme(): void {
  const stored = loadStoredTheme()
  const systemMode = getSystemPreference()
  
  $theme.set({
    mode: stored?.mode || systemMode,
    background: 'default',
    decoration: 'sakura',
  })
  
  $easterEgg.set({
    isActive: false,
    previousTheme: null,
  })
  
  applyTheme()
}

export function applyTheme(): void {
  if (typeof document === 'undefined') return
  
  const { mode, background, decoration } = $theme.get()
  
  document.documentElement.classList.toggle('dark', mode === 'dark')
  
  const body = document.body
  body.classList.toggle('lain-background', background === 'lain')
  
  const sakura = document.querySelector('.sakura-decoration')
  const lily = document.querySelector('.lily-decoration')
  
  if (decoration === 'lily') {
    sakura?.classList.add('hidden')
    lily?.classList.remove('hidden')
  } else {
    sakura?.classList.remove('hidden')
    lily?.classList.add('hidden')
  }
  
  const lainVideo = document.getElementById('lain-bg-video') as HTMLVideoElement | null
  if (background === 'lain' && lainVideo) {
    lainVideo.classList.remove('hidden')
    lainVideo.play().catch(() => {})
  } else if (lainVideo) {
    lainVideo.classList.add('hidden')
    lainVideo.pause()
    lainVideo.currentTime = 0
  }
}

export function setTheme(updates: Partial<ThemeState>): void {
  const current = $theme.get()
  const newTheme = { ...current, ...updates }
  $theme.set(newTheme)
  saveTheme(newTheme)
  applyTheme()
}

export function toggleDarkMode(): void {
  const current = $theme.get()
  setTheme({ mode: current.mode === 'dark' ? 'light' : 'dark' })
}

export function setBackground(background: ThemeBackground): void {
  setTheme({ background })
}

export function setDecoration(decoration: ThemeDecoration): void {
  setTheme({ decoration })
}

export function activateEasterEgg(): void {
  const current = $theme.get()
  $easterEgg.set({
    isActive: true,
    previousTheme: { ...current },
  })
  
  setTheme({ background: 'lain', decoration: 'lily' })
}

export function deactivateEasterEgg(): void {
  const easter = $easterEgg.get()
  
  if (easter.isActive && easter.previousTheme) {
    $theme.set(easter.previousTheme)
    saveTheme(easter.previousTheme)
    applyTheme()
  }
  
  $easterEgg.set({
    isActive: false,
    previousTheme: null,
  })
}

export const $isDark = computed($theme, (theme) => theme.mode === 'dark')