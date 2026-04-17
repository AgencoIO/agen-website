'use client'

import { useState } from 'react'
import { HelpCircle, Plus, Minus } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionClientProps {
  heading: string
  badge: string
  items: FaqItem[]
}

export function FaqSectionClient({
  heading,
  badge,
  items,
}: FaqSectionClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        {/* Badge + Heading */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <HelpCircle className="w-4 h-4" />
            {badge}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
        </div>

        {/* Accordion */}
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="bg-background">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-secondary/20 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                      isOpen
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-muted-foreground'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <span className="font-medium text-foreground">
                    {item.question}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pl-16">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
