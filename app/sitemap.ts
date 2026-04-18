import { MetadataRoute } from 'next'
import { getAllPostSlugs, getAllPageSlugs } from '@/lib/queries'

export const revalidate = 60 // Revalidate the sitemap every 60 seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://agenco.io'

  // 1. Static Routes
  const staticRoutes = ['', '/contact', '/blog', '/faq'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Dynamic Blog Posts
  const postSlugs = await getAllPostSlugs()
  const blogRoutes = postSlugs.map((slug: any) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 3. Dynamic Pages (e.g., About Us, Services managed in Sanity)
  const pageSlugs = await getAllPageSlugs()
  const staticPagesFromCms = pageSlugs.map((slug: any) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Combine all routes
  return [...staticRoutes, ...staticPagesFromCms, ...blogRoutes]
}
