import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getNavigation } from '@/lib/queries'

interface NavLink {
  label: string
  href: string
  openInNewTab?: boolean
}

interface HeaderProps {
  /** Highlight the active nav item path */
  active?: string
}

// Default fallback links if CMS has no navigation document yet
const defaultLinks: NavLink[] = [
  { label: 'How it works', href: '/#how' },
  { label: 'Results', href: '/#benefits' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export async function Header({ active }: HeaderProps) {
  const nav = await getNavigation()
  const links: NavLink[] =
    nav?.headerLinks && nav.headerLinks.length > 0
      ? nav.headerLinks
      : defaultLinks

  return (
    <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Agenco
        </Link>
        <div className="flex items-center gap-8">
          {links.map((link) => {
            const isActive =
              active === link.href ||
              (active === 'home' && link.href === '/') ||
              (active === 'blog' && link.href === '/blog') ||
              (active === 'contact' && link.href === '/contact')

            const isExternal =
              link.href.startsWith('http') || link.openInNewTab
            const isAnchor = link.href.startsWith('#') || link.href.includes('#')

            if (isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  {link.label}
                </a>
              )
            }

            if (isAnchor) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition ${
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition ${
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/contact">
            <Button className="rounded-full font-semibold shadow-md hover:scale-105 transition-all bg-primary text-primary-foreground hover:bg-primary/90">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
