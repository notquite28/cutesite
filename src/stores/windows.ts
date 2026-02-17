import { atom, computed } from 'nanostores'

export interface WindowPosition {
  x: number
  y: number
}

export interface WindowSize {
  width: number
  height: number
}

export interface WindowState {
  id: string
  title: string
  position: WindowPosition
  size: WindowSize
  zIndex: number
  isOpen: boolean
  isLoading: boolean
}

export const $windows = atom<WindowState[]>([])
export const $highestZIndex = atom(10)
export const $activeWindowId = atom<string | null>(null)

const CASCADE_OFFSET = 40
const CASCADE_LIMIT = 5

function getWindowDefaults(id: string): Partial<WindowState> {
  const configs: Record<string, Partial<WindowState>> = {
    home: { size: { width: 500, height: 400 } },
    work: { size: { width: 900, height: 700 } },
    links: { size: { width: 450, height: 400 } },
    about: { size: { width: 500, height: 500 } },
    faq: { size: { width: 500, height: 400 } },
    autism: { size: { width: 600, height: 500 } },
  }

  if (id.startsWith('blog-')) {
    return { size: { width: 1000, height: 800 } }
  }

  return configs[id] || { size: { width: 650, height: 500 } }
}

function calculatePosition(
  size: WindowSize,
  index: number,
  viewportWidth: number,
  viewportHeight: number
): WindowPosition {
  const baseX = (viewportWidth - size.width) / 2
  const baseY = (viewportHeight - size.height) / 2
  const cascadeIndex = index % CASCADE_LIMIT

  const x = baseX + cascadeIndex * CASCADE_OFFSET
  const y = baseY + cascadeIndex * CASCADE_OFFSET

  const maxX = viewportWidth - size.width - 10
  const maxY = viewportHeight - size.height - 10

  return {
    x: Math.max(10, Math.min(x, maxX)),
    y: Math.max(10, Math.min(y, maxY)),
  }
}

function formatTitle(id: string): string {
  if (id.startsWith('blog-')) {
    const slug = id.replace('blog-', '')
    const titleMap: Record<string, string> = {
      'project-1': 'Personal Website',
      'project-2': 'Machine Learning Art',
      'project-3': 'NixOS Configuration',
    }
    return titleMap[slug] || `Blog: ${slug}`
  }

  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function openWindow(id: string): void {
  const windows = $windows.get()
  const existing = windows.find((w) => w.id === id)

  if (existing) {
    bringToFront(id)
    return
  }

  const defaults = getWindowDefaults(id)
  const size = defaults.size || { width: 650, height: 500 }
  const position = calculatePosition(
    size,
    windows.length,
    typeof window !== 'undefined' ? window.innerWidth : 1024,
    typeof window !== 'undefined' ? window.innerHeight : 768
  )
  const newZIndex = $highestZIndex.get() + 1

  $highestZIndex.set(newZIndex)

  const newWindow: WindowState = {
    id,
    title: defaults.title || formatTitle(id),
    position,
    size,
    zIndex: newZIndex,
    isOpen: true,
    isLoading: true,
  }

  $windows.set([...windows, newWindow])
  $activeWindowId.set(id)

  setTimeout(() => {
    const currentWindows = $windows.get()
    $windows.set(
      currentWindows.map((w) => (w.id === id ? { ...w, isLoading: false } : w))
    )
  }, 300)
}

export function closeWindow(id: string): void {
  const windows = $windows.get()
  $windows.set(windows.filter((w) => w.id !== id))

  if ($activeWindowId.get() === id) {
    const remaining = windows.filter((w) => w.id !== id)
    const topWindow = remaining.sort((a, b) => b.zIndex - a.zIndex)[0]
    $activeWindowId.set(topWindow?.id || null)
  }
}

export function bringToFront(id: string): void {
  const windows = $windows.get()
  const window = windows.find((w) => w.id === id)

  if (!window) return

  const newZIndex = $highestZIndex.get() + 1
  $highestZIndex.set(newZIndex)

  $windows.set(
    windows.map((w) =>
      w.id === id ? { ...w, zIndex: newZIndex, isOpen: true } : w
    )
  )
  $activeWindowId.set(id)
}

export function moveWindow(id: string, position: WindowPosition): void {
  const windows = $windows.get()
  $windows.set(
    windows.map((w) => (w.id === id ? { ...w, position } : w))
  )
}

export function resizeWindow(id: string, size: WindowSize): void {
  const windows = $windows.get()
  $windows.set(
    windows.map((w) => (w.id === id ? { ...w, size } : w))
  )
}

export function repositionAllWindows(): void {
  if (typeof window === 'undefined') return

  const windows = $windows.get()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  $windows.set(
    windows.map((w, index) => ({
      ...w,
      position: calculatePosition(w.size, index, viewportWidth, viewportHeight),
    }))
  )
}

export const $sortedWindows = computed($windows, (windows) =>
  [...windows].sort((a, b) => a.zIndex - b.zIndex)
)