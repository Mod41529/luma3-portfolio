import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navigation from '@/components/Navigation'
import WorkGallery from '@/components/WorkGallery'
import { categories, getWorksByCategory } from '@/data/works'
import { CategoryId } from '@/types'

interface PageProps {
  params: { category: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(categories).map((cat) => ({ category: cat }))
}

export function generateMetadata({ params }: PageProps) {
  const category = categories[params.category as CategoryId]
  if (!category) return {}
  return {
    title: `${category.nameEn} / ${category.nameKo} — LUMA3`,
    description: category.description,
  }
}

export default function CategoryPage({ params }: PageProps) {
  const category = categories[params.category as CategoryId]
  if (!category) notFound()

  const works = getWorksByCategory(params.category)

  return (
    <main>
      <Navigation />

      <div className="min-h-screen pt-24 px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors duration-200 mb-14"
          >
            <ArrowLeft size={13} />
            All work
          </Link>

          {/* Header */}
          <div className="mb-14">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <h1
                className="text-[clamp(2.5rem,9vw,8rem)] font-medium leading-[0.9] tracking-tight"
              >
                {category.nameEn}
              </h1>
              <span className="text-[clamp(1.5rem,4vw,3.5rem)] font-light text-fg-muted leading-none">
                {category.nameKo}
              </span>
            </div>
            <p className="text-fg-muted mt-5 max-w-md text-sm leading-relaxed">
              {category.description}
            </p>
            <p className="text-fg-subtle mt-1 max-w-md text-sm leading-relaxed">
              {category.descriptionKo}
            </p>

            {/* Category accent line */}
            <div
              className="mt-6 h-px w-16 rounded-full"
              style={{ backgroundColor: category.accent }}
            />
          </div>

          {/* Gallery */}
          {works.length > 0 ? (
            <WorkGallery works={works} category={category} />
          ) : (
            <p className="text-fg-muted text-sm">No works yet — check back soon.</p>
          )}
        </div>
      </div>
    </main>
  )
}
