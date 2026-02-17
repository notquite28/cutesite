import { openWindow } from '../stores/windows'
import { activateEasterEgg } from '../stores/theme'

function getWindowContent(windowId: string): string | null {
  const templates: Record<string, string> = {
    about: 'content-about',
    links: 'content-links',
    work: 'content-work',
    faq: 'content-faq',
    autism: 'content-autism',
  }

  if (windowId.startsWith('blog-')) {
    const slug = windowId.replace('blog-', '')
    const base = import.meta.env.BASE_URL ?? '/'
    return `
      <div class="blog-post-iframe" style="height: 100%; width: 100%; overflow: hidden;">
        <iframe src="${base}posts/${slug}" style="height: 100%; width: 100%; border: none;"></iframe>
      </div>
    `
  }

  const templateId = templates[windowId]
  if (!templateId) return null

  const template = document.getElementById(templateId) as HTMLTemplateElement
  if (!template) return null

  return template.innerHTML
}

async function loadWorkContent(container: HTMLElement): Promise<void> {
  const dynamicContent = container.querySelector('#dynamic-work-content')
  if (!dynamicContent) return

  const base = import.meta.env.BASE_URL ?? '/'
  
  try {
    const response = await fetch(`${base}work-component`)
    const html = await response.text()
    dynamicContent.innerHTML = html

    const blogPosts = container.querySelectorAll('.blog-post')
    blogPosts.forEach(post => {
      post.addEventListener('click', () => {
        const url = (post as HTMLElement).dataset.url
        if (url) {
          const slug = url.split('/').pop()
          if (slug) {
            openWindow(`blog-${slug}`)
          }
        }
      })
    })
  } catch (error) {
    console.error('Error loading work component:', error)
    dynamicContent.innerHTML = '<p>Error loading projects</p>'
  }
}

function renderWindowContent(windowId: string, container: HTMLElement): void {
  const content = getWindowContent(windowId)
  if (!content) {
    container.innerHTML = '<p>Content not found</p>'
    return
  }

  container.innerHTML = content

  if (windowId === 'work') {
    loadWorkContent(container)
  }

  if (windowId === 'autism') {
    activateEasterEgg()
  }
}

export function renderWindow(windowId: string, windowEl: HTMLElement): void {
  const contentEl = windowEl.querySelector('.window-content') as HTMLElement
  if (!contentEl) return

  contentEl.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <span>Loading...</span>
    </div>
  `

  setTimeout(() => {
    renderWindowContent(windowId, contentEl)
  }, 300)
}