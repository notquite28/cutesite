import { animate } from 'motion'

export interface AnimationOptions {
  duration?: number
  ease?: string | number[]
  delay?: number
}

export function animateWindowOpen(element: HTMLElement): void {
  element.classList.add('window-opening')
  setTimeout(() => {
    element.classList.remove('window-opening')
    element.classList.add('is-open')
  }, 400)
}

export function animateWindowClose(element: HTMLElement, callback: () => void): void {
  element.classList.remove('is-open')
  element.classList.add('is-closing')
  setTimeout(callback, 300)
}

export function animateShake(element: HTMLElement): void {
  element.classList.add('window-shake')
  setTimeout(() => {
    element.classList.remove('window-shake')
  }, 500)
}

export function animateRipple(element: HTMLElement, x: number, y: number): void {
  const ripple = document.createElement('div')
  ripple.className = 'ripple-effect'
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`

  element.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

export function animateIconHover(element: HTMLElement): void {
  element.classList.add('icon-hover')
}

export function animateIconLeave(element: HTMLElement): void {
  element.classList.remove('icon-hover')
}

export function animateStaggerChildren(
  parent: HTMLElement,
  selector: string,
  options?: AnimationOptions
): void {
  const children = parent.querySelectorAll(selector) as NodeListOf<HTMLElement>
  children.forEach((child, index) => {
    child.style.opacity = '0'
    child.style.transform = 'translateY(10px)'
    
    setTimeout(() => {
      animate(
        child,
        { opacity: 1, transform: 'translateY(0)' },
        { duration: options?.duration ?? 0.3 }
      )
    }, (options?.delay ?? 0) + index * 100)
  })
}

export function animateThemeTransition(): void {
  const flash = document.createElement('div')
  flash.className = 'theme-flash'
  document.body.appendChild(flash)

  setTimeout(() => flash.remove(), 300)
}