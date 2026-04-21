import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Zap, TrendingUp, Layers, Shield, Target, BarChart, Database, Network, Cpu, LayoutGrid, ServerCog, Blocks } from 'lucide-react'
import { getHomepage } from '@/lib/queries'
import { CallToAction } from '@/components/modules/call-to-action'

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
  heroStats: [
    { value: '500M+', label: 'Events/Day' },
    { value: '99.99%', label: 'Uptime' },
    { value: '<50ms', label: 'Latency' },
    { value: '100%', label: 'Accuracy' }
  ],
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
  toolsList: [
    { name: 'Databricks',logo: '/databricks.png' }, 
    { name: 'Flink',logo: '/flink.png' }, 
    { name: 'AWS',logo: '/aws.png' }, 
    { name: 'Apache Spark',logo: '/spark.png' }, 
    { name: 'Kafka',logo: '/kafka.png' }
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
  whatWeBuildHeading: 'What We Build',
  whatWeBuildItems: [
    {
      title: 'Automated Pricing Engines',
      description: 'Ingest competitor pricing, monitor elasticity, and update thousands of SKUs in real time. Never lose a sale on price, never leave margin on the table.',
      tags: ['Algorithmic Pricing', 'Competitor Intelligence', 'Real-time Updates']
    },
    {
      title: 'Unified Inventory Networks',
      description: 'Sync Shopify, Amazon, 3PLs, and retail POS systems into a single source of truth. Prevent stockouts and drastically reduce carrying costs.',
      tags: ['Multi-channel Sync', 'Demand Forecasting', '3PL Integration']
    },
    {
      title: 'Actionable Margin Dashboards',
      description: 'Go beyond basic Google Analytics. See exact landed costs, ad spend dilution, and net profit per SKU instantly.',
      tags: ['Profitability Tracking', 'Executive Reporting', 'Live Dashboards']
    }
  ],
  howHeading: 'How We Process',
  howSteps: [
    {
      title: 'Data Audit',
      description: 'We analyze your Shopify, inventory, and channel data to find gaps, inconsistencies, and growth opportunities.',
    },
    {
      title: 'Pipeline Build',
      description: 'We design and deploy custom data pipelines that ingest, normalize, and enrich your data in real time.',
    },
    {
      title: 'Intelligence & ROI',
      description: 'Your team gets dashboards, alerts, and insights that drive pricing, inventory, and competitive decisions.',
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
    heroStats: cmsData.heroStats ?? defaults.heroStats,
    architectureLayers: cmsData.architectureLayers ?? defaults.architectureLayers,
    toolsList: cmsData.toolsList ?? defaults.toolsList,
    problemCards: cmsData.problemCards ?? defaults.problemCards,
    howSteps: cmsData.howSteps ?? defaults.howSteps,
    benefitItems: cmsData.benefitItems ?? defaults.benefitItems,
    testimonials: cmsData.testimonials ?? defaults.testimonials,
  }

  // Handle Sanity returning null/empty arrays for lists, maintaining fallbacks
  const heroStats = d.heroStats?.length ? d.heroStats : defaults.heroStats
  const toolsList = d.toolsList?.length ? d.toolsList : defaults.toolsList
  const problemCards = d.problemCards?.length ? d.problemCards : defaults.problemCards
  const howSteps = d.howSteps?.length ? d.howSteps : defaults.howSteps
  const whatWeBuildItems = d.whatWeBuildItems?.length ? d.whatWeBuildItems : defaults.whatWeBuildItems
  const benefitItems = d.benefitItems?.length ? d.benefitItems : defaults.benefitItems
  const testimonials = d.testimonials?.length ? d.testimonials : defaults.testimonials

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden isolate max-w-full mx-auto px-4 sm:px-6 pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-border bg-background">
        
        {/* Advanced Data Grid CSS Background */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]">
          <div className="absolute left-0 right-0 top-1/4 -z-10 m-auto h-[400px] w-[600px] rounded-[100%] bg-primary/10 opacity-30 blur-[120px] pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-10 relative z-10 text-center flex flex-col items-center">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-foreground text-balance drop-shadow-sm leading-[1.1]">
            {d.heroHeading}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground/90 max-w-3xl text-balance leading-relaxed">
            {d.heroSubheading}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-8 w-full sm:w-auto px-4 sm:px-0">
            <Link href={d.heroPrimaryCtaLink || '/contact'} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 md:h-16 px-10 text-sm md:text-base font-mono tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-none border border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)] hover:shadow-[0_0_35px_rgba(var(--primary),0.4)] transition-all duration-300 group">
                {d.heroPrimaryCta} 
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              </Button>
            </Link>
            
            {d.heroSecondaryCta && (
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-10 text-sm md:text-base font-mono tracking-widest uppercase rounded-none border-border bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:text-foreground transition-all duration-300">
                {d.heroSecondaryCta}
              </Button>
            )}
          </div>

          {/* Hero Stats */}
          {heroStats && heroStats.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl pt-20 mt-4">
               {heroStats.map((stat: any, i: number) => (
                 <div key={i} className="flex flex-col gap-2 border-t border-border pt-6 text-center hover:border-primary/50 transition-colors duration-300 cursor-default group">
                    <span className="text-3xl md:text-4xl font-black font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-muted-foreground/80">
                      {stat.label}
                    </span>
                 </div>
               ))}
            </div>
          )}

          {/* Trusted Companies */}
          {d.trustedByCompanies && d.trustedByCompanies.length > 0 && (
            <div className="w-full max-w-5xl pt-16 mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-border/60"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-6 text-sm sm:text-base font-mono tracking-[0.25em] text-foreground font-semibold uppercase">
                    {d.trustedByHeading}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-12 opacity-80 mt-12">
                {d.trustedByCompanies.map((company: any, i: number) => (
                  company?.asset?.url && (
                    <div key={i} className="relative h-8 sm:h-12 w-28 sm:w-40 grayscale hover:grayscale-0 hover:scale-105 hover:opacity-100 transition-all duration-[400ms] cursor-pointer">
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
        <section className="py-16 lg:py-24 border-b border-border bg-gradient-to-b from-background to-secondary/10">
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
      {toolsList && toolsList.length > 0 && (
        <section className="py-16 lg:py-24 border-b border-border bg-background relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  {d.toolsHeading || defaults.toolsHeading}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {d.toolsDescription || defaults.toolsDescription}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {toolsList.map((tool: any, i: number) => {
                  const logoUrl = typeof tool.logo === 'string' ? tool.logo : tool.logo?.asset?.url;
                  
                  return (
                    <div key={i} className="group relative flex items-center justify-center p-6 rounded-none border border-border bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                      <div className="flex flex-col items-center justify-center h-full gap-4">
                        {logoUrl && (
                          <div className="relative w-10 h-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <Image src={logoUrl} alt={tool.name} fill className="object-contain" />
                          </div>
                        )}
                        <span className="font-mono text-xs tracking-widest font-semibold text-foreground uppercase text-center block">
                          {tool.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problem Section */}
      <section className="py-16 lg:py-24 border-b border-border bg-background">
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
            {problemCards && problemCards.length > 0 && (
              <div className="grid md:grid-cols-3 gap-[1px] bg-border border border-border">
                {problemCards.map(
                  (
                    card: { stat: string; title: string; description: string },
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="group bg-background p-8 lg:p-10 space-y-6 hover:bg-secondary/10 transition-colors relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                      <div className="text-5xl font-mono text-primary font-light tracking-tighter">{card.stat}</div>
                      <h3 className="font-bold text-lg text-foreground tracking-wide">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What We Build (Scroll Experience / Sticky Stacking Cards) */}
      <section id="what-we-build" className="pt-16 lg:pt-24 pb-24 border-b border-border bg-background">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-center mb-16">
            {d.whatWeBuildHeading || defaults.whatWeBuildHeading}
          </h2>
          
          <div className="relative isolate">
             {whatWeBuildItems.map((item: any, i: number) => (
                <div 
                   key={i} 
                   className="sticky group mb-24 border border-border bg-card/60 backdrop-blur-xl rounded-none shadow-2xl p-10 sm:p-14 transition-all duration-500 overflow-hidden"
                   style={{ 
                     top: `calc(15vh + ${i * 60}px)`, 
                     zIndex: i,
                     boxShadow: '0 -20px 40px -10px rgba(0,0,0,0.5)'
                   }}
                >
                   {/* Decorative Terminal Accent */}
                   <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-9xl font-black mix-blend-overlay pointer-events-none transform translate-x-4 -translate-y-6">0{i + 1}</div>
                   
                   <div className="relative z-10 grid gap-8">
                      <div className="space-y-4">
                        <div className="font-mono text-primary text-sm tracking-widest uppercase flex items-center gap-3">
                           <span className="w-8 h-[1px] bg-primary"></span> System {i + 1}
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">{item.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-6 border-t border-border/50">
                          {item.tags.map((tag: string, tIndex: number) => (
                            <span key={tIndex} className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* How It Works (Pipeline Flow) */}
      <section id="how" className="py-16 lg:py-24 border-b border-border bg-secondary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                {d.howHeading || defaults.howHeading}
              </h2>
            </div>
            {howSteps && howSteps.length > 0 && (
              <div className="relative border-l-2 border-border ml-6 lg:ml-[20%] space-y-12 pb-8">
                {howSteps.map((step: { title: string; description: string }, i: number) => (
                    <div key={i} className="relative pl-12 sm:pl-20 group">
                      {/* Node on pipeline */}
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(var(--primary),0.8)] transition-all duration-300"></div>
                      
                      <div className="bg-background border border-border p-8 hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 font-mono text-8xl font-black text-secondary/30 pointer-events-none select-none z-0 mix-blend-overlay">0{i + 1}</div>
                        <div className="relative z-10">
                          <div className="font-mono text-xs text-primary mb-3 tracking-widest uppercase">Node_0{i + 1}</div>
                          <h3 className="text-2xl font-bold tracking-tight mb-4">{step.title}</h3>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 lg:py-24 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground max-w-2xl">
              {d.benefitsHeading}
            </h2>
            {benefitItems && benefitItems.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {benefitItems.map((item: { icon?: string; title: string; description: string }, i: number) => {
                    const IconComponent = iconMap[item.icon || 'trending-up'] || TrendingUp
                    return (
                      <div key={i} className="group border border-border bg-secondary/5 overflow-hidden flex flex-col hover:border-primary/40 hover:bg-secondary/10 transition-all duration-300 shadow-sm hover:shadow-[0_5px_30px_-10px_rgba(var(--primary),0.1)]">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 bg-secondary/30 px-4 py-3 border-b border-border">
                           <div className="w-2.5 h-2.5 rounded-full bg-border/80"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-border/80"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-border/80"></div>
                        </div>
                        <div className="p-8 sm:p-10 flex gap-6">
                          <IconComponent className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
                          <div className="space-y-3">
                            <h3 className="font-bold tracking-wide text-lg text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
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

      {/* Testimonials */}
      <section className="py-16 lg:py-24 border-b border-border bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {d.testimonialsHeading}
            </h2>
            {testimonials && testimonials.length > 0 && (
              <div className="grid md:grid-cols-2 gap-[1px] bg-border border border-border overflow-hidden rounded-sm">
                {testimonials.map((t: any, i: number) => (
                    <div key={i} className="bg-background p-10 md:p-14 space-y-8 flex flex-col justify-between group hover:bg-secondary/10 transition-colors">
                      <div className="space-y-4">
                        <p className="font-mono text-sm tracking-wider uppercase text-primary border-b border-border/50 pb-4">
                          {t.metricLabel}
                        </p>
                        <p className="text-5xl lg:text-7xl font-light tracking-tighter text-foreground">{t.metricValue}</p>
                      </div>
                      <blockquote className="text-muted-foreground text-xl leading-relaxed italic border-l-2 border-primary/30 pl-6">
                        "{t.quote}"
                      </blockquote>
                      <div className="pt-8 mt-auto">
                        <p className="font-mono text-sm text-foreground uppercase tracking-widest font-bold">{t.author}</p>
                        <p className="font-mono text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                          {t.company}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction data={{
        heading: d.ctaHeading,
        subheading: d.ctaSubheading,
        buttonText: d.ctaPrimaryText,
        buttonLink: d.ctaPrimaryLink,
        image: d.ctaImage,
        imageAlignment: d.ctaImageAlignment || 'background'
      }} />
    </>
  )
}
