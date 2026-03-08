export type CategoryId =
  | 'video'
  | 'music'
  | 'design'
  | 'development'
  | 'business'

export interface WorkItem {
  id: string
  category: CategoryId
  title: string
  titleKo: string
  year: number
  tools: string[]
  description: string
  descriptionKo: string
  howIMadeThis: {
    tools: string[]
    prompt?: string
    processNotes: string
    contribution?: { label: string; pct: number }[]
  }
  thumbnailAlt: string
  thumbnailSrc?: string   // /images/thumbnails/{id}.jpg  (video poster / preview)
  imageSrc?: string       // /images/photo/{id}.jpg       (full display image)
  videoSrc?: string       // /videos/{id}.mp4
  audioSrc?: string       // /audio/{id}.mp3
  aspectRatio?: string    // e.g. '512/768', '16/9', '1/1'  (natural video dimensions)
  featured?: boolean
}

export interface CategoryConfig {
  id: CategoryId
  nameEn: string
  nameKo: string
  description: string
  descriptionKo: string
  accent: string
  bg: string
  textColor: string
}
