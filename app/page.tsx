import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Zap, TrendingUp, Layers, Shield, Target, BarChart } from 'lucide-react'
import { DashboardPreview } from '@/components/dashboard-preview'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getHomepage } from '@/lib/queries'

// Revalidate every 60 seconds
export const revalidate = 60

// Icon map for CMS-driven benefits section
const iconMap: Record<string, React.ElementType> = {
  'trending-up': TrendingUp,
  'zap': Zap,
  'layers': Layers,
  'shield': Shield,
  'target': Target,
  'bar-chart': BarChart,
}

// Default content (used as fallback if CMS has no homepage document yet)
const defaults = {
  heroHeading: 'Your E-commerce Data Is Fragmented.',
  heroSubheading:
    'We turn it into competitive advantage. Custom data pipelines, inventory analytics, and market intelligence.',
  heroPrimaryCta: 'Start free audit',
  heroPrimaryCtaLink: '#',
  heroSecondaryCta: 'See how it works',
  heroStats: [
    { value: '23%', label: 'Avg inventory turnover increase' },
    { value: '94%', label: 'Pricing errors eliminated' },
  ],
  problemHeading: 'The E-Commerce Data Problem',
  problemSubheading:
    "If you're scaling a Shopify store or multi-channel brand, you're drowning in disconnected data sources.",
  problemCards: [
    {
      stat: '50+',
      title: 'SKUs across channels',
      description:
        'Shopify, Amazon, TikTok Shop, and marketplace inventory lives in different systems. Manual sync leads to errors.',
    },
    {
      stat: '5+ hours/week',
      title: 'Manual data work',
      description:
        'Your team exports CSVs, reconciles pricing, monitors competitors. This should be automated.',
    },
    {
      stat: 'Unknown ROI',
      title: 'Hidden revenue leaks',
      description:
        'Price mismatches, stockouts on best sellers, and missed competitor moves cost you 15–30% in lost revenue.',
    },
  ],
  howHeading: 'How Agenco Works',
  howSteps: [
    {
      title: 'Data Audit',
      description:
        'We analyze your Shopify, inventory, and channel data to find gaps, inconsistencies, and growth opportunities.',
    },
    {
      title: 'Pipeline Build',
      description:
        'We design and deploy custom data pipelines that ingest, normalize, and enrich your data in real time.',
    },
    {
      title: 'Intelligence & ROI',
      description:
        'Your team gets dashboards, alerts, and insights that drive pricing, inventory, and competitive decisions.',
    },
  ],
  benefitsHeading: 'Why E-Commerce Teams Choose Agenco',
  benefitItems: [
    {
      icon: 'trending-up',
      title: 'Immediate revenue impact',
      description:
        'Customers see 15–30% margin improvements within 90 days through smarter pricing and inventory decisions.',
    },
    {
      icon: 'zap',
      title: 'Hands-on expertise',
      description:
        'We work closely with your team, not as a black box. Our data engineers understand e-commerce inside out.',
    },
    {
      icon: 'layers',
      title: 'Custom, not generic',
      description:
        'Every pipeline is built for your channels, suppliers, and business. No template solutions.',
    },
    {
      icon: 'trending-up',
      title: 'Scalable infrastructure',
      description:
        'From day one to $50M+ revenue, our pipelines grow with your business. No rewrites needed.',
    },
  ],
  testimonialsHeading: 'Trusted by D2C Brands & Shopify Founders',
  testimonials: [
    {
      metricLabel: 'Growth in inventory velocity',
      metricValue: '23%',
      quote:
        '"After Agenco set up our data pipeline, we cut inventory holding by 2 weeks and freed up $200K in working capital."',
      author: 'D2C Founder, $3M ARR',
      company: 'Multi-channel beauty brand',
    },
    {
      metricLabel: 'Pricing accuracy improvement',
      metricValue: '94%',
      quote:
        '"We eliminated manual pricing errors across Amazon and Shopify. Our margins are now protected, and we can react to competitors in minutes."',
      author: 'Operations Manager, $5M ARR',
      company: 'Amazon + Shopify seller',
    },
  ],
  ctaHeading: 'Turn Your Data Into Growth',
  ctaSubheading:
    "Get a free, no-obligation data audit. We'll show you exactly where you're leaking revenue and how much you can capture.",
  ctaPrimaryText: 'Book your free audit',
  ctaPrimaryLink: '#',
  ctaSecondaryText: 'Schedule a call',
  ctaSecondaryLink: 'https://calendly.com/sam_rat/30min',
  footerTagline: 'Data infrastructure for e-commerce brands.',
  contactEmail: 'hello@agenco.io',
}

export default async function Home() {
  const cmsData = await getHomepage()

  // Merge CMS data over defaults — CMS values take priority
  const d = { ...defaults, ...cmsData }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header active="home" />

      {/* Hero Section */}
      <section className="max-w-full mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-pretty">
                  {d.heroHeading}
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  {d.heroSubheading}
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {d.heroPrimaryCta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary/30"
                >
                  {d.heroSecondaryCta}
                </Button> */}
              </div>
              {d.heroStats && d.heroStats.length > 0 && (
                <div className="flex gap-8 pt-4">
                  {d.heroStats.map(
                    (stat: { value: string; label: string }, i: number) => (
                      <div key={i}>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="relative h-full min-h-96">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {d.problemHeading}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {d.problemSubheading}
              </p>
            </div>
            {d.problemCards && d.problemCards.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {d.problemCards.map(
                  (
                    card: {
                      stat: string
                      title: string
                      description: string
                    },
                    i: number
                  ) => (
                    <Card
                      key={i}
                      className="border-border bg-secondary/30 p-8 space-y-4"
                    >
                      <div className="text-3xl font-bold">{card.stat}</div>
                      <h3 className="font-semibold text-foreground">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {card.description}
                      </p>
                    </Card>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how"
        className="py-24 border-t border-border bg-secondary/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {d.howHeading}
            </h2>
            {d.howSteps && d.howSteps.length > 0 && (
              <div className="grid lg:grid-cols-3 gap-8">
                {d.howSteps.map(
                  (
                    step: { title: string; description: string },
                    i: number
                  ) => (
                    <div key={i} className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {d.benefitsHeading}
            </h2>
            {d.benefitItems && d.benefitItems.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {d.benefitItems.map(
                  (
                    item: {
                      icon?: string
                      title: string
                      description: string
                    },
                    i: number
                  ) => {
                    const IconComponent =
                      iconMap[item.icon || 'trending-up'] || TrendingUp
                    return (
                      <div key={i} className="flex gap-4">
                        <IconComponent className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Case Study / Social Proof */}
      <section className="py-24 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {d.testimonialsHeading}
            </h2>
            {d.testimonials && d.testimonials.length > 0 && (
              <div className="grid md:grid-cols-2 gap-12">
                {d.testimonials.map(
                  (
                    t: {
                      metricLabel: string
                      metricValue: string
                      quote: string
                      author: string
                      company: string
                    },
                    i: number
                  ) => (
                    <Card
                      key={i}
                      className="border-border bg-background p-10 space-y-6"
                    >
                      <div className="space-y-3">
                        <p className="text-lg font-semibold">
                          {t.metricLabel}
                        </p>
                        <p className="text-4xl font-bold">{t.metricValue}</p>
                      </div>
                      <p className="text-muted-foreground">{t.quote}</p>
                      <div>
                        <p className="font-semibold">{t.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.company}
                        </p>
                      </div>
                    </Card>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {d.ctaHeading}
            </h2>
            <p className="text-lg text-muted-foreground">{d.ctaSubheading}</p>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {d.ctaPrimaryText}
              </Button>
            </Link>
            <a
              href={d.ctaSecondaryLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary/30"
              >
                {d.ctaSecondaryText}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer tagline={d.footerTagline} contactEmail={d.contactEmail} />
    </div>
  )
}
