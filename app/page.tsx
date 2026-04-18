import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Zap, TrendingUp, Layers, Shield, Target, BarChart, Database, Network, Cpu, LayoutGrid, ServerCog, Blocks } from 'lucide-react'
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
  heroHeading: 'Data Foundation for the AI Era',
  heroSubheading:
    'We build enterprise-grade data pipelines, reliable data lakes, and robust integrations. Transform fragmented data into competitive advantage instantly.',
  heroPrimaryCta: 'Book a Consultation',
  heroPrimaryCtaLink: '/contact',
  heroSecondaryCta: 'See how it works',
  trustedByHeading: 'TRUSTED BY LEADING COMPANIES',
  trustedByCompanies: [],
  
  architectureHeading: 'How Agenco Meets Engineering Excellence',
  architectureSubheading: 'We build scalable, enterprise-grade data infrastructure designed for high velocity and intelligent applications. Transform fragmented data streams into a unified, actionable foundation.',
  architectureLayers: [
    { title: 'MOVE', items: ['Data integration', 'Data activation'] },
    { title: 'MANAGE', items: ['Managed data lake service', 'Delta tables', 'Iceberg tables', 'Interoperable compute'] },
    { title: 'TRANSFORM', items: ['Native transformation', 'Ecosystem transformation'] }
  ],

  toolsHeading: 'Built on Modern Data Stacks',
  toolsDescription: 'We utilize the industry\'s leading technologies to ensure your data infrastructure is scalable and robust.',
  toolsList: ['Databricks', 'Flink', 'AWS', 'Apache Spark', 'Kafka'],

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
  benefitsHeading: 'Why Teams Choose Agenco',
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
  testimonialsHeading: 'Trusted by Leaders',
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
  ctaPrimaryText: 'Book a Consultation',
  ctaPrimaryLink: '',
  ctaSecondaryText: 'Book a Consultation',
  ctaSecondaryLink: 'https://calendly.com/sam_rat/30min',
  footerTagline: 'Data infrastructure for e-commerce brands.',
  contactEmail: 'hello@agenco.io',
}

export default async function Home() {
  const cmsData = (await getHomepage()) || {}

  // Merge CMS data over defaults — fallback to defaults if CMS fields are null/undefined
  const d = {
    ...defaults,
    ...cmsData,
    trustedByCompanies: cmsData.trustedByCompanies ?? defaults.trustedByCompanies,
    architectureLayers: cmsData.architectureLayers ?? defaults.architectureLayers,
    toolsList: cmsData.toolsList ?? defaults.toolsList,
    problemCards: cmsData.problemCards ?? defaults.problemCards,
    howSteps: cmsData.howSteps ?? defaults.howSteps,
    benefitItems: cmsData.benefitItems ?? defaults.benefitItems,
    testimonials: cmsData.testimonials ?? defaults.testimonials,
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden isolate max-w-full mx-auto px-6 py-24 sm:pt-22 sm:pb-16 lg:pt-40 lg:pb-20 border-b border-border">
        {/* Dynamic Background Image - Inline style for reliability */}
        <div 
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-90"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop")' }}
        ></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 -z-10 bg-black/60 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]"></div>

        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white text-balance drop-shadow-lg">
            {d.heroHeading}
          </h1>
          <p className="text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto text-balance drop-shadow-md">
            {d.heroSubheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href={d.heroPrimaryCtaLink || '/contact'}>
              <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full shadow-lg shadow-primary/30 transition-all hover:scale-105">
                {d.heroPrimaryCta} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          {d.trustedByCompanies && d.trustedByCompanies.length > 0 && (
            <div className="pt-16 mt-6 border-t border-white/60">
              <h2 className="text-2xl font-bold tracking-widest text-white/80 mb-6">
                {d.trustedByHeading}
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-90 transition-all duration-500">
                {d.trustedByCompanies.map((company: any, i: number) => (
                  company?.asset?.url && (
                    <div key={i} className="relative h-20 w-35 grayscale brightness-0 invert opacity-70 hover:opacity-100 transition-all">
                      <Image 
                        src={company.asset.url} 
                        alt={company.alt || 'Trusted Partner'} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Architecture Overview Section */}
      {d.architectureLayers && d.architectureLayers.length > 0 && (
        <section className="py-24 border-b border-border bg-gradient-to-b from-background to-secondary/10">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {d.architectureHeading}
              </h2>
              {d.architectureSubheading && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {d.architectureSubheading}
                </p>
              )}
            </div>

            {/* Right Diagram */}
            {/* Simulated Diagram Container */}
            <div className="relative p-6 sm:p-8 rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden shadow-primary/5 w-full">
              <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
              
              <div className="relative space-y-4 z-10">
                {d.architectureLayers.map((layer: any, i: number) => (
                  <div key={i} className="group relative rounded-2xl border border-primary/15 bg-background/80 p-5 flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 hover:border-primary/50 transition-colors duration-300">
                    {/* Pulsing connection line indicator */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(var(--primary),0.8)] transition-all"></div>
                    
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-bold tracking-wider text-primary italic uppercase">{layer.title}</h3>
                    </div>
                    <div className="md:w-2/3 flex flex-wrap gap-2">
                      {layer.items.map((item: string, j: number) => (
                        <span key={j} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 text-xs sm:text-sm font-medium border border-border">
                          {j % 2 === 0 ? <Database className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" /> : <Network className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />}
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Outputs Layer (Static for the specific diagram vibe) */}
                <div className="pt-6 border-t border-border/50 mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Analytics', 'Operations', 'Applications', 'AI/Agents'].map((output, idx) => (
                       <div key={idx} className="flex justify-center items-center py-3 px-2 rounded-xl bg-card border border-border shadow-sm group hover:border-primary/40 transition-colors">
                           <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                              {idx === 0 && <BarChart className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                              {idx === 1 && <ServerCog className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                              {idx === 2 && <LayoutGrid className="w-4 h-4 text-purple-500 flex-shrink-0" />}
                              {idx === 3 && <Cpu className="w-4 h-4 text-green-500 flex-shrink-0" />}
                              <span className="truncate">{output}</span>
                           </span>
                       </div>
                    ))}
                </div>
              </div>
            </div>
            
          </div>
        </section>
      )}

      {/* Tools Section */}
      {/* {d.toolsList && d.toolsList.length > 0 && (
        <section className="py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {d.toolsHeading}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {d.toolsDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-start lg:justify-end">
                {d.toolsList.map((tool: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 px-6 py-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors font-semibold text-lg text-foreground">
                    <Blocks className="w-5 h-5 text-primary" />
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )} */}

      {/* Problem Section */}
      <section className="py-24 border-b border-border">
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
                      <div className="text-3xl font-bold text-primary">{card.stat}</div>
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
        className="py-24 border-b border-border bg-secondary/10"
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
                    <div key={i} className="space-y-4 p-6 rounded-2xl bg-background border border-border">
                      <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg mb-6">
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
      <section id="benefits" className="py-24 border-b border-border">
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
                      <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-secondary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary flex-shrink-0 mt-1 bg-primary/10 p-1.5 rounded-lg" />
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
      <section className="py-24 border-b border-border bg-secondary/10">
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
                      className="border-border bg-background p-10 space-y-6 shadow-sm"
                    >
                      <div className="space-y-3">
                        <p className="text-lg font-medium text-primary">
                          {t.metricLabel}
                        </p>
                        <p className="text-5xl font-extrabold tracking-tighter">{t.metricValue}</p>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed italic">"{t.quote}"</p>
                      <div className="pt-4 border-t border-border/50">
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
      <section className="py-32 border-b border-border bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              {d.ctaHeading}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {d.ctaSubheading}
            </p>
          </div>
          <div className="flex gap-4 justify-center items-center flex-wrap pt-4">
            <Link href={d.ctaPrimaryLink || '/contact'}>
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-105"
              >
                {d.ctaPrimaryText}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
