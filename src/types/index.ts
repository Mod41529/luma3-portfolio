export type CategoryId =
  | 'video'
  | 'music'
  | 'photography'
  | 'design'
  | 'development'
  | 'strategy'

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
  }
  thumbnailAlt: string
  thumbnailSrc?: string   // /images/thumbnails/{id}.jpg  (video poster / preview)
  imageSrc?: string       // /images/photo/{id}.jpg       (full display image)
  videoSrc?: string       // /videos/{id}.mp4
  audioSrc?: string       // /audio/{id}.mp3
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
