import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPageBySlug, getAllPageSlugs } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/components/portable-text'
import { PageBuilder } from '@/components/page-builder'

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

      {/* Dynamic Modular Engine */}
      <div className="w-full min-h-screen">
        {page.pageBuilder && page.pageBuilder.length > 0 ? (
          <PageBuilder blocks={page.pageBuilder} />
        ) : (
          <article className="max-w-4xl mx-auto px-6 py-16">
            <header className="mb-12">
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight uppercase">
                {page.title}
              </h1>
              {page.description && (
                <p className="mt-4 text-lg text-muted-foreground font-mono">
                  {page.description}
                </p>
              )}
            </header>
            <div className="text-muted-foreground border border-border p-8 bg-card/50 text-center font-mono">
              [SYSTEM.NULL]: This page has no assembled modules yet. Please configure the CMS.
            </div>
          </article>
        )}
      </div>

    </>
  )
}
