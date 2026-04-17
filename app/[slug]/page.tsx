import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPageBySlug, getAllPageSlugs } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/components/portable-text'

// Revalidate every 60 seconds
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all CMS pages
export async function generateStaticParams() {
  const slugs: string[] = await getAllPageSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    return { title: 'Page Not Found | Agenco' }
  }

  return {
    title: `${page.title} | Agenco`,
    description: page.description || `${page.title} — Agenco`,
  }
}

export default async function CMSPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <>

      {/* Page Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight">
            {page.title}
          </h1>
          {page.description && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              {page.description}
            </p>
          )}
        </header>

        {page.body && (
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
            <PortableText
              value={page.body}
              components={PortableTextComponents}
            />
          </div>
        )}
      </article>

    </>
  )
}
