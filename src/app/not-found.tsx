import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-fg-subtle mb-6">
        404
      </p>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-fg leading-[0.9] mb-4">
        Page not found<span className="text-[#1978e5]">.</span>
      </h1>
      <p className="text-sm text-fg-muted font-light mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-fg px-6 py-3
                   text-sm font-bold uppercase tracking-[0.15em] text-fg
                   hover:bg-fg hover:text-bg transition-colors duration-200"
      >
        Back to home
      </Link>
    </main>
  )
}
