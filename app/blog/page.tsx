import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllCategories } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { format } from 'date-fns'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog | Agenco',
  description:
    'Insights on e-commerce data infrastructure, inventory analytics, and competitive intelligence from the Agenco team.',
}

// Revalidate every 60 seconds for fresh content
export const revalidate = 60

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  readTime?: number
  mainImage?: {
    asset: { _id: string; url: string; metadata?: { lqip?: string } }
    alt?: string
  }
  author?: {
    name: string
    slug?: { current: string }
    image?: { asset: { url: string } }
    role?: string
  }
  categories?: {
    _id: string
    title: string
    slug: { current: string }
    color?: string
  }[]
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
  color?: string
}

export default async function BlogPage() {
  const [posts, categories]: [Post[], Category[]] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header active="blog" />

      {/* Hero */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Deep dives into e-commerce data, inventory analytics, competitive
              intelligence, and scaling D2C brands.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
            <Link
              href="/blog"
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground shrink-0"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug.current}`}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition shrink-0"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-2xl font-semibold text-muted-foreground">
                No posts yet
              </p>
              <p className="text-muted-foreground">
                Content is coming soon. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group"
                >
                  <Card className="border-border bg-background overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col">
                    {/* Cover Image */}
                    {post.mainImage?.asset && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={urlFor(post.mainImage)
                            .width(800)
                            .height(450)
                            .url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          {...(post.mainImage.asset.metadata?.lqip && {
                            placeholder: 'blur',
                            blurDataURL: post.mainImage.asset.metadata.lqip,
                          })}
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2 mb-3 flex-wrap">
                          {post.categories.map((cat) => (
                            <span
                              key={cat._id}
                              className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary"
                            >
                              {cat.title}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3">
                          {post.author?.image?.asset && (
                            <Image
                              src={urlFor(post.author.image)
                                .width(32)
                                .height(32)
                                .url()}
                              alt={post.author.name}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <span>{post.author?.name || 'Agenco'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {post.publishedAt && (
                            <span>
                              {format(
                                new Date(post.publishedAt),
                                'MMM d, yyyy'
                              )}
                            </span>
                          )}
                          {post.readTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime} min
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
