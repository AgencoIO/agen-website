import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { format } from 'date-fns'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/components/portable-text'
import { CallToAction } from '@/components/modules/call-to-action'

// Revalidate every 60 seconds
export const revalidate = 60

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs: string[] = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found | Agenco' }
  }

  return {
    title: `${post.title} | Agenco Blog`,
    description: post.excerpt || `Read "${post.title}" on the Agenco blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.mainImage?.asset?.url && {
        images: [{ url: post.mainImage.asset.url }],
      }),
    },
  }
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="space-y-6 mb-12">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {post.categories.map(
                (cat: {
                  _id: string
                  title: string
                  slug: { current: string }
                }) => (
                  <Link
                    key={cat._id}
                    href={`/blog/category/${cat.slug.current}`}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    {cat.title}
                  </Link>
                )
              )}
            </div>
          )}

          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {post.excerpt}
            </p>
          )}

          {/* Author + Meta */}
          <div className="flex items-center gap-6 pt-4 border-t border-border">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image?.asset && (
                  <Image
                    src={urlFor(post.author.image)
                      .width(80)
                      .height(80)
                      .url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{post.author.name}</p>
                  {post.author.role && (
                    <p className="text-xs text-muted-foreground">
                      {post.author.role}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.mainImage?.asset && (
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-12">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              {...(post.mainImage.asset.metadata?.lqip && {
                placeholder: 'blur',
                blurDataURL: post.mainImage.asset.metadata.lqip,
              })}
            />
          </div>
        )}

        {/* Body Content */}
        {post.body && (
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-secondary prose-pre:border prose-pre:border-border">
            <PortableText value={post.body} components={PortableTextComponents} />
          </div>
        )}

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="mt-16 p-8 rounded-xl bg-secondary/30 border border-border">
            <div className="flex items-start gap-4">
              {post.author.image?.asset && (
                <Image
                  src={urlFor(post.author.image)
                    .width(120)
                    .height(120)
                    .url()}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              )}
              <div className="space-y-2">
                <p className="font-semibold">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-sm text-muted-foreground">
                    {post.author.role}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {post.author.bio}
                </p>
                {post.author.social && (
                  <div className="flex gap-3 pt-2">
                    {post.author.social.twitter && (
                      <a
                        href={post.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Twitter
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a
                        href={post.author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {post.author.social.github && (
                      <a
                        href={post.author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Dynamic CTA Sections from Post */}
      {post.callToActions && post.callToActions.length > 0 && (
        <div className="border-t border-border mt-8">
          {post.callToActions.map((cta: any, idx: number) => (
            <CallToAction key={`cta-${idx}`} data={cta} />
          ))}
        </div>
      )}

    </>
  )
}
