import Link from 'next/link'
import { getNavigation } from '@/lib/queries'

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

// Default fallback links
const defaultFooterLinks: FooterLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
]

export async function Footer({
  contactEmail = 'hello@agenco.io',
  tagline = 'Data infrastructure for e-commerce brands.',
}: FooterProps) {
  const nav = await getNavigation()
  const companyLinks: FooterLink[] =
    nav?.footerLinks && nav.footerLinks.length > 0
      ? nav.footerLinks
      : defaultFooterLinks

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
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Data Pipelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Marketplace Data
                </a>
              </li>
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
