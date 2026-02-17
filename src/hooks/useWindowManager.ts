import { $windows, openWindow, closeWindow, bringToFront, moveWindow, repositionAllWindows, type WindowPosition } from '../stores/windows'
import { playSound } from '../stores/audio'
import { deactivateEasterEgg } from '../stores/theme'

interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  windowStartX: number
  windowStartY: number
}

const dragState: DragState = {
  isDragging: false,
  startX: 0,
  startY: 0,
  windowStartX: 0,
  windowStartY: 0,
}

function getWindowBounds(): { maxX: number; maxY: number } {
  return {
    maxX: window.innerWidth - 50,
    maxY: window.innerHeight - 50,
  }
}

function clampPosition(x: number, y: number): WindowPosition {
  const { maxX, maxY } = getWindowBounds()
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(0, Math.min(y, maxY)),
  }
}

function handleMouseDown(e: MouseEvent): void {
  const header = (e.target as HTMLElement).closest('[data-drag-handle]')
  if (!header) return

  e.preventDefault()

  const windowEl = header.closest('.window') as HTMLElement
  if (!windowEl) return

  const windowId = windowEl.dataset.windowId
  if (!windowId) return

  bringToFront(windowId)
  playSound('windowOpen')

  const windows = $windows.get()
  const windowState = windows.find(w => w.id === windowId)
  if (!windowState) return

  dragState.isDragging = true
  dragState.startX = e.clientX
  dragState.startY = e.clientY
  dragState.windowStartX = windowState.position.x
  dragState.windowStartY = windowState.position.y

  windowEl.classList.add('is-dragging')

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

function handleMouseMove(e: MouseEvent): void {
  if (!dragState.isDragging) return

  e.preventDefault()

  const windowEl = document.querySelector('.window.is-dragging') as HTMLElement
  if (!windowEl) return

  const windowId = windowEl.dataset.windowId
  if (!windowId) return

  const deltaX = e.clientX - dragState.startX
  const deltaY = e.clientY - dragState.startY

  const newX = dragState.windowStartX + deltaX
  const newY = dragState.windowStartY + deltaY

  const clamped = clampPosition(newX, newY)
  moveWindow(windowId, clamped)
}

function handleMouseUp(): void {
  if (!dragState.isDragging) return

  dragState.isDragging = false

  const windowEl = document.querySelector('.window.is-dragging')
  windowEl?.classList.remove('is-dragging')

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

function handleCloseClick(e: Event): void {
  const closeBtn = (e.target as HTMLElement).closest('[data-close]')
  if (!closeBtn) return

  const windowEl = closeBtn.closest('.window') as HTMLElement
  if (!windowEl) return

  const windowId = windowEl.dataset.windowId
  if (!windowId) return

  playSound('windowClose')
  
  if (windowId === 'autism') {
    deactivateEasterEgg()
  }
  
  windowEl.classList.add('is-closing')
  setTimeout(() => {
    closeWindow(windowId)
  }, 300)
}

function handleIconClick(e: Event): void {
  const icon = (e.target as HTMLElement).closest('[data-window-id]') as HTMLElement | null
  if (!icon || !icon.classList.contains('desktop-icon')) return

  const windowId = icon.dataset.windowId
  if (!windowId) return

  openWindow(windowId)
}

export function initWindowManager(): void {
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('click', handleCloseClick)
  document.addEventListener('click', handleIconClick)

  window.addEventListener('resize', () => {
    repositionAllWindows()
  })
}

export function cleanupWindowManager(): void {
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('click', handleCloseClick)
  document.removeEventListener('click', handleIconClick)
}