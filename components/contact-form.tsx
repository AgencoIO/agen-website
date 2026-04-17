'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Mail,
  Calendar,
  Clock,
  Globe,
  MapPin,
  Send,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  mail: Mail,
  calendar: Calendar,
  clock: Clock,
  globe: Globe,
  'map-pin': MapPin,
}

const countries = [
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'NP', dial: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: 'IN', dial: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'CA', dial: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dial: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dial: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dial: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'JP', dial: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: 'SG', dial: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: 'BR', dial: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'MX', dial: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: 'KR', dial: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: 'NL', dial: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'SE', dial: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: 'CH', dial: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'IT', dial: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', dial: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: 'PH', dial: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: 'NG', dial: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'CN', dial: '+86', flag: '🇨🇳', name: 'China' },
  { code: 'HK', dial: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: 'IL', dial: '+972', flag: '🇮🇱', name: 'Israel' },
]

interface ContactPageClientProps {
  data: {
    heading?: string
    subheading?: string
    formHeading?: string
    formDescription?: string
    contactInfo?: {
      label: string
      value: string
      icon?: string
      link?: string
    }[]
    successMessage?: string
    calendlyLink?: string
  }
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const d = {
    heading: "Let's Talk Data",
    subheading:
      'Book a free consultation to discover how we can transform your e-commerce data into competitive advantage.',
    formHeading: 'Book a Consultation',
    formDescription:
      "Fill out the form below and we'll get back to you within 24 hours.",
    successMessage:
      "Thanks for reaching out! We'll be in touch within 24 hours.",
    contactInfo: [
      { label: 'Email', value: 'hello@agenco.io', icon: 'mail', link: 'mailto:hello@agenco.io' },
      { label: 'Response Time', value: 'Within 24 hours', icon: 'clock' },
      { label: 'Schedule a Call', value: 'Book on Calendly', icon: 'calendar', link: 'https://calendly.com/sam_rat/30min' },
    ],
    calendlyLink: 'https://calendly.com/sam_rat/30min',
    ...data,
  }

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [countryCode, setCountryCode] = useState('US')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  })

  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        setErrorMsg(result.error || 'Something went wrong.')
        setFormState('error')
        return
      }

      setFormState('success')
      setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' })
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setFormState('error')
    }
  }

  return (
    <>

      {/* Hero */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
              {d.heading}
            </h1>
            <p className="text-lg text-muted-foreground">{d.subheading}</p>
          </div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16">
            {/* Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">
                  {d.formHeading}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {d.formDescription}
                </p>
              </div>

              {formState === 'success' ? (
                <Card className="border-border bg-primary/5 p-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold">{d.successMessage}</h3>
                  <p className="text-muted-foreground">
                    In the meantime, feel free to{' '}
                    {d.calendlyLink ? (
                      <a
                        href={d.calendlyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        schedule a call directly
                      </a>
                    ) : (
                      'check our blog for insights'
                    )}
                    .
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormState('idle')}
                    className="mt-4"
                  >
                    Send another message
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-company" className="text-sm font-medium">
                        Company
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Your company"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <div className="flex">
                        <div className="relative">
                          <select
                            id="contact-country"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="appearance-none h-full pl-3 pr-8 py-3 rounded-l-lg border border-r-0 border-border bg-secondary/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition text-sm cursor-pointer"
                          >
                            {countries.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.flag} {c.dial}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center text-muted-foreground">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            // Allow only digits, spaces, dashes, parens
                            const cleaned = e.target.value.replace(/[^\d\s\-()]/g, '')
                            setFormData({ ...formData, phone: cleaned })
                          }}
                          placeholder="(555) 000-0000"
                          className="flex-1 min-w-0 px-4 py-3 rounded-r-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.dial})
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="text-sm font-medium">
                      What are you interested in?
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    >
                      <option value="">Select a service</option>
                      <option value="Data Audit">Free Data Audit</option>
                      <option value="Data Pipelines">Custom Data Pipelines</option>
                      <option value="Inventory Analytics">Inventory Analytics</option>
                      <option value="Competitor Intelligence">Competitor Intelligence</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your business and what you're looking for..."
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={formState === 'submitting'}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {d.contactInfo && d.contactInfo.length > 0 && (
                <>
                  {d.contactInfo.map(
                    (
                      item: {
                        label: string
                        value: string
                        icon?: string
                        link?: string
                      },
                      i: number
                    ) => {
                      const IconComponent =
                        iconMap[item.icon || 'mail'] || Mail
                      const content = (
                        <Card
                          key={i}
                          className="border-border bg-secondary/20 p-6 flex items-start gap-4 hover:bg-secondary/40 transition"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="font-medium">{item.value}</p>
                          </div>
                        </Card>
                      )

                      if (item.link) {
                        return (
                          <a
                            key={i}
                            href={item.link}
                            target={
                              item.link.startsWith('mailto:')
                                ? undefined
                                : '_blank'
                            }
                            rel="noopener noreferrer"
                          >
                            {content}
                          </a>
                        )
                      }
                      return <div key={i}>{content}</div>
                    }
                  )}
                </>
              )}

              {/* Calendly CTA */}
              {d.calendlyLink && (
                <Card className="border-primary/20 bg-primary/5 p-6 space-y-4">
                  <h3 className="font-semibold">Prefer a live conversation?</h3>
                  <p className="text-sm text-muted-foreground">
                    Skip the form and book a 30-minute call directly.
                  </p>
                  <a
                    href={d.calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Call
                    </Button>
                  </a>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
