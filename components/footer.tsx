import Link from 'next/link'
import { getNavigation, getSiteSettings } from '@/lib/queries'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  /** Contact email override from CMS */
  contactEmail?: string
  /** Tagline override from CMS */
  tagline?: string
}

const defaultFooterLinks: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
]

const defaultProductLinks: FooterLink[] = [
  { label: 'Data Pipelines', href: '#' },
  { label: 'Analytics', href: '#' },
  { label: 'Marketplace Data', href: '#' },
]

export async function Footer({
  contactEmail: propContactEmail,
  tagline: propTagline,
}: FooterProps = {}) {
  const [nav, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings()
  ])

  const contactEmail = settings?.contactEmail || propContactEmail || 'hello@agenco.io'
  const tagline = settings?.tagline || propTagline || 'Data infrastructure for e-commerce brands.'

  const companyLinks: FooterLink[] =
    nav?.footerLinks && nav.footerLinks.length > 0
      ? nav.footerLinks
      : defaultFooterLinks

  const productLinks: FooterLink[] =
    nav?.productLinks && nav.productLinks.length > 0
      ? nav.productLinks
      : defaultProductLinks

  return (
    <footer className="border-t border-border py-12 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="font-semibold mb-4">Agenco</p>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-4">Product</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-4">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-foreground transition"
                >
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Agenco. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
