import { WorkItem, CategoryConfig, CategoryId } from '@/types'

export const categories: Record<CategoryId, CategoryConfig> = {
  video: {
    id: 'video',
    nameEn: 'Video',
    nameKo: '영상',
    description: 'Motion graphics, cinematic edits, and generative video work.',
    descriptionKo: '모션 그래픽, 시네마틱 편집, 생성형 영상 작업.',
    accent: '#D97706',
    bg: '#FEF3C7',
    textColor: '#92400E',
  },
  music: {
    id: 'music',
    nameEn: 'Music',
    nameKo: '음악',
    description: 'Original compositions, sound design, and AI-assisted music production.',
    descriptionKo: '오리지널 작곡, 사운드 디자인, AI 음악 프로덕션.',
    accent: '#2563EB',
    bg: '#EFF6FF',
    textColor: '#1E3A8A',
  },
  photography: {
    id: 'photography',
    nameEn: 'Photography',
    nameKo: '사진',
    description: 'Street, portrait, and conceptual photography exploring everyday moments.',
    descriptionKo: '일상의 순간을 탐구하는 스트리트, 포트레이트, 개념 사진.',
    accent: '#059669',
    bg: '#ECFDF5',
    textColor: '#14532D',
  },
  design: {
    id: 'design',
    nameEn: 'Design',
    nameKo: '디자인',
    description: 'Visual identity, editorial layout, and interface design.',
    descriptionKo: '비주얼 아이덴티티, 에디토리얼, 인터페이스 디자인.',
    accent: '#E11D48',
    bg: '#FFF1F2',
    textColor: '#9F1239',
  },
  development: {
    id: 'development',
    nameEn: 'Development',
    nameKo: '개발',
    description: 'Web applications, automation tools, and multi-agent systems.',
    descriptionKo: '웹 애플리케이션, 자동화 도구, 멀티에이전트 시스템.',
    accent: '#475569',
    bg: '#F1F5F9',
    textColor: '#1E293B',
  },
  strategy: {
    id: 'strategy',
    nameEn: 'Strategy',
    nameKo: '전략',
    description: 'Business frameworks, financial modeling, and systems thinking.',
    descriptionKo: '비즈니스 프레임워크, 재무 모델링, 시스템 씽킹.',
    accent: '#B45309',
    bg: '#FEFCE8',
    textColor: '#713F12',
  },
}

export const works: WorkItem[] = [
  // ─── Video ───────────────────────────────────────────────────────────────
  {
    id: 'v1',
    category: 'video',
    title: 'Temporal Drift',
    titleKo: '시간의 흐름',
    year: 2024,
    tools: ['After Effects', 'Premiere Pro', 'Sora'],
    description:
      'A short film exploring the boundary between memory and imagination, generated through a combination of AI footage and hand-edited transitions.',
    descriptionKo:
      '기억과 상상의 경계를 탐구하는 단편 영상. AI 생성 장면과 수작업 편집을 결합했습니다.',
    howIMadeThis: {
      tools: ['Adobe After Effects', 'Premiere Pro', 'OpenAI Sora', 'ElevenLabs'],
      prompt:
        'A slow-motion sequence of light refracting through water droplets on glass, golden hour, cinematic, 35mm film grain, hyperrealistic',
      processNotes:
        'Generated base footage with Sora using cinematic prompts, then composited in After Effects with color grading in Premiere. Added ambient sound design in post.',
    },
    thumbnailAlt: 'Dragon flying above colorful sunset sky',
    videoSrc: '/videos/v1.mp4',
    thumbnailSrc: '/images/thumbnails/v1.jpg',
    featured: true,
  },
  {
    id: 'v2',
    category: 'video',
    title: 'Synthetic Seasons',
    titleKo: '합성된 계절',
    year: 2024,
    tools: ['Kling', 'Premiere Pro', 'SUNO'],
    description:
      'Four seasons captured through generative AI, each representing a different emotional state.',
    descriptionKo:
      '생성 AI로 포착한 사계절. 각 계절은 다른 감정 상태를 표현합니다.',
    howIMadeThis: {
      tools: ['Kling', 'Adobe Premiere Pro', 'SUNO', 'Midjourney'],
      prompt:
        'Cherry blossoms falling in slow motion, hyperrealistic, 4K, spring afternoon light, Japanese aesthetic',
      processNotes:
        'Created 4 separate AI video sequences for each season, then edited together with original music generated in SUNO.',
    },
    thumbnailAlt: 'Falling cherry blossoms',
    videoSrc: '/videos/v2.mp4',
    thumbnailSrc: '/images/thumbnails/v2.jpg',
  },
  {
    id: 'v3',
    category: 'video',
    title: 'Brand in Motion',
    titleKo: '브랜드 모션',
    year: 2023,
    tools: ['After Effects', 'Illustrator'],
    description:
      'Corporate motion identity package for a fintech startup — logo animation, transitions, and lower thirds.',
    descriptionKo: '핀테크 스타트업을 위한 모션 아이덴티티 패키지.',
    howIMadeThis: {
      tools: ['Adobe After Effects', 'Adobe Illustrator'],
      processNotes:
        "Designed the motion system around the brand's core value of 'precision'. Used elastic expressions for the logo reveal and custom easing for all transitions.",
    },
    thumbnailAlt: 'Abstract brand motion graphic',
    videoSrc: '/videos/v3.mp4',
    thumbnailSrc: '/images/thumbnails/v3.jpg',
  },

  // ─── Music ───────────────────────────────────────────────────────────────
  {
    id: 'm1',
    category: 'music',
    title: 'Still Water',
    titleKo: '고요한 물',
    year: 2024,
    tools: ['SUNO', 'Udio', 'Logic Pro'],
    description:
      'A meditative ambient track blending AI-generated instrumentation with hand-edited arrangements.',
    descriptionKo:
      'AI 생성 악기와 수작업 편곡을 결합한 명상적 앰비언트 트랙.',
    howIMadeThis: {
      tools: ['SUNO v4', 'Udio', 'Logic Pro X'],
      prompt:
        'Ambient meditation music, Japanese koto, gentle piano, 60bpm, calm, introspective, no drums, soft reverb, lo-fi texture',
      processNotes:
        'Generated base tracks in SUNO and Udio, then imported stems into Logic Pro for arrangement and EQ work.',
    },
    thumbnailAlt: 'Calm water surface',
    audioSrc: '/audio/m1.mp3',
  },
  {
    id: 'm2',
    category: 'music',
    title: 'Compound Interest',
    titleKo: '복리',
    year: 2024,
    tools: ['SUNO', 'Ableton'],
    description:
      'An electronic track where the beat structure mirrors compound interest curves — slow start, exponential build.',
    descriptionKo:
      '비트 구조가 복리 곡선을 반영하는 일렉트로닉 트랙. 느린 시작과 지수적 전개.',
    howIMadeThis: {
      tools: ['SUNO', 'Ableton Live 11'],
      prompt:
        'Progressive electronic, starts minimal with just bass, elements compound over 4 minutes, techno influenced, 128bpm, builds to euphoric drop',
      processNotes:
        'Conceptually mapped the finance concept of compound growth to musical density. Each 30 seconds adds new layers.',
    },
    thumbnailAlt: 'Sound wave visualization',
    audioSrc: '/audio/m2.mp3',
  },
  {
    id: 'm3',
    category: 'music',
    title: 'Seoul 3AM',
    titleKo: '서울 새벽 3시',
    year: 2023,
    tools: ['Udio', 'FL Studio'],
    description: 'A lo-fi hip-hop track capturing the mood of walking through Seoul at 3am.',
    descriptionKo: '새벽 3시 서울을 걷는 분위기를 담은 로파이 힙합.',
    howIMadeThis: {
      tools: ['Udio', 'FL Studio'],
      prompt:
        'Lo-fi hip hop, Seoul late night, rain sounds, jazz samples, melancholy, 75bpm, vinyl crackle, Korean city atmosphere',
      processNotes:
        'Generated multiple variations in Udio, selected the most atmospheric one, added field recordings of Seoul streets.',
    },
    thumbnailAlt: 'Seoul nightscape abstract',
    audioSrc: '/audio/m3.mp3',
  },

  // ─── Photography ─────────────────────────────────────────────────────────
  {
    id: 'p1',
    category: 'photography',
    title: 'Concrete Gardens',
    titleKo: '콘크리트 정원',
    year: 2024,
    tools: ['Sony A7IV', 'Lightroom', 'Midjourney'],
    description:
      'A series exploring nature reclaiming urban space in Seoul, combining real photography with AI-extended scenes.',
    descriptionKo:
      '서울의 도시 공간을 되찾는 자연을 탐구하는 시리즈. 실제 사진과 AI 확장 장면을 결합했습니다.',
    howIMadeThis: {
      tools: ['Sony A7IV', 'Adobe Lightroom', 'Midjourney v6'],
      prompt:
        'Hyperrealistic photo of plants growing through concrete cracks in Seoul, street photography style, natural light, 35mm perspective',
      processNotes:
        'Shot base photos on Sony A7IV, then used Midjourney to extend scenes and add surreal natural elements, blended in Photoshop.',
    },
    thumbnailAlt: 'Plants growing through concrete',
    imageSrc: '/images/photo/p1.jpg',
    featured: true,
  },
  {
    id: 'p2',
    category: 'photography',
    title: 'Market Hours',
    titleKo: '시장의 시간',
    year: 2023,
    tools: ['Fujifilm X-T5', 'Lightroom'],
    description: 'Documentary portrait series shot in traditional Korean markets.',
    descriptionKo: '한국 전통 시장에서 촬영한 다큐멘터리 포트레이트 시리즈.',
    howIMadeThis: {
      tools: ['Fujifilm X-T5', 'Adobe Lightroom'],
      processNotes:
        "Used Fuji's Classic Chrome simulation for the documentary feel. Shot over 3 weekends across Gwangjang, Noryangjin, and Dongdaemun markets.",
    },
    thumbnailAlt: 'Market vendor portrait',
    imageSrc: '/images/photo/p2.jpg',
  },
  {
    id: 'p3',
    category: 'photography',
    title: 'Light Studies',
    titleKo: '빛의 연구',
    year: 2024,
    tools: ['iPhone 15 Pro', 'Darkroom'],
    description: 'Minimal compositions studying how light transforms everyday objects.',
    descriptionKo: '빛이 일상 사물을 변환하는 방식을 연구하는 미니멀 구성.',
    howIMadeThis: {
      tools: ['iPhone 15 Pro', 'Darkroom App'],
      processNotes:
        'Shot exclusively with iPhone for the constraint challenge. Used Darkroom for editing with a consistent minimal preset across all frames.',
    },
    thumbnailAlt: 'Light through glass abstract',
    imageSrc: '/images/photo/p3.jpg',
  },
  {
    id: 'p4',
    category: 'photography',
    title: 'Smoke & Light',
    titleKo: '연기와 빛',
    year: 2024,
    tools: ['Midjourney', 'Lightroom'],
    description: 'High-contrast editorial exploring the tension between shadow and dramatic colored light.',
    descriptionKo: '그림자와 극적인 빛의 긴장감을 탐구하는 하이 콘트라스트 에디토리얼.',
    howIMadeThis: {
      tools: ['Midjourney v6'],
      prompt: 'Elite special forces soldier standing in dramatic red and blue smoke, cinematic lighting, high contrast, dark environment',
      processNotes: 'Generated with Midjourney using split-light prompts. The red/blue duality was intentional — heat vs. cold, action vs. stillness.',
    },
    thumbnailAlt: 'Soldier in dramatic colored smoke',
    imageSrc: '/images/photo/p4.jpg',
  },
  {
    id: 'p5',
    category: 'photography',
    title: 'Arcane',
    titleKo: '아케인',
    year: 2024,
    tools: ['Midjourney', 'Photoshop'],
    description: 'A wizard mid-spell — swirling multicolored energy rendered with photorealistic detail.',
    descriptionKo: '주문 시전 중인 마법사 — 다채로운 에너지를 포토리얼리스틱하게 렌더링.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Adobe Photoshop'],
      prompt: 'Powerful wizard casting a spell, swirling multicolored magic, cinematic dark background, photorealistic, gold rune circle on floor',
      processNotes: 'Required many iterations to get the energy flow right. Final version composited in Photoshop to deepen the shadows.',
    },
    thumbnailAlt: 'Wizard casting colorful spell',
    imageSrc: '/images/photo/p5.jpg',
  },

  // ─── Design ──────────────────────────────────────────────────────────────
  {
    id: 'd1',
    category: 'design',
    title: 'MOD Card System',
    titleKo: 'MOD 카드 시스템',
    year: 2024,
    tools: ['Illustrator', 'InDesign', 'Figma'],
    description:
      'A 54-card thinking framework deck for structured brainstorming and decision-making.',
    descriptionKo:
      '구조적 브레인스토밍과 의사결정을 위한 54장의 사고 프레임워크 덱.',
    howIMadeThis: {
      tools: ['Adobe Illustrator', 'Adobe InDesign', 'Figma'],
      processNotes:
        'Designed in three versions: thought cards (v1), knowledge cards (v2), agent cards (v3). Each version builds on the previous system with increasing abstraction.',
    },
    thumbnailAlt: 'Abstract card layout design',
    featured: true,
  },
  {
    id: 'd2',
    category: 'design',
    title: 'Planby Visual Identity',
    titleKo: 'Planby 비주얼 아이덴티티',
    year: 2023,
    tools: ['Figma', 'Illustrator'],
    description: 'Complete visual identity for a strategy consulting startup.',
    descriptionKo: '전략 컨설팅 스타트업의 완전한 비주얼 아이덴티티.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Illustrator', 'Notion'],
      processNotes:
        'Started with brand workshop sessions to define values and positioning, then translated into a visual system: logo, color, typography, and motion guidelines.',
    },
    thumbnailAlt: 'Brand identity mockup',
  },
  {
    id: 'd3',
    category: 'design',
    title: 'Finance Dashboard UI',
    titleKo: '재무 대시보드 UI',
    year: 2024,
    tools: ['Figma', 'Framer'],
    description: 'Data visualization dashboard for personal finance tracking.',
    descriptionKo: '개인 재무 추적을 위한 데이터 시각화 대시보드.',
    howIMadeThis: {
      tools: ['Figma', 'Framer'],
      processNotes:
        'Designed with a focus on information hierarchy — what do you need to see at 8am vs 10pm? Different density views for different contexts.',
    },
    thumbnailAlt: 'Financial data visualization',
  },

  // ─── Development ─────────────────────────────────────────────────────────
  {
    id: 'dev1',
    category: 'development',
    title: 'Multi-Agent Orchestration',
    titleKo: '멀티에이전트 오케스트레이션',
    year: 2025,
    tools: ['Claude Code', 'Bash', 'Python', 'YAML'],
    description:
      'A personal orchestration system managing Claude, Codex, and Gemini as specialized worker agents.',
    descriptionKo:
      'Claude, Codex, Gemini를 전문 작업자 에이전트로 관리하는 개인 오케스트레이션 시스템.',
    howIMadeThis: {
      tools: ['Claude Code', 'Bash scripts', 'Python', 'YAML config'],
      processNotes:
        'Built a persistent queue system with JSON state files, routing logic based on task type, and automatic fallback between agents. E2E tested across macOS and Windows.',
    },
    thumbnailAlt: 'System architecture diagram',
    featured: true,
  },
  {
    id: 'dev2',
    category: 'development',
    title: 'Notion Database CLI',
    titleKo: 'Notion 데이터베이스 CLI',
    year: 2024,
    tools: ['Python', 'Notion API', 'Claude API'],
    description:
      'CLI tools for managing personal and company Notion workspaces programmatically.',
    descriptionKo:
      '개인 및 회사 Notion 워크스페이스를 프로그래밍 방식으로 관리하는 CLI 도구.',
    howIMadeThis: {
      tools: ['Python', 'Notion API', 'Anthropic Claude API'],
      processNotes:
        'Built a unified CLI that wraps both personal and company Notion tokens, with smart routing based on content type and workspace context.',
    },
    thumbnailAlt: 'Terminal interface abstract',
  },
  {
    id: 'dev3',
    category: 'development',
    title: 'Workflow Automation Stack',
    titleKo: '워크플로우 자동화 스택',
    year: 2023,
    tools: ['Python', 'Make', 'Notion', 'Slack'],
    description:
      'End-to-end automation connecting project management, communication, and reporting.',
    descriptionKo:
      '프로젝트 관리, 커뮤니케이션, 보고서를 연결하는 엔드투엔드 자동화.',
    howIMadeThis: {
      tools: ['Python', 'Make (Integromat)', 'Notion API', 'Slack API'],
      processNotes:
        'Mapped all manual weekly reporting tasks, then built automation for 80% of them. Saved ~4 hours/week across the team.',
    },
    thumbnailAlt: 'Workflow diagram abstract',
  },

  // ─── Strategy ────────────────────────────────────────────────────────────
  {
    id: 's1',
    category: 'strategy',
    title: 'OKR-ROI Framework',
    titleKo: 'OKR-ROI 프레임워크',
    year: 2024,
    tools: ['Notion', 'Excel', 'Figma'],
    description:
      'A framework connecting OKR goal-setting with financial ROI measurement for small teams.',
    descriptionKo:
      '소규모 팀을 위한 OKR 목표 설정과 재무 ROI 측정을 연결하는 프레임워크.',
    howIMadeThis: {
      tools: ['Notion', 'Microsoft Excel', 'Figma'],
      processNotes:
        'Built through 6 months of iteration with Planby. Key insight: OKRs and financial metrics live in parallel universes — this bridges them with a shared scoring layer.',
    },
    thumbnailAlt: 'Strategic framework visualization',
    featured: true,
  },
  {
    id: 's2',
    category: 'strategy',
    title: 'AI Adoption Roadmap',
    titleKo: 'AI 도입 로드맵',
    year: 2025,
    tools: ['Notion', 'Figma', 'Claude'],
    description:
      'A structured approach for SMEs to adopt AI tools without disrupting existing operations.',
    descriptionKo:
      '기존 운영을 방해하지 않고 AI 도구를 도입하기 위한 SME 구조화 접근법.',
    howIMadeThis: {
      tools: ['Notion', 'Figma', 'Claude as research assistant'],
      processNotes:
        'Synthesized patterns from 20+ AI adoption case studies into a 4-phase framework: Audit → Pilot → Scale → Sustain.',
    },
    thumbnailAlt: 'Strategic roadmap diagram',
  },
  {
    id: 's3',
    category: 'strategy',
    title: 'Personal Finance System',
    titleKo: '개인 재무 시스템',
    year: 2023,
    tools: ['Excel', 'Python', 'Notion'],
    description:
      'A comprehensive personal finance tracking and projection system built on accounting principles.',
    descriptionKo: '회계 원칙 기반의 포괄적인 개인 재무 추적 및 예측 시스템.',
    howIMadeThis: {
      tools: ['Microsoft Excel', 'Python', 'Notion'],
      processNotes:
        'Applied double-entry bookkeeping principles to personal finance. Built automated monthly closes and 5-year projections with scenario modeling.',
    },
    thumbnailAlt: 'Financial spreadsheet abstract',
  },
]

export function getWorksByCategory(categoryId: string): WorkItem[] {
  return works.filter((w) => w.category === categoryId)
}

export function getWorkById(id: string): WorkItem | undefined {
  return works.find((w) => w.id === id)
}
