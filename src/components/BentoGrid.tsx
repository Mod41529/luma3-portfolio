import BentoCard from './BentoCard'
import { categories, works } from '@/data/works'
import { CategoryId } from '@/types'

const gridConfig: { id: CategoryId; className: string }[] = [
  { id: 'video',       className: 'bento-video' },
  { id: 'music',       className: 'bento-music' },
  { id: 'design',      className: 'bento-design' },
  { id: 'development', className: 'bento-development' },
  { id: 'photography', className: 'bento-photography' },
  { id: 'strategy',    className: 'bento-strategy' },
]

const featuredVideo = works.find(w => w.id === 'v4')
const featuredMusic = works.find(w => w.id === 'm5') ?? works.find(w => w.category === 'music')
const featuredPhoto = works.find(w => w.id === 'p6')

export default function BentoGrid() {
  return (
    <section className="px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bento-grid">
          {gridConfig.map(({ id, className }, index) => (
            <BentoCard
              key={id}
              category={categories[id]}
              index={index}
              className={className}
              videoSrc={id === 'video' ? featuredVideo?.videoSrc : undefined}
              audioSrc={id === 'music' ? featuredMusic?.audioSrc : undefined}
              audioTitle={id === 'music' ? featuredMusic?.title : undefined}
              audioTitleKo={id === 'music' ? featuredMusic?.titleKo : undefined}
              imageSrc={id === 'photography' ? featuredPhoto?.imageSrc : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
