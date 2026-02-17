export const SITE_NAME = 'cutesite'

export const USER_NAME = 'quiet'
export const USER_TAGLINE = 'neet developer/artist/musician'
export const USER_EMAIL = 'judy2077@protonmail.com'

export const SOCIAL_LINKS = {
  github: 'https://github.com/notquitethereyet',
  twitter: 'https://twitter.com/notquiteartyet',
  spotify: 'https://open.spotify.com/user/5p320nqqyaj9yt21i8igkm41q?si=9b9b8af1e4b64abd',
  medium: 'https://medium.com/@notquitethereyet_',
} as const

export const CURRENT_YEAR = new Date().getFullYear()

export const WINDOW_CASCADE_OFFSET = 40
export const WINDOW_CASCADE_LIMIT = 5

export const GREETINGS: Record<string, string> = {
  morning: 'こんにちは！',
  night: 'こんばんわ！',
}

export function getGreeting(): string {
  if (typeof window === 'undefined') return GREETINGS.morning
  
  const hour = new Date().getHours()
  if (hour >= 18 || hour < 6) return GREETINGS.night
  return GREETINGS.morning
}