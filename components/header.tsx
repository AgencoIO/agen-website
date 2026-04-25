import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getNavigation, getSiteSettings } from '@/lib/queries'
import { MobileNav } from '@/components/mobile-nav'
import { ChevronDown } from 'lucide-react'

interface NavLink {
  label: string
  href: string
  openInNewTab?: boolean
  dropdownItems?: NavLink[]
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
  const [nav, settings] = await Promise.all([
    getNavigation(),
    getSiteSettings()
  ])
  const links: NavLink[] =
    nav?.headerLinks && nav.headerLinks.length > 0
      ? nav.headerLinks
      : defaultLinks

  return (
    <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight inline-flex items-center">
          {settings?.logo?.asset?.url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={settings.logo.asset.url} alt="Agenco Logo" className="h-8 w-auto object-contain" />
          ) : (
            "Agenco"
          )}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive =
              active === link.href ||
              (active === 'home' && link.href === '/') ||
              (active === 'blog' && link.href === '/blog') ||
              (active === 'contact' && link.href === '/contact')

            const isExternal = link.href?.startsWith('http') || link.openInNewTab
            const isAnchor = link.href?.startsWith('#') || link.href?.includes('#')
            const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0

            if (hasDropdown) {
              return (
                <div key={link.label} className="relative group">
                  <div className={`flex items-center gap-1 cursor-pointer text-sm font-medium transition-colors py-2 ${
                    isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    {link.href ? (
                      <Link href={link.href} className="hover:text-foreground">{link.label}</Link>
                    ) : (
                      <span>{link.label}</span>
                    )}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </div>
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-background border border-border rounded-md shadow-lg py-2 min-w-[200px] flex flex-col">
                      {link.dropdownItems!.map((sublink) => (
                        <Link
                          key={sublink.label}
                          href={sublink.href}
                          target={sublink.openInNewTab ? "_blank" : undefined}
                          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            if (isExternal) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-foreground font-semibold'
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
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link href="/contact">
            <Button className="rounded-none font-bold tracking-widest uppercase text-xs shadow-md hover:scale-105 transition-all bg-primary text-primary-foreground hover:bg-primary/90">
              Book a Consultation
            </Button>
          </Link>
        </div>
        
        {/* Mobile Navigation Injection */}
        <MobileNav links={links} active={active} />
      </div>
    </nav>
  )
}
