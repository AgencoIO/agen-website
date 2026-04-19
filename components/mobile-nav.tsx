'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavLink {
  label: string
  href: string
  openInNewTab?: boolean
}

interface MobileNavProps {
  links: NavLink[]
  active?: string
}

export function MobileNav({ links, active }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden flex items-center">
      <button
        onClick={toggleMenu}
        className="p-2 text-foreground focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg p-6 flex flex-col gap-6 z-50">
          <div className="flex flex-col space-y-4">
            {links.map((link) => {
              const isActive =
                active === link.href ||
                (active === 'home' && link.href === '/') ||
                (active === 'blog' && link.href === '/blog') ||
                (active === 'contact' && link.href === '/contact')

              const isExternal = link.href.startsWith('http') || link.openInNewTab
              const isAnchor = link.href.startsWith('#') || link.href.includes('#')

              if (isExternal) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
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
                    onClick={closeMenu}
                    className={`text-lg transition-colors ${
                      isActive
                        ? 'text-foreground font-semibold border-l-2 border-primary pl-2'
                        : 'text-muted-foreground hover:text-foreground font-medium'
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
                  onClick={closeMenu}
                  className={`text-lg transition-colors ${
                    isActive
                      ? 'text-foreground font-semibold border-l-2 border-primary pl-2'
                      : 'text-muted-foreground hover:text-foreground font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
          <div className="pt-4 border-t border-border">
            <Link href="/contact" onClick={closeMenu}>
              <Button className="w-full text-base font-semibold h-12 shadow-md bg-primary text-primary-foreground hover:bg-primary/90">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
