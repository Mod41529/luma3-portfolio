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
  business: {
    id: 'business',
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
    year: 2026,
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
    aspectRatio: '1/1',
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
    aspectRatio: '1/1',
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
    aspectRatio: '16/9',
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
    aspectRatio: '4/3',
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
    aspectRatio: '4/3',
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
    aspectRatio: '4/3',
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
    aspectRatio: '4/3',
  },
  {
    id: 'v8',
    category: 'video',
    title: 'Iron Will',
    titleKo: '강철 의지',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'An athlete grinding through push-ups in raw black-and-white — discipline stripped of all decoration.',
    descriptionKo:
      '흑백으로 담아낸 운동선수의 팔굽혀펴기. 장식 없이 드러나는 의지.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Athletic man doing push-ups, black and white, dramatic lighting, close-up, raw and gritty, cinematic',
      processNotes:
        'Shot in monochrome to strip away all distraction. The tight framing puts focus entirely on the physical effort.',
    },
    thumbnailAlt: 'Athlete doing push-ups in black and white',
    videoSrc: '/videos/v8.mp4',
    thumbnailSrc: '/images/thumbnails/v8.jpg',
    aspectRatio: '512/768',
  },
  {
    id: 'v9',
    category: 'video',
    title: 'Bioluminescent Shore',
    titleKo: '발광의 해안',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      "Waves glow neon blue as they break on a dark shore — nature's own light show.",
    descriptionKo:
      '어두운 해안으로 부서지는 네온블루 파도. 자연이 만든 빛의 쇼.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Bioluminescent ocean waves crashing on dark beach at night, glowing blue, magical, long exposure style',
      processNotes:
        'The challenge was sustaining the glow intensity through the wave motion. Kling handled the particle dispersal naturally.',
    },
    thumbnailAlt: 'Glowing bioluminescent waves on dark beach',
    videoSrc: '/videos/v9.mp4',
    thumbnailSrc: '/images/thumbnails/v9.jpg',
    aspectRatio: '832/464',
  },
  {
    id: 'v10',
    category: 'video',
    title: 'Silent Advance',
    titleKo: '침묵의 전진',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'Special forces move through dense jungle fog — tension built from restraint, not action.',
    descriptionKo:
      '짙은 정글 안개 속 특수부대의 이동. 행동이 아닌 절제로 만들어낸 긴장감.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Elite special forces soldiers moving through dense jungle fog, tactical gear, cinematic, muted colors, tense atmosphere',
      processNotes:
        'Kept the motion slow and deliberate. The fog layer added natural depth without any post-processing.',
    },
    thumbnailAlt: 'Special forces in jungle fog',
    videoSrc: '/videos/v10.mp4',
    thumbnailSrc: '/images/thumbnails/v10.jpg',
    aspectRatio: '560/704',
  },
  {
    id: 'v11',
    category: 'video',
    title: 'Garage Session',
    titleKo: '차고 세션',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'An indie rock band plays in a dim garage — raw energy, worn amps, real sweat.',
    descriptionKo:
      '어두운 차고에서 연주하는 인디 밴드. 날것의 에너지, 낡은 앰프, 진짜 땀.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Indie rock band playing in dimly lit garage, vintage amps, gritty atmosphere, warm tungsten light, documentary style',
      processNotes:
        'The tungsten warmth was key — cool light would have killed the intimacy. Kling captured the subtle instrument vibration well.',
    },
    thumbnailAlt: 'Indie rock band playing in a garage',
    videoSrc: '/videos/v11.mp4',
    thumbnailSrc: '/images/thumbnails/v11.jpg',
    aspectRatio: '832/464',
  },
  {
    id: 'v12',
    category: 'video',
    title: 'Edge of Everything',
    titleKo: '모든 것의 끝에서',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      "A lone figure stands at the cliff's edge as waves crash hundreds of feet below — scale as emotion.",
    descriptionKo:
      '수백 피트 아래로 파도가 부서지는 절벽 끝에 선 고독한 인물. 감정으로서의 규모.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Lone silhouette standing at dramatic cliff edge, crashing ocean waves far below, overcast sky, cinematic wide shot, solitude',
      processNotes:
        'The vertical framing emphasizes the height and isolation. Kling added cloud movement and wave spray that made the scale feel real.',
    },
    thumbnailAlt: 'Lone figure at dramatic cliff edge above ocean',
    videoSrc: '/videos/v12.mp4',
    thumbnailSrc: '/images/thumbnails/v12.jpg',
    aspectRatio: '464/832',
  },
  {
    id: 'v13',
    category: 'video',
    title: 'Summit Calm',
    titleKo: '정상의 고요',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'Snow-covered peaks emerge from a sea of clouds at golden hour — silence made visible.',
    descriptionKo:
      '황금빛 시간, 구름 바다 위로 솟은 설봉. 눈에 보이는 침묵.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Snow-capped mountain peaks above clouds at golden hour, aerial view, serene, cinematic, warm orange light',
      processNotes:
        'The slow cloud drift was the only motion needed. Kling kept it subtle — any faster and the serenity would have been lost.',
    },
    thumbnailAlt: 'Snow-capped mountain peaks above clouds at golden hour',
    videoSrc: '/videos/v13.mp4',
    thumbnailSrc: '/images/thumbnails/v13.jpg',
    aspectRatio: '832/464',
  },
  {
    id: 'v14',
    category: 'video',
    title: 'Mach',
    titleKo: '마하',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'A fighter jet tears through open sky at ultra-wide — speed that makes silence feel loud.',
    descriptionKo:
      '초광각으로 담은 전투기의 하늘 질주. 침묵이 소음처럼 느껴지는 속도.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Fighter jet flying at high speed through clear blue sky, ultra-wide angle, motion blur, cinematic, dramatic',
      processNotes:
        'The ultra-wide crop was deliberate — more sky emphasizes the isolation and velocity. Kling nailed the contrail and blur.',
    },
    thumbnailAlt: 'Fighter jet flying through clear blue sky',
    videoSrc: '/videos/v14.mp4',
    thumbnailSrc: '/images/thumbnails/v14.jpg',
    aspectRatio: '928/400',
  },
  {
    id: 'v15',
    category: 'video',
    title: 'The Pass',
    titleKo: '더 패스',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'A chef plates a dish with surgical precision — craft visible in every gesture.',
    descriptionKo:
      '정밀한 손길로 플레이팅하는 셰프. 모든 동작에서 보이는 장인 정신.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Professional chef plating a fine dining dish, close-up hands, warm kitchen light, cinematic, precise movements',
      processNotes:
        'Square format felt right for the intimacy of the close-up. The warm kitchen light required no color grading.',
    },
    thumbnailAlt: 'Chef plating a fine dining dish',
    videoSrc: '/videos/v15.mp4',
    thumbnailSrc: '/images/thumbnails/v15.jpg',
    aspectRatio: '1/1',
  },
  {
    id: 'v16',
    category: 'video',
    title: 'Coastal Run',
    titleKo: '해안 질주',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'A lone runner traces the coastline at dawn — the rhythm of breath against breaking waves.',
    descriptionKo:
      '새벽 해안선을 달리는 단독 러너. 파도 소리와 호흡의 리듬.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Runner on coastal path at dawn, ocean beside them, soft morning light, cinematic, solitude and motion',
      processNotes:
        'The 3:2 crop mirrors a classic film still. Dawn light needed no enhancement — the scene was already perfect.',
    },
    thumbnailAlt: 'Runner on coastal path at dawn',
    videoSrc: '/videos/v16.mp4',
    thumbnailSrc: '/images/thumbnails/v16.jpg',
    aspectRatio: '3/2',
  },
  {
    id: 'v17',
    category: 'video',
    title: 'Form & Function',
    titleKo: '형태와 기능',
    year: 2026,
    tools: ['Midjourney', 'Kling'],
    description:
      'Brutalist architecture shot from below — geometry as power, concrete as poetry.',
    descriptionKo:
      '하부에서 올려본 브루탈리즘 건축. 권력으로서의 기하학, 시로서의 콘크리트.',
    howIMadeThis: {
      tools: ['Midjourney v6', 'Kling AI'],
      prompt:
        'Brutalist concrete architecture shot from below, dramatic perspective, geometric patterns, overcast sky, architectural photography',
      processNotes:
        'The low angle was essential — it transforms familiar concrete into something monolithic. Cloud movement added life to an otherwise static subject.',
    },
    thumbnailAlt: 'Brutalist architecture shot from below',
    videoSrc: '/videos/v17.mp4',
    thumbnailSrc: '/images/thumbnails/v17.jpg',
    aspectRatio: '720/544',
  },
  {
    id: 'v18',
    category: 'video',
    title: 'Lemon ASMR',
    titleKo: '레몬 ASMR',
    year: 2026,
    tools: ['Kling', 'Suno'],
    description:
      'A short ASMR clip — lemon slices in water, close-up textures, soft ambient sound.',
    descriptionKo:
      '레몬 슬라이스와 물의 클로즈업 텍스처. 소프트 앰비언트 사운드와 함께한 ASMR 쇼트.',
    howIMadeThis: {
      tools: ['Kling AI', 'Suno'],
      prompt:
        'Close-up of lemon slices dropping into water, slow motion, satisfying ASMR textures, soft natural lighting',
      processNotes:
        'Generated with Kling for the visual and paired with a minimal ambient track from Suno. Focused on texture — the translucent rind, water ripples, citrus color.',
    },
    thumbnailAlt: 'Close-up of lemon slice in water',
    videoSrc: '/videos/v18.mp4',
    aspectRatio: '9/16',
  },
  {
    id: 'v19',
    category: 'video',
    title: 'Video Generation Complete',
    titleKo: '영상 생성 완료',
    year: 2026,
    tools: ['Kling', 'Midjourney'],
    description:
      'An AI-generated cinematic sequence — testing the limits of current video generation models.',
    descriptionKo:
      'AI 영상 생성 모델의 가능성을 탐색한 시네마틱 시퀀스.',
    howIMadeThis: {
      tools: ['Kling AI', 'Midjourney v6'],
      processNotes:
        'Explored prompt-to-video pipelines with Kling. Multiple iterations on motion quality, temporal consistency, and cinematic framing.',
    },
    thumbnailAlt: 'AI-generated cinematic video frame',
    videoSrc: '/videos/v19.mp4',
    aspectRatio: '16/9',
  },

  // ─── Music ───────────────────────────────────────────────────────────────
  {
    id: 'm1',
    category: 'music',
    title: 'Still Water',
    titleKo: '고요한 물',
    year: 2026,
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
    year: 2026,
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
    year: 2026,
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
    year: 2026,
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
    year: 2026,
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
    id: 'm7',
    category: 'music',
    title: 'Cafe Session',
    titleKo: '카페 세션',
    year: 2026,
    tools: ['SUNO'],
    description:
      'A jazz hip-hop groove built on piano and brushed drums — the kind of track that makes a cafe feel like the right place to think.',
    descriptionKo:
      '피아노와 브러시 드럼 중심의 재즈 힙합. 카페에서 생각하기 좋은 순간을 위한 곡.',
    howIMadeThis: {
      tools: ['SUNO'],
      prompt:
        'jazz hip-hop, cafe vibe, catchy piano riff, punchy boom-bap drums, finger snaps, upright bass, vinyl crackle, no trumpet, no horns, melodic piano loop, head-nodding groove, 90bpm, instrumental',
      processNotes:
        'Generated with a hook-forward prompt — wanted the piano to carry the melody without any brass. Kept the boom-bap drums punchy to balance the softness of the chords.',
    },
    thumbnailAlt: 'Jazz piano waveform',
    audioSrc: '/audio/bento-music.mp3',
  },
  {
    id: 'm6',
    category: 'music',
    title: 'luv4',
    titleKo: 'luv4',
    year: 2026,
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

  // ─── Design ──────────────────────────────────────────────────────────────
  {
    id: 'd1',
    category: 'design',
    title: 'MOD Card System',
    titleKo: 'MOD 카드 시스템',
    year: 2026,
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
    year: 2026,
    tools: ['Figma', 'Photoshop'],
    description: 'Editorial poster introducing the Claude + Gemini + ChatGPT orchestration pipeline.',
    descriptionKo: 'Claude · Gemini · ChatGPT 오케스트레이션 파이프라인을 소개하는 에디토리얼 포스터.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Photoshop'],
      processNotes: 'Designed for Instagram as part of a series explaining multi-agent AI workflows to a general audience. Dark palette to reinforce the technical mood.',
    },
    thumbnailAlt: 'AI orchestration dark poster with monitor mockup',
    imageSrc: '/images/design/poster-orchestration.png',
    aspectRatio: '1080/1350',
  },
  {
    id: 'd3',
    category: 'design',
    title: 'Physical AI',
    titleKo: 'Physical AI',
    year: 2026,
    tools: ['Figma', 'Midjourney'],
    description: 'Instagram editorial poster on Physical AI — robotics and embodied intelligence in Korea 2030.',
    descriptionKo: 'Physical AI와 로보틱스를 주제로 한 인스타그램 에디토리얼 포스터.',
    howIMadeThis: {
      tools: ['Figma', 'Midjourney'],
      processNotes: 'Composed a dark, minimal poster pairing a robotic claw image with sharp editorial typography. Part of a technology awareness series.',
    },
    thumbnailAlt: 'Physical AI poster with robotic hand on black background',
    imageSrc: '/images/design/poster-physical-ai.png',
    aspectRatio: '1080/1440',
  },
  {
    id: 'd4',
    category: 'design',
    title: 'IGNITION!',
    titleKo: 'IGNITION!',
    year: 2026,
    tools: ['Figma', 'Illustrator'],
    description: 'Motivational poster card with bold typography and fire illustration.',
    descriptionKo: '강렬한 타이포그래피와 불꽃 일러스트를 활용한 모티베이션 포스터 카드.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Illustrator'],
      processNotes: 'Exploring bold typographic hierarchy on a dark field — the tension between the calm navy and the explosive fire illustration.',
    },
    thumbnailAlt: 'IGNITION! fire poster card on navy background',
    imageSrc: '/images/design/card-ignition.png',
    aspectRatio: '857/1200',
  },
  {
    id: 'd5',
    category: 'design',
    title: '종훈 청과 Brand Motion',
    titleKo: '종훈 청과 브랜드 모션',
    year: 2026,
    tools: ['Illustrator', 'Figma', 'After Effects'],
    description: 'Animated brand logo for an organic fruit juice brand — fruit wreath blooming into the logotype.',
    descriptionKo: '유기농 과일 주스 브랜드의 로고 모션. 과일 리스가 피어나며 로고타입으로 전환.',
    howIMadeThis: {
      tools: ['Adobe Illustrator', 'Figma', 'Adobe After Effects'],
      processNotes: 'Static brand identity brought to life with a gentle bloom animation. Warm earthy palette and illustrated fruit wreath — artisan over industrial.',
    },
    thumbnailAlt: '종훈 청과 brand logo animation',
    videoSrc: '/videos/design-jonghun-brand.mp4',
    aspectRatio: '1556/2000',
  },
  {
    id: 'd6',
    category: 'design',
    title: 'AI Tech Innovations — Business Card (Front)',
    titleKo: 'AI Tech Innovations 명함 앞면',
    year: 2026,
    tools: ['Figma', 'Illustrator'],
    description: 'Business card front for an AI technology firm — clean, dark, and technical.',
    descriptionKo: 'AI 기술 회사의 명함 앞면 — 클린하고 다크한 테크 무드.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Illustrator'],
      processNotes:
        'Dark background with precise typographic grid. The circuit-board motif reinforces the AI/tech identity without being heavy-handed.',
    },
    thumbnailAlt: 'AI Tech Innovations business card front',
    imageSrc: '/images/design/card-ai-tech-1.png',
    aspectRatio: '1050/600',
  },
  {
    id: 'd7',
    category: 'design',
    title: 'AI Tech Innovations — Business Card (Back)',
    titleKo: 'AI Tech Innovations 명함 뒷면',
    year: 2026,
    tools: ['Figma', 'Illustrator'],
    description: 'Business card back — logo lockup and contact details on a dark field.',
    descriptionKo: 'AI Tech Innovations 명함 뒷면 — 로고와 연락처.',
    howIMadeThis: {
      tools: ['Figma', 'Adobe Illustrator'],
      processNotes:
        'Kept the back minimal — logo centered, contact details below. Consistent dark palette ties front and back together as a system.',
    },
    thumbnailAlt: 'AI Tech Innovations business card back',
    imageSrc: '/images/design/card-ai-tech-2.png',
    aspectRatio: '1050/600',
  },
  {
    id: 'd8',
    category: 'design',
    title: '멍냥 Brand Identity',
    titleKo: '멍냥 브랜드 아이덴티티',
    year: 2026,
    tools: ['Illustrator', 'Midjourney'],
    description: 'Logo and banner for a pet brand — warm, playful, and handcrafted in feel.',
    descriptionKo: '반려동물 브랜드 멍냥의 로고 및 배너. 따뜻하고 유쾌한 손그림 무드.',
    howIMadeThis: {
      tools: ['Adobe Illustrator', 'Midjourney'],
      processNotes:
        'Illustrated characters were generated with Midjourney and refined in Illustrator. The rounded Korean lettering was custom-drawn to match the soft, friendly tone of the brand.',
    },
    thumbnailAlt: '멍냥 pet brand logo with illustrated dogs and cats',
    imageSrc: '/images/design/logo-meongnayang.png',
    aspectRatio: '1/1',
  },
  {
    id: 'd9',
    category: 'design',
    title: 'AI Concept Word Cloud',
    titleKo: 'AI 개념 워드클라우드',
    year: 2026,
    tools: ['Python', 'wordcloud', 'matplotlib'],
    description: 'A visual map of 200+ AI/ML concepts rendered as a word cloud — size encodes relative prominence in the field.',
    descriptionKo: '200개 이상의 AI·ML 개념을 빈도 기반 크기로 시각화한 워드클라우드.',
    howIMadeThis: {
      tools: ['Python', 'wordcloud', 'matplotlib'],
      processNotes:
        'Generated programmatically using Python\'s wordcloud library. Terms were curated from AI research papers and industry vocabulary, then color-mapped by semantic category.',
    },
    thumbnailAlt: 'Colorful word cloud of AI and machine learning concepts',
    imageSrc: '/images/design/wordcloud-ai.png',
    aspectRatio: '1/1',
  },
  {
    id: 'd10',
    category: 'design',
    title: 'Maze — Algorithmic Generation',
    titleKo: '미로 — 알고리즘 생성',
    year: 2026,
    tools: ['Python', 'Pillow'],
    description: 'A procedurally generated maze using recursive backtracking. Entry top-left, exit bottom-right.',
    descriptionKo: '재귀 백트래킹 알고리즘으로 절차적 생성한 미로. 입구 좌상단, 출구 우하단.',
    howIMadeThis: {
      tools: ['Python', 'Pillow'],
      processNotes:
        'Implemented recursive backtracking (DFS) to carve passages through a grid. The result is a perfect maze — exactly one solution path — rendered to PNG via Pillow.',
    },
    thumbnailAlt: 'Black and white algorithmic maze with entry and exit markers',
    imageSrc: '/images/design/maze.png',
    aspectRatio: '1/1',
  },

  // ─── Development ─────────────────────────────────────────────────────────
  {
    id: 'dev1',
    category: 'development',
    title: 'Multi-Agent Orchestration',
    titleKo: '멀티에이전트 오케스트레이션',
    year: 2026,
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
    year: 2026,
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
    year: 2026,
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

  {
    id: 'dev4',
    category: 'development',
    title: 'luma3 Portfolio',
    titleKo: 'luma3 포트폴리오 웹사이트',
    year: 2026,
    tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    description:
      'This portfolio site — built with Next.js static export, IntersectionObserver-based lazy loading for 19+ videos, dark mode, and full SEO setup.',
    descriptionKo:
      'Next.js 정적 내보내기 기반 포트폴리오. 영상 19개 IntersectionObserver 레이지 로딩, 다크모드, SEO 완성.',
    howIMadeThis: {
      tools: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'satori + resvg'],
      processNotes:
        'Solved a @vercel/next v50 NEXT_MISSING_LAMBDA bug by switching to output: export. Generated OG image at build-time with satori + resvg without any native binaries.',
    },
    thumbnailAlt: 'luma3 portfolio site screenshot',
  },
  {
    id: 'dev5',
    category: 'development',
    title: 'Investment Automation Bot',
    titleKo: '투자 자동화 봇',
    year: 2026,
    tools: ['Python', 'KIS API', 'Alpaca', 'SQLite', 'Telegram'],
    description:
      'Automated trading bot covering Korean (KIS) and US (Alpaca) markets — momentum strategy, backtesting engine, and Telegram push alerts.',
    descriptionKo:
      '국내(KIS)·미국(Alpaca) 시장 모멘텀 전략 자동매매. 백테스팅 엔진 및 텔레그램 알림 포함.',
    howIMadeThis: {
      tools: ['Python', 'KIS Open API', 'Alpaca API', 'SQLite', 'Telegram Bot API', 'pandas'],
      processNotes:
        'Built modular execution, portfolio, and notify layers independently, then wired together via live.py. Momentum strategy validated with 1Y backtest before connecting to paper trading.',
    },
    thumbnailAlt: 'Investment bot backtesting chart',
  },
  {
    id: 'dev6',
    category: 'development',
    title: 'OpenClaw AI Agent Setup',
    titleKo: 'OpenClaw AI 에이전트 구축',
    year: 2026,
    tools: ['OpenClaw', 'Node.js', 'Telegram', 'MCP'],
    description:
      'Local AI agent platform wiring Telegram as a command channel — skill-based task routing, multi-channel interface, and cost-controlled model dispatch.',
    descriptionKo:
      'Telegram을 명령 채널로 연결한 로컬 AI 에이전트. 스킬 기반 라우팅, 멀티채널 인터페이스, 비용 통제 모델 디스패치.',
    howIMadeThis: {
      tools: ['OpenClaw', 'Node.js', 'Telegram Bot API', 'MCP'],
      processNotes:
        'Configured skill whitelists and approval gates for high-permission tasks. Integrated with existing multi-agent orchestration system as an additional command entry point.',
    },
    thumbnailAlt: 'OpenClaw agent channel diagram',
  },
  {
    id: 'dev7',
    category: 'development',
    title: 'Content Automation Pipeline',
    titleKo: '콘텐츠 자동화 파이프라인',
    year: 2026,
    tools: ['Python', 'Claude API', 'Runway', 'CapCut API'],
    description:
      'End-to-end content factory for YouTube and Instagram. Given a creative topic, the system generates thumbnails, scripts, video, and subtitles — fully automated.',
    descriptionKo:
      '유튜브·인스타그램용 콘텐츠 자동화 시스템. 주제만 입력하면 썸네일, 영상 내용, 영상화, 자막 편집까지 자동으로 처리.',
    howIMadeThis: {
      tools: ['Python', 'Claude API', 'Runway', 'CapCut API', 'Gemini'],
      processNotes:
        'Orchestrated a multi-step pipeline: Claude generates scripts and thumbnail concepts, Runway renders video, CapCut API handles subtitle editing. Human input is limited to topic selection and final approval.',
    },
    thumbnailAlt: 'Content automation pipeline diagram',
  },
  {
    id: 'dev8',
    category: 'development',
    title: 'Futsal Training App',
    titleKo: '풋살 트레이닝 앱',
    year: 2026,
    tools: ['TypeScript', 'Next.js', 'YouTube API'],
    description:
      'A self-coaching app for futsal beginners. Structured training plans covering fitness, passing, and dribbling — each drill linked to curated YouTube lesson videos.',
    descriptionKo:
      '풋살 초보자를 위한 자기주도 훈련 앱. 기초 체력부터 패스·드리블까지 단계별 커리큘럼을 유튜브 강의 영상과 연동해 혼자서도 체계적으로 연습할 수 있도록 설계.',
    howIMadeThis: {
      tools: ['TypeScript', 'Next.js', 'YouTube Data API', 'Codex'],
      processNotes:
        'Codex implemented the training plan data model and YouTube API integration. Curriculum structure and drill sequencing were designed by hand based on beginner futsal coaching frameworks.',
    },
    thumbnailAlt: 'Futsal training app screenshot',
  },

  // ─── Strategy ────────────────────────────────────────────────────────────
  {
    id: 's1',
    category: 'business',
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
    category: 'business',
    title: 'AI Adoption Roadmap',
    titleKo: 'AI 도입 로드맵',
    year: 2026,
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
    category: 'business',
    title: 'Personal Finance System',
    titleKo: '개인 재무 시스템',
    year: 2026,
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
