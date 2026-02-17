import { map, computed } from 'nanostores'
import { Howl } from 'howler'

export type SoundType = 'windowOpen' | 'windowClose' | 'profileClick' | 'glitch'

export interface AudioState {
  isInitialized: boolean
  isMuted: boolean
  volume: number
}

export const $audioState = map<AudioState>({
  isInitialized: false,
  isMuted: false,
  volume: 0.3,
})

let sounds: Record<SoundType, Howl> | null = null

function getBasePath(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL
  }
  return '/'
}

const AUDIO_PATHS: Record<SoundType, string> = {
  windowOpen: `${getBasePath()}audio/click.mp3`,
  windowClose: `${getBasePath()}audio/close.mp3`,
  profileClick: `${getBasePath()}audio/ahoy.mp3`,
  glitch: `${getBasePath()}audio/glitch.mp3`,
}

function initSounds(): void {
  if (sounds) return

  const volume = $audioState.get().volume

  sounds = {
    windowOpen: new Howl({
      src: [AUDIO_PATHS.windowOpen],
      volume,
      preload: false,
    }),
    windowClose: new Howl({
      src: [AUDIO_PATHS.windowClose],
      volume,
      preload: false,
    }),
    profileClick: new Howl({
      src: [AUDIO_PATHS.profileClick],
      volume,
      preload: false,
    }),
    glitch: new Howl({
      src: [AUDIO_PATHS.glitch],
      volume,
      preload: false,
    }),
  }

  $audioState.setKey('isInitialized', true)
}

export function playSound(type: SoundType): void {
  const { isInitialized, isMuted } = $audioState.get()

  if (!isInitialized || isMuted || !sounds) return

  const sound = sounds[type]
  if (sound) {
    sound.load()
    sound.play()
  }
}

export function setMuted(muted: boolean): void {
  $audioState.setKey('isMuted', muted)
}

export function setVolume(volume: number): void {
  const clampedVolume = Math.max(0, Math.min(1, volume))
  $audioState.setKey('volume', clampedVolume)

  if (sounds) {
    Object.values(sounds).forEach((sound) => {
      sound.volume(clampedVolume)
    })
  }
}

export function initAudio(): void {
  if (typeof document === 'undefined') return

  const handleFirstInteraction = (event: Event) => {
    if ((event as Event).isTrusted) {
      initSounds()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }

  document.addEventListener('click', handleFirstInteraction)
  document.addEventListener('keydown', handleFirstInteraction)

  document.addEventListener('click', (event) => {
    if (!event.isTrusted) return

    const target = event.target as HTMLElement
    if (target?.id === 'profile-image') {
      playSound('profileClick')
    }
  })
}

export const $isAudioReady = computed($audioState, (state) => state.isInitialized)