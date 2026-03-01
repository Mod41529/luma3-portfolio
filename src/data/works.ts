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
    nameEn: 'Business',
    nameKo: '비즈니스',
    description: 'Strategy, finance, marketing, and operations — end-to-end business thinking.',
    descriptionKo: '전략·재무·마케팅·생산 — 비즈니스 전 영역에 걸친 사고.',
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
    title: 'Inner Universe',
    titleKo: '내부 우주',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'Microscopic biological cells rendered as a glowing alien ecosystem — the body as cosmos.',
    descriptionKo:
      '발광하는 미시 세포들을 외계 생태계로 렌더링. 몸 안에 존재하는 우주.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Microscopic biological cells glowing in vibrant colors, bioluminescent, alien ecosystem, deep space aesthetic, ultra detailed',
      processNotes:
        'Generated the base image in Midjourney, then animated with Kling to bring the cellular structures to life. The motion reveals depth that the static image only hints at.',
    },
    thumbnailAlt: 'Glowing microscopic cells',
    videoSrc: '/videos/v2.mp4',
    thumbnailSrc: '/images/thumbnails/v2.jpg',
  },
  {
    id: 'v3',
    category: 'video',
    title: 'First Light',
    titleKo: '첫 번째 빛',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'A child releases balloons into a bright summer sky — innocence, color, and upward motion.',
    descriptionKo:
      '아이가 여름 하늘로 풍선을 날려 보내는 순간. 순수함, 색채, 상승.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'First-person perspective of a child releasing colorful balloons into blue summer sky, cinematic, warm sunlight, dreamy',
      processNotes:
        'The first-person framing was intentional — placing the viewer inside the memory rather than observing it. Kling preserved the soft light remarkably well.',
    },
    thumbnailAlt: 'Child releasing colorful balloons into sky',
    videoSrc: '/videos/v3.mp4',
    thumbnailSrc: '/images/thumbnails/v3.jpg',
  },
  {
    id: 'v4',
    category: 'video',
    title: 'Abyss',
    titleKo: '심연',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'A lone diver stands in a glowing bioluminescent reef — small against the infinite dark.',
    descriptionKo:
      '생물발광 산호초 속 홀로 선 다이버. 무한한 어둠 앞의 작은 존재.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Deep sea diver surrounded by glowing bioluminescent creatures, dark underwater, neon purples and greens, cinematic wide shot',
      processNotes:
        'The scale contrast between the diver and the environment was the core concept. Kling added subtle particle movement that made the creatures feel alive.',
    },
    thumbnailAlt: 'Diver in bioluminescent deep sea',
    videoSrc: '/videos/v4.mp4',
    thumbnailSrc: '/images/thumbnails/v4.jpg',
  },
  {
    id: 'v5',
    category: 'video',
    title: 'Mountain Line',
    titleKo: '산악 질주',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'An orange supercar cuts through a mountain road at dusk — speed as pure sensation.',
    descriptionKo:
      '황혼의 산악 도로를 달리는 오렌지색 슈퍼카. 감각으로서의 속도.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Luxury sports car speeding through mountain road, dramatic sunset sky, motion blur, cinematic, hyperrealistic',
      processNotes:
        'Focused on the motion blur in the road surface — Kling handled the directional blur well, giving the sense of real velocity.',
    },
    thumbnailAlt: 'Orange supercar on mountain road at sunset',
    videoSrc: '/videos/v5.mp4',
    thumbnailSrc: '/images/thumbnails/v5.jpg',
  },
  {
    id: 'v6',
    category: 'video',
    title: 'Chromatic Burst',
    titleKo: '크로마틱 버스트',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'An explosion of liquid pigments suspended in dark space — color as raw energy.',
    descriptionKo:
      '어둠 속 액체 안료의 폭발. 에너지 그 자체로서의 색채.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Explosion of liquid colors in mid-air, swirling paint, black background, ultra detailed, macro photography style',
      processNotes:
        'The static image was already striking, but the animation added a sense of ongoing expansion — like the explosion is still happening.',
    },
    thumbnailAlt: 'Colorful liquid paint explosion on black background',
    videoSrc: '/videos/v6.mp4',
    thumbnailSrc: '/images/thumbnails/v6.jpg',
    featured: true,
  },
  {
    id: 'v7',
    category: 'video',
    title: 'Urban Signal',
    titleKo: '어반 시그널',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'A fashion model on a vibrant city street — the body as visual language against urban noise.',
    descriptionKo:
      '컬러풀한 도시 거리의 패션 모델. 도시의 소음에 맞서는 시각 언어로서의 몸.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'High fashion model walking through colorful urban street, editorial photography style, vivid colors, cinematic bokeh',
      processNotes:
        'The challenge was keeping the model sharp while the background felt alive. Kling introduced subtle movement in her dress and the background elements.',
    },
    thumbnailAlt: 'Fashion model on colorful urban street',
    videoSrc: '/videos/v7.mp4',
    thumbnailSrc: '/images/thumbnails/v7.jpg',
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
  {
    id: 'm4',
    category: 'music',
    title: 'All Ways Awake',
    titleKo: '언제나 깨어',
    year: 2025,
    tools: ['SUNO', 'Ableton'],
    description:
      'A late-night electronic piece — restless energy captured in layered synths and a driving rhythm that never quite settles.',
    descriptionKo:
      '깊은 밤의 불면을 담은 일렉트로닉 트랙. 안정되지 않는 리듬과 레이어드 신스.',
    howIMadeThis: {
      tools: ['SUNO', 'Ableton Live'],
      processNotes:
        'The title came first — the feeling of being wired at 2am. Built the arrangement around that tension: a beat that keeps threatening to drop but never fully resolves.',
    },
    thumbnailAlt: 'Night synth waveform',
    audioSrc: '/audio/m4.mp3',
  },
  {
    id: 'm5',
    category: 'music',
    title: 'Distorted Daydream',
    titleKo: '왜곡된 백일몽',
    year: 2025,
    tools: ['SUNO', 'Logic Pro'],
    description:
      'Clave-driven rhythm mutated through distortion — a percussive daydream that blurs the line between structure and chaos.',
    descriptionKo:
      '클라베 리듬을 왜곡으로 변형한 타악기적 백일몽. 구조와 혼돈의 경계.',
    howIMadeThis: {
      tools: ['SUNO', 'Logic Pro X'],
      prompt:
        'Clave rhythm, afrobeat influence, heavily distorted percussion, dreamy atmosphere, hypnotic loop, 95bpm',
      processNotes:
        'Started with a traditional clave pattern, then ran it through distortion chains until it felt hallucinatory. Mixed clean and destroyed versions in parallel.',
    },
    thumbnailAlt: 'Distorted rhythm waveform',
    audioSrc: '/audio/m5.mp3',
  },
  {
    id: 'm6',
    category: 'music',
    title: 'luv4',
    titleKo: 'luv4',
    year: 2025,
    tools: ['SUNO', 'Udio'],
    description:
      'A short, unpolished love song — the fourth draft that finally felt honest.',
    descriptionKo:
      '짧고 다듬어지지 않은 러브송. 솔직하게 느껴진 네 번째 초안.',
    howIMadeThis: {
      tools: ['SUNO', 'Udio'],
      processNotes:
        'Made three versions before this one. Kept the rough edges intentionally — sometimes the imperfection is the point.',
    },
    thumbnailAlt: 'Soft waveform',
    audioSrc: '/audio/m6.mp3',
  },

  // ─── Photography ─────────────────────────────────────────────────────────
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
  {
    id: 'p6',
    category: 'photography',
    title: 'The Frontier',
    titleKo: '프론티어',
    year: 2026,
    tools: ['Midjourney'],
    description:
      'An astronaut stands alone on a rocky alien surface, dwarfed by a sky of colliding nebulae — the scale of wonder.',
    descriptionKo:
      '충돌하는 성운으로 가득 찬 하늘 아래 혼자 선 우주비행사. 경이로움의 스케일.',
    howIMadeThis: {
      tools: ['Midjourney v6'],
      prompt:
        'Astronaut standing on colorful alien planet, massive nebula sky, orange and blue, cinematic, silhouette, epic scale',
      processNotes:
        'The goal was to show smallness as awe rather than loneliness. The warm/cool color split in the sky creates a tension that keeps the image alive.',
    },
    thumbnailAlt: 'Astronaut silhouette against colorful alien nebula sky',
    imageSrc: '/images/photo/p6.jpg',
  },
  {
    id: 'p8',
    category: 'photography',
    title: 'Neon Shore',
    titleKo: '네온 쇼어',
    year: 2026,
    tools: ['Midjourney'],
    description:
      'A futuristic city skyline reflected in still water at night — pink and blue neon bleeding into fog.',
    descriptionKo:
      '야간 수면에 반사된 미래 도시 스카이라인. 안개 속으로 번지는 핑크와 블루 네온.',
    howIMadeThis: {
      tools: ['Midjourney v6'],
      prompt:
        'Futuristic city skyline at night, neon pink and blue reflections on water, foggy atmosphere, cyberpunk aesthetic, wide shot',
      processNotes:
        'The fog was the key ingredient — it softens the hard edges of the architecture and makes the neon feel atmospheric rather than decorative.',
    },
    thumbnailAlt: 'Futuristic city skyline with neon reflections',
    imageSrc: '/images/photo/p8.jpg',
  },
  {
    id: 'p9',
    category: 'photography',
    title: 'Last Stand',
    titleKo: '최후의 순간',
    year: 2026,
    tools: ['Midjourney'],
    description:
      'An ancient warrior silhouetted against a burning sunset sky — stillness before the storm.',
    descriptionKo:
      '불타는 일몰 하늘을 배경으로 한 고대 전사의 실루엣. 폭풍 전의 고요.',
    howIMadeThis: {
      tools: ['Midjourney v6'],
      prompt:
        'Ancient warrior standing on battlefield at sunrise, dramatic orange sky, silhouette, cinematic, Greek soldier with shield and spear',
      processNotes:
        'Kept the warrior as a pure silhouette — identity stripped to form. The sky does all the emotional work.',
    },
    thumbnailAlt: 'Ancient warrior silhouette against dramatic orange sky',
    imageSrc: '/images/photo/p9.jpg',
  },
  {
    id: 'p10',
    category: 'photography',
    title: 'Stage Fever',
    titleKo: '스테이지 피버',
    year: 2026,
    tools: ['Midjourney'],
    description:
      'A guitarist lost in the music, wrapped in colored smoke and stage light — the moment of total surrender.',
    descriptionKo:
      '컬러 스모크와 무대 조명에 싸인 기타리스트. 완전한 몰입의 순간.',
    howIMadeThis: {
      tools: ['Midjourney v6'],
      prompt:
        'Electric guitarist on stage during summer music festival, colorful smoke, dramatic stage lighting, silhouette, crowd in background',
      processNotes:
        'The silhouette treatment was deliberate — any face would reduce this to a portrait. As a silhouette, it becomes everyone who has ever lost themselves in music.',
    },
    thumbnailAlt: 'Guitarist silhouette on stage with colorful smoke',
    imageSrc: '/images/photo/p10.jpg',
  },
  {
    id: 'p11',
    category: 'photography',
    title: 'Pigment Storm',
    titleKo: '안료의 폭풍',
    year: 2026,
    tools: ['Midjourney'],
    description:
      'Liquid pigments colliding in mid-air against pure black — controlled chaos, color as force.',
    descriptionKo:
      '순수한 검정 배경 위 공중에서 충돌하는 액체 안료. 통제된 혼돈, 힘으로서의 색채.',
    howIMadeThis: {
      tools: ['Midjourney v6'],
      prompt:
        'Explosion of liquid colors in mid-air, swirling paint pigments, pure black background, macro photography, ultra detailed',
      processNotes:
        'Companion piece to the video Chromatic Burst. Studied high-speed liquid photography references to get the fluid dynamics right in the prompt.',
    },
    thumbnailAlt: 'Colorful liquid pigment explosion on black background',
    imageSrc: '/images/photo/p11.jpg',
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
      'A 54-card thinking framework deck for structured brainstorming and decision-making. Physically produced.',
    descriptionKo:
      '구조적 브레인스토밍과 의사결정을 위한 54장의 사고 프레임워크 덱. 실물 제작.',
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
    title: 'AI Orchestration Poster',
    titleKo: 'AI 오케스트레이션 포스터',
    year: 2025,
    tools: ['Figma', 'Photoshop'],
    description: 'Editorial poster introducing the Claude + Gemini + ChatGPT orchestration pipeline.',
    descriptionKo: 'Claude · Gemini · ChatGPT 오케스트레이션 파이프라인을 소개하는 에디토리얼 포스터.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Photoshop'],
      processNotes: 'Designed for Instagram as part of a series explaining multi-agent AI workflows to a general audience. Dark palette to reinforce the technical mood.',
    },
    thumbnailAlt: 'AI orchestration dark poster with monitor mockup',
    imageSrc: '/images/design/poster-orchestration.png',
  },
  {
    id: 'd3',
    category: 'design',
    title: 'Physical AI',
    titleKo: 'Physical AI',
    year: 2025,
    tools: ['Figma', 'Midjourney'],
    description: 'Instagram editorial poster on Physical AI — robotics and embodied intelligence in Korea 2030.',
    descriptionKo: 'Physical AI와 로보틱스를 주제로 한 인스타그램 에디토리얼 포스터.',
    howIMadeThis: {
      tools: ['Figma', 'Midjourney'],
      processNotes: 'Composed a dark, minimal poster pairing a robotic claw image with sharp editorial typography. Part of a technology awareness series.',
    },
    thumbnailAlt: 'Physical AI poster with robotic hand on black background',
    imageSrc: '/images/design/poster-physical-ai.png',
  },
  {
    id: 'd4',
    category: 'design',
    title: 'IGNITION!',
    titleKo: 'IGNITION!',
    year: 2024,
    tools: ['Figma', 'Illustrator'],
    description: 'Motivational poster card with bold typography and fire illustration.',
    descriptionKo: '강렬한 타이포그래피와 불꽃 일러스트를 활용한 모티베이션 포스터 카드.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Illustrator'],
      processNotes: 'Exploring bold typographic hierarchy on a dark field — the tension between the calm navy and the explosive fire illustration.',
    },
    thumbnailAlt: 'IGNITION! fire poster card on navy background',
    imageSrc: '/images/design/card-ignition.png',
  },
  {
    id: 'd5',
    category: 'design',
    title: '종훈 청과 Brand Identity',
    titleKo: '종훈 청과 브랜드 아이덴티티',
    year: 2024,
    tools: ['Illustrator', 'Figma'],
    description: 'Logo and brand identity for an organic fruit juice brand.',
    descriptionKo: '유기농 과일 주스 브랜드의 로고 및 브랜드 아이덴티티.',
    howIMadeThis: {
      tools: ['Adobe Illustrator', 'Figma'],
      processNotes: 'Warm earthy palette with illustrated fruit wreath. Designed to feel handmade and trustworthy — artisan over industrial.',
    },
    thumbnailAlt: '종훈 청과 organic juice brand logo with fruit wreath',
    imageSrc: '/images/design/logo-jonghun.png',
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
    title: 'Strategy Operating System',
    titleKo: '전략 운영 시스템',
    year: 2026,
    tools: ['Notion', 'NBER', 'Claude'],
    description:
      'A quarterly research-to-action pipeline: NBER papers and Silicon Valley cases distilled into hypotheses with explicit stop criteria, applied to Planby.',
    descriptionKo:
      'NBER 논문·실리콘밸리 사례를 분기별로 추적해 가설로 전환하고 중단 기준을 명시해 Planby 실무에 적용하는 전략 운영 체계.',
    howIMadeThis: {
      tools: ['Notion', 'NBER Working Papers', 'arXiv', 'Claude as analyst'],
      processNotes:
        'Each quarter: read 3–5 academic papers (NBER/arXiv) + 2 SV case studies → extract 3 actionable hypotheses → define stop criteria → run 2-week A/B gates → distill into Explore vs Exploit operating rhythm. Built on the insight that exploration and exploitation, when mixed, reduce learning efficiency (NBER w32424).',
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
