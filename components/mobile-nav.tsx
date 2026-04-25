'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavLink {
  label: string
  href: string
  openInNewTab?: boolean
  dropdownItems?: NavLink[]
}

interface MobileNavProps {
  links: NavLink[]
  active?: string
}

export function MobileNav({ links, active }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => {
    setIsOpen(false)
    setOpenDropdowns([])
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

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

              const isExternal = link.href?.startsWith('http') || link.openInNewTab
              const isAnchor = link.href?.startsWith('#') || link.href?.includes('#')
              const hasDropdown = link.dropdownItems && link.dropdownItems.length > 0
              const isDropdownOpen = openDropdowns.includes(link.label)

              if (hasDropdown) {
                return (
                  <div key={link.label} className="flex flex-col space-y-3">
                    <div
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center justify-between text-lg text-muted-foreground hover:text-foreground font-medium cursor-pointer transition-colors"
                    >
                      {link.href ? (
                        <Link href={link.href} className="flex-1 text-left" onClick={(e) => {
                          // Prevent link navigation if they click the label directly, since it acts as a dropdown trigger too,
                          // OR let them navigate but also open dropdown. 
                          // Here we let it navigate but usually it's better to just open dropdown on mobile.
                          // e.preventDefault(); 
                          // toggleDropdown(link.label);
                        }}>
                          {link.label}
                        </Link>
                      ) : (
                        <span className="flex-1">{link.label}</span>
                      )}
                      <div className="p-1" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDropdown(link.label);
                      }}>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            isDropdownOpen ? 'rotate-180 text-foreground' : ''
                          }`}
                        />
                      </div>
                    </div>
                    {isDropdownOpen && (
                      <div className="flex flex-col space-y-3 pl-4 border-l-2 border-border ml-2 pt-1 pb-2">
                        {link.dropdownItems!.map((sublink) => (
                          <Link
                            key={sublink.label}
                            href={sublink.href}
                            target={sublink.openInNewTab ? '_blank' : undefined}
                            onClick={closeMenu}
                            className="text-base text-muted-foreground hover:text-foreground transition-colors py-1"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    )}
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
