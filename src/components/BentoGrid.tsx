import BentoCard from './BentoCard'
import { categories } from '@/data/works'
import { CategoryId } from '@/types'

const gridConfig: { id: CategoryId; className: string }[] = [
  { id: 'video',       className: 'bento-video' },
  { id: 'music',       className: 'bento-music' },
  { id: 'design',      className: 'bento-design' },
  { id: 'development', className: 'bento-development' },
  { id: 'photography', className: 'bento-photography' },
  { id: 'strategy',    className: 'bento-strategy' },
]

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
            />
          ))}
        </div>
      </div>
    </section>
  )
}
