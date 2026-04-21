import { client } from './sanity'

// ─── Blog Post Queries ────────────────────────────────────────────────

/** Fetch all published blog posts (for listing page) */
export async function getAllPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      mainImage {
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        },
        alt
      },
      author->{
        name,
        slug,
        image {
          asset->{ _id, url }
        },
        role
      },
      categories[]->{
        _id,
        title,
        slug,
        color
      }
    }`
  )
}

/** Fetch a single blog post by slug */
export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      body[] {
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            url,
            metadata { dimensions, lqip }
          }
        }
      },
      mainImage {
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        },
        alt
      },
      author->{
        name,
        slug,
        image {
          asset->{ _id, url }
        },
        bio,
        role,
        social
      },
      categories[]->{
        _id,
        title,
        slug,
        color
      }
    }`,
    { slug }
  )
}

/** Fetch all post slugs (for static generation) */
export async function getAllPostSlugs() {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )
}

/** Fetch posts by category slug */
export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      mainImage {
        asset->{
          _id,
          url,
          metadata { dimensions, lqip }
        },
        alt
      },
      author->{
        name,
        slug,
        image {
          asset->{ _id, url }
        },
        role
      },
      categories[]->{
        _id,
        title,
        slug,
        color
      }
    }`,
    { categorySlug }
  )
}

// ─── Category Queries ─────────────────────────────────────────────────

/** Fetch all categories */
export async function getAllCategories() {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color
    }`
  )
}

// ─── Author Queries ───────────────────────────────────────────────────

/** Fetch author by slug */
export async function getAuthorBySlug(slug: string) {
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image {
        asset->{ _id, url }
      },
      bio,
      role,
      social
    }`,
    { slug }
  )
}

// ─── Site Settings Queries ────────────────────────────────────────────

/** Fetch site settings (singleton) */
export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      ...,
      ogImage {
        asset->{ _id, url }
      }
    }`
  )
}

// ─── Page Queries ─────────────────────────────────────────────────────

/** Fetch a CMS page by slug */
export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      pageBuilder[] {
        ...,
        promotion->
      }
    }`,
    { slug }
  )
}

/** Fetch all page slugs (for static generation) */
export async function getAllPageSlugs() {
  return client.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  )
}

// ─── Homepage Queries ─────────────────────────────────────────────────

/** Fetch homepage content (singleton) */
export async function getHomepage() {
  return client.fetch(
    `*[_type == "homepage"][0] {
      heroHeading,
      heroSubheading,
      heroPrimaryCta,
      heroPrimaryCtaLink,
      heroSecondaryCta,
      heroStats,
      trustedByHeading,
      trustedByCompanies[] {
        asset->{ _id, url },
        alt
      },
      architectureHeading,
      architectureSubheading,
      architectureLayers,
      toolsHeading,
      toolsDescription,
      toolsList[] {
        name,
        logo {
          asset->{ url }
        }
      },
      problemHeading,
      problemSubheading,
      problemCards,
      howHeading,
      howSteps,
      whatWeBuildHeading,
      whatWeBuildItems,
      benefitsHeading,
      benefitItems,
      testimonialsHeading,
      testimonials,
      ctaHeading,
      ctaSubheading,
      ctaPrimaryText,
      ctaPrimaryLink,
      ctaSecondaryText,
      ctaSecondaryLink,
      footerTagline,
      contactEmail
    }`
  )
}

// ─── Contact Page Queries ─────────────────────────────────────────────

/** Fetch contact page content (singleton) */
export async function getContactPage() {
  return client.fetch(
    `*[_type == "contactPage"][0] {
      heading,
      subheading,
      formHeading,
      formDescription,
      contactInfo,
      successMessage,
      calendlyLink
    }`
  )
}

// ─── Navigation Queries ───────────────────────────────────────────────

/** Fetch navigation links (singleton) */
export async function getNavigation() {
  return client.fetch(
    `*[_type == "navigation"][0] {
      headerLinks[] {
        label,
        href,
        openInNewTab
      },
      footerLinks[] {
        label,
        href
      },
      productLinks[] {
        label,
        href
      }
    }`
  )
}

// ─── FAQ Queries ──────────────────────────────────────────────────────

/** Fetch FAQ items (singleton) */
export async function getFaqs() {
  return client.fetch(
    `*[_type == "faq"][0] {
      heading,
      badge,
      items[] {
        question,
        answer
      }
    }`
  )
}
