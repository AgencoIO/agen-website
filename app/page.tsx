'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Zap, TrendingUp, Layers } from 'lucide-react';
import { DashboardPreview } from '@/components/dashboard-preview';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">Agenco</div>
          <div className="flex items-center gap-8">
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition">How it works</a>
            <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition">Results</a>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Book audit</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-full mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-pretty">
                Your E-commerce Data Is Fragmented.
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                We turn it into competitive advantage. Custom data pipelines, inventory analytics, and market intelligence.
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start free audit <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary/30">
                See how it works
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold">23%</div>
                <p className="text-sm text-muted-foreground">Avg inventory turnover increase</p>
              </div>
              <div>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-sm text-muted-foreground">Pricing errors eliminated</p>
              </div>
            </div>
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
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">The E-Commerce Data Problem</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                If you&apos;re scaling a Shopify store or multi-channel brand, you&apos;re drowning in disconnected data sources.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border bg-secondary/30 p-8 space-y-4">
                <div className="text-3xl font-bold">50+</div>
                <h3 className="font-semibold text-foreground">SKUs across channels</h3>
                <p className="text-sm text-muted-foreground">
                  Shopify, Amazon, TikTok Shop, and marketplace inventory lives in different systems. Manual sync leads to errors.
                </p>
              </Card>
              <Card className="border-border bg-secondary/30 p-8 space-y-4">
                <div className="text-3xl font-bold">5+ hours/week</div>
                <h3 className="font-semibold text-foreground">Manual data work</h3>
                <p className="text-sm text-muted-foreground">
                  Your team exports CSVs, reconciles pricing, monitors competitors. This should be automated.
                </p>
              </Card>
              <Card className="border-border bg-secondary/30 p-8 space-y-4">
                <div className="text-3xl font-bold">Unknown ROI</div>
                <h3 className="font-semibold text-foreground">Hidden revenue leaks</h3>
                <p className="text-sm text-muted-foreground">
                  Price mismatches, stockouts on best sellers, and missed competitor moves cost you 15–30% in lost revenue.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">How Agenco Works</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">1</div>
                <h3 className="text-xl font-semibold">Data Audit</h3>
                <p className="text-muted-foreground">
                  We analyze your Shopify, inventory, and channel data to find gaps, inconsistencies, and growth opportunities.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">2</div>
                <h3 className="text-xl font-semibold">Pipeline Build</h3>
                <p className="text-muted-foreground">
                  We design and deploy custom data pipelines that ingest, normalize, and enrich your data in real time.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">3</div>
                <h3 className="text-xl font-semibold">Intelligence & ROI</h3>
                <p className="text-muted-foreground">
                  Your team gets dashboards, alerts, and insights that drive pricing, inventory, and competitive decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Why E-Commerce Teams Choose Agenco</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Immediate revenue impact</h3>
                  <p className="text-muted-foreground">
                    Customers see 15–30% margin improvements within 90 days through smarter pricing and inventory decisions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Hands-on expertise</h3>
                  <p className="text-muted-foreground">
                    We work closely with your team, not as a black box. Our data engineers understand e-commerce inside out.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Layers className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Custom, not generic</h3>
                  <p className="text-muted-foreground">
                    Every pipeline is built for your channels, suppliers, and business. No template solutions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Scalable infrastructure</h3>
                  <p className="text-muted-foreground">
                    From day one to $50M+ revenue, our pipelines grow with your business. No rewrites needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study / Social Proof */}
      <section className="py-24 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Trusted by D2C Brands & Shopify Founders</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-border bg-background p-10 space-y-6">
                <div className="space-y-3">
                  <p className="text-lg font-semibold">Growth in inventory velocity</p>
                  <p className="text-4xl font-bold">23%</p>
                </div>
                <p className="text-muted-foreground">
                  &quot;After Agenco set up our data pipeline, we cut inventory holding by 2 weeks and freed up $200K in working capital.&quot;
                </p>
                <div>
                  <p className="font-semibold">D2C Founder, $3M ARR</p>
                  <p className="text-sm text-muted-foreground">Multi-channel beauty brand</p>
                </div>
              </Card>
              <Card className="border-border bg-background p-10 space-y-6">
                <div className="space-y-3">
                  <p className="text-lg font-semibold">Pricing accuracy improvement</p>
                  <p className="text-4xl font-bold">94%</p>
                </div>
                <p className="text-muted-foreground">
                  &quot;We eliminated manual pricing errors across Amazon and Shopify. Our margins are now protected, and we can react to competitors in minutes.&quot;
                </p>
                <div>
                  <p className="font-semibold">Operations Manager, $5M ARR</p>
                  <p className="text-sm text-muted-foreground">Amazon + Shopify seller</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Turn Your Data Into Growth</h2>
            <p className="text-lg text-muted-foreground">
              Get a free, no-obligation data audit. We&apos;ll show you exactly where you&apos;re leaking revenue and how much you can capture.
            </p>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Book your free audit
            </Button>
            <a href="https://calendly.com/sam_rat/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary/30">
                Schedule a call
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <p className="font-semibold mb-4">Agenco</p>
              <p className="text-sm text-muted-foreground">Data infrastructure for e-commerce brands.</p>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Data Pipelines</a></li>
                <li><a href="#" className="hover:text-foreground transition">Analytics</a></li>
                <li><a href="#" className="hover:text-foreground transition">Marketplace Data</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-sm mb-4">Contact</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:hello@agenco.io" className="hover:text-foreground transition">hello@agenco.io</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Agenco. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
