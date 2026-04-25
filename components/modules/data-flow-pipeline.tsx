'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Activity, ArrowRightLeft, CheckCircle2, ShoppingCart, Tag, TrendingDown } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataFlowPipelineData {
  sectionTitle?: string
  sectionDescription?: string
  badgeLabel?: string
  sources?: string[]
  processingSteps?: string[]
  destinations?: string[]
  dashboardTitle?: string
  dashboardProductName?: string
  dashboardProductSku?: string
  dashboardYourPrice?: string
  dashboardCompetitorAvg?: string
  dashboardRecommendation?: string
}

interface DataFlowPipelineProps {
  data: DataFlowPipelineData
}

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' as const },
  }),
}

const slideIn = (side: 'left' | 'right' | 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    x: side === 'left' ? -28 : side === 'right' ? 28 : 0,
    y: side === 'up' ? 20 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  },
})

// ─── Pipeline Node ─────────────────────────────────────────────────────────────

interface NodeProps {
  label: string
  delay?: number
  direction?: 'left' | 'right' | 'up'
  accentClass: string        // Tailwind color for dot + hover border
  inView: boolean
}

function PipelineNode({ label, delay = 0, direction = 'up', accentClass, inView }: NodeProps) {
  return (
    <motion.div
      variants={slideIn(direction, delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group flex items-center gap-3 px-4 py-3 bg-background border border-border hover:border-primary/40 hover:shadow-sm transition-all duration-300 cursor-default"
    >
      {/* Pulsing accent dot */}
      <span className={`relative flex-shrink-0 w-2 h-2`}>
        <span className={`absolute inset-0 rounded-full animate-ping ${accentClass} opacity-40`} />
        <span className={`relative inline-block w-2 h-2 rounded-full ${accentClass}`} />
      </span>
      <span className="font-mono text-[11px] tracking-widest uppercase text-foreground/60 group-hover:text-foreground/90 transition-colors duration-200 leading-none">
        {label}
      </span>
    </motion.div>
  )
}

// ─── Flow Connections (Curved Paths) ──────────────────────────────────────────

function FlowConnections({ type, inView, delay = 0, count = 3 }: { type: 'converge' | 'diverge'; inView: boolean; delay?: number; count?: number }) {
  return (
    <div className="hidden lg:flex w-16 xl:w-24 h-full min-h-[160px] relative items-center justify-center">
      <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
        {Array.from({ length: count }).map((_, i) => {
          const spacing = 100 / count
          const y1 = type === 'converge' ? (spacing * i) + (spacing / 2) : 50
          const y2 = type === 'converge' ? 50 : (spacing * i) + (spacing / 2)
          const path = `M 0 ${y1} C 50 ${y1}, 50 ${y2}, 100 ${y2}`
          
          return (
            <g key={i}>
              <path d={path} fill="none" className="stroke-border" vectorEffect="non-scaling-stroke" strokeWidth="1" strokeDasharray="4 4" />
              {inView && (
                <motion.path 
                  d={path} 
                  fill="none" 
                  className="stroke-primary" 
                  vectorEffect="non-scaling-stroke" 
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: delay + (i * 0.4), 
                    ease: "linear" 
                  }}
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── Engine Core ──────────────────────────────────────────────────────────────

function EngineCore({ steps, inView }: { steps: string[]; inView: boolean }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setActive(s => (s + 1) % steps.length), 1800)
    return () => clearInterval(id)
  }, [inView, steps.length])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative w-full border border-primary/20 bg-background shadow-[0_0_0_1px_hsl(var(--primary)/0.06),0_4px_20px_0_hsl(var(--primary)/0.08)] p-5"
    >
      {/* Corner accents — geometric brutalism */}
      <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary/50" />
      <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-primary/50" />

      {/* Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary/60">
          Execution Engine
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, i) => {
          const isCurrent = i === active && inView
          return (
            <div
              key={step}
              className="relative h-9 flex items-center px-3 border overflow-hidden transition-all duration-500"
              style={{
                borderColor: isCurrent ? 'oklch(0.5 0.2 250 / 0.35)' : 'oklch(0.92 0 0)',
                background: isCurrent ? 'oklch(0.5 0.2 250 / 0.05)' : 'transparent',
              }}
            >
              {/* Sweep shine on active */}
              {isCurrent && (
                <motion.div
                  key={`sweep-${i}-${active}`}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
                />
              )}
              <span
                className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-300 relative z-10"
                style={{ color: isCurrent ? 'oklch(0.5 0.2 250)' : 'oklch(0.5 0 0)' }}
              >
                {step}
              </span>
              {isCurrent && (
                <span className="ml-auto font-mono text-[9px] text-primary/50 uppercase tracking-widest">ACTIVE</span>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Business Outcomes Dashboard Panel ───────────────────────────────────────────

function BusinessOutcomesDashboard({ inView, data }: { inView: boolean; data: DataFlowPipelineData }) {
  // Generate streaming data points (40 points for smooth area chart)
  const [dataPoints, setDataPoints] = useState<{id: number, value: number, timestamp: Date}[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      value: 85,
      timestamp: new Date(Date.now() - (39 - i) * 2000)
    }))
  })
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null)
  const [clickedPointId, setClickedPointId] = useState<number | null>(null)
  const [btnState, setBtnState] = useState<'idle' | 'loading' | 'success'>('idle')

  // Live fluctuating chart effect
  useEffect(() => {
    if (!inView) return
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const last = prev[prev.length - 1]
        let next = last.value + (Math.random() * 6 - 3)
        // constrain to realistic price bounds
        if (next < 75) next = 75 + Math.random() * 2
        if (next > 95) next = 95 - Math.random() * 2
        return [...prev.slice(1), { 
          id: last.id + 1, 
          value: next, 
          timestamp: new Date()
        }]
      })
    }, 2000) // Slower update for easier interaction
    return () => clearInterval(interval)
  }, [inView])

  // Deselect if point falls off chart
  useEffect(() => {
    if (clickedPointId !== null && !dataPoints.find(p => p.id === clickedPointId)) {
      setClickedPointId(null)
    }
  }, [dataPoints, clickedPointId])

  // Map values to 0-40 Y range for SVG (0 is top, 40 is bottom)
  const pathString = dataPoints.map((pt, i) => {
    const x = i * (100 / 39)
    const y = 40 - ((pt.value - 70) / 30 * 40)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')
  
  const areaString = `${pathString} L 100 40 L 0 40 Z`
  const latestVal = dataPoints[dataPoints.length - 1].value
  const targetY = 40 - ((85 - 70) / 30 * 40)

  // Interactive point logic
  const activeId = clickedPointId !== null ? clickedPointId : hoveredPointId
  const activeIndex = activeId !== null ? dataPoints.findIndex(p => p.id === activeId) : -1
  const activePoint = activeIndex !== -1 ? dataPoints[activeIndex] : null

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const time = date.toTimeString().split(' ')[0]
    return `${yyyy}-${mm}-${dd} ${time}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.6, ease: 'easeOut' }}
      className="mt-10 border border-border bg-background shadow-sm overflow-hidden"
      aria-label="Price Analytics Dashboard Preview"
    >
      {/* Dashboard titlebar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/40">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            {data?.dashboardTitle || 'Price Intelligence Output'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
            {new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="w-2 h-2 rounded-full bg-border" />
            <span className="w-2 h-2 rounded-full bg-primary/30" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left Col: Product Focus */}
        <div className="w-full lg:w-1/3 p-5 bg-background flex flex-col items-center justify-center relative">
          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            Monitored SKU
          </div>
          <div className="mt-6 w-full max-w-[200px] aspect-[4/3] relative rounded-md border border-border overflow-hidden bg-white flex items-center justify-center shadow-sm">
            <Image 
              src="/images/ecommerce_product_card.png" 
              alt="Monitored Product" 
              fill
              className="object-contain p-0"
            />
          </div>
          <div className="mt-4 text-center">
            <h4 className="font-mono text-sm font-bold text-foreground">{data?.dashboardProductName || 'Athletic Runner X1'}</h4>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{data?.dashboardProductSku || 'SKU: AR-X1-WHT'}</p>
          </div>
        </div>

        {/* Right Col: Insights & Action */}
        <div className="flex-1 bg-secondary/10 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Market Position</span>
              <span className="font-mono text-[10px] bg-red-500/10 text-red-600 border border-red-500/20 px-2 py-0.5 uppercase flex items-center gap-1">
                <TrendingDown className="w-3 h-3" /> Losing Buy Box
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-background border border-border p-3 shadow-sm">
                <div className="font-mono text-[10px] text-muted-foreground uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Your Price
                </div>
                <div className="font-mono text-xl font-bold text-foreground line-through opacity-70">{data?.dashboardYourPrice || '$89.99'}</div>
              </div>
              <div className="bg-background border border-border p-3 relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="font-mono text-[10px] text-primary uppercase mb-1 flex items-center gap-1 relative z-10">
                  <ShoppingCart className="w-3 h-3" /> Competitor Avg
                </div>
                <div className="font-mono text-xl font-bold text-primary relative z-10">{data?.dashboardCompetitorAvg || '$85.00'}</div>
              </div>
            </div>

            <div className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground mb-2 flex justify-between">
              <span>Competitor Trend (Live)</span>
              <span className="flex items-center gap-1 text-[8px] text-green-500 font-bold">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> STREAMING
              </span>
            </div>

            {/* HIGH CRAFT CHART */}
            <div className="h-28 w-full relative border border-border bg-background overflow-hidden mb-6 group cursor-crosshair">
               {/* Industrial Grid background */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:10%_25%] opacity-40" />
               
               {/* Target Line */}
               <div className="absolute inset-x-0 border-t border-dashed border-primary/50 flex items-center z-0" style={{ top: `${(targetY / 40) * 100}%` }}>
                 <span className="absolute right-1 -top-4 font-mono text-[8px] text-primary/70 bg-background px-1">TGT $85</span>
               </div>

               {/* Streaming Area SVG */}
               <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                       <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d={areaString} fill="url(#chart-grad)" className="transition-all ease-linear" style={{ transitionDuration: '2s' }} />
                  <path d={pathString} fill="none" className="stroke-primary transition-all ease-linear" vectorEffect="non-scaling-stroke" strokeWidth="1.5" style={{ transitionDuration: '2s' }} />
               </svg>

               {/* Default Live crosshair */}
               <div 
                 className={`absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)] transition-all ease-linear -translate-x-1/2 -translate-y-1/2 z-10 ${activePoint ? 'opacity-0' : 'opacity-100'}`}
                 style={{ left: '100%', top: `${( (40 - ((latestVal - 70) / 30 * 40)) / 40) * 100}%`, transitionDuration: '2s' }}
               />
               <div className={`absolute left-2 bottom-2 font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-1.5 rounded flex items-center gap-1 z-10 transition-opacity duration-300 ${activePoint ? 'opacity-0' : 'opacity-100'}`}>
                 <Activity className="w-3 h-3" />
                 ${latestVal.toFixed(2)}
               </div>

               {/* Interaction Hitboxes */}
               <div className="absolute inset-0 flex z-20" onMouseLeave={() => setHoveredPointId(null)}>
                 {dataPoints.map((pt) => (
                   <div 
                     key={pt.id}
                     className="flex-1 h-full cursor-crosshair"
                     onMouseEnter={() => setHoveredPointId(pt.id)}
                     onClick={() => setClickedPointId(clickedPointId === pt.id ? null : pt.id)}
                   />
                 ))}
               </div>

               {/* Active Point Interactive Overlay */}
               {activePoint && activeIndex !== -1 && (
                 <>
                   {/* Vertical Line */}
                   <div 
                     className="absolute top-0 bottom-0 border-l border-dashed border-primary/50 pointer-events-none transition-all ease-linear z-10"
                     style={{ left: `${activeIndex * (100 / 39)}%`, transitionDuration: '2s' }}
                   />
                   
                   {/* Tooltip */}
                   <div 
                     className="absolute top-2 -translate-x-1/2 bg-background/95 border border-border px-2 py-1.5 shadow-md pointer-events-none z-30 flex flex-col items-center min-w-[130px] transition-all ease-linear whitespace-nowrap"
                     style={{ left: `${activeIndex * (100 / 39)}%`, transitionDuration: '2s' }}
                   >
                     <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest mb-0.5">
                       {formatDate(activePoint.timestamp)}
                     </span>
                     <span className="font-mono text-sm font-bold text-primary">
                       ${activePoint.value.toFixed(2)}
                     </span>
                   </div>
                   
                   {/* Dot on the line */}
                   <div 
                     className="absolute w-2 h-2 rounded-full bg-background border-2 border-primary pointer-events-none z-20 transition-all ease-linear -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                     style={{ 
                       left: `${activeIndex * (100 / 39)}%`,
                       top: `${(40 - ((activePoint.value - 70) / 30 * 40)) / 40 * 100}%`,
                       transitionDuration: '2s'
                     }}
                   />
                 </>
               )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">Recommendation: {data?.dashboardRecommendation || 'Match $85.00'}</span>
            </div>
            <motion.button 
              onClick={() => {
                if (btnState !== 'idle') return
                setBtnState('loading')
                setTimeout(() => {
                  setBtnState('success')
                  setTimeout(() => setBtnState('idle'), 2500)
                }, 1200)
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              className={`relative overflow-hidden font-mono text-[10px] uppercase tracking-widest px-5 py-2.5 flex items-center gap-2 transition-colors duration-300 shadow-[0_4px_14px_0_rgba(var(--primary),0.2)] hover:shadow-[0_6px_20px_rgba(var(--primary),0.3)] rounded-sm ${
                btnState === 'success' 
                  ? 'bg-emerald-500 text-white border border-emerald-400' 
                  : 'bg-primary text-primary-foreground border border-primary/20'
              }`}
            >
              {/* Shiny sweep effect */}
              {btnState === 'idle' && (
                <motion.div 
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  initial={{ x: '-200%' }}
                  animate={{ x: '400%' }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                />
              )}
              
              {btnState === 'idle' && (
                <>
                  <ArrowRightLeft className="w-3 h-3" /> Auto-Reprice
                </>
              )}
              {btnState === 'loading' && (
                <>
                  <Activity className="w-3 h-3 animate-spin" /> Processing
                </>
              )}
              {btnState === 'success' && (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Live
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Column Header ─────────────────────────────────────────────────────────────

function ColumnHeader({ label, align = 'left', inView, delay = 0 }: {
  label: string; align?: 'left' | 'center' | 'right'; inView: boolean; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className={`flex items-center gap-2 mb-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}
    >
      {align !== 'right' && <span className="w-5 h-px bg-border" />}
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
        {label}
      </span>
      {align !== 'left' && <span className="w-5 h-px bg-border" />}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DataFlowPipeline({ data }: DataFlowPipelineProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-80px' })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  // Normalize CMS data with safe fallbacks
  const title = data?.sectionTitle || 'Intelligent Data Flow'
  const description = data?.sectionDescription || 'Fragmented sources unified into actionable intelligence — in real time.'
  const badge = data?.badgeLabel || 'Pipeline Architecture'
  const sources = data?.sources?.length ? data.sources : ['APIs / Webhooks', 'Web Scraping', 'CDC Streams']
  const steps = data?.processingSteps?.length ? data.processingSteps : ['Data Cleaning', 'Transformation', 'Enrichment']
  const destinations = data?.destinations?.length ? data.destinations : ['Data Lake (S3)', 'Search Analytics', 'Client Databases']

  return (
    <section
      ref={sectionRef}
      aria-label="Data Flow Pipeline Architecture"
      className="relative isolate overflow-hidden bg-background border-b border-border"
    >
      {/* Subtle dot-grid background with parallax */}
      <motion.div
        style={!reducedMotion && mounted ? { y: gridY } : {}}
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,oklch(0.92_0_0)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(0.5_0.2_250/0.04),transparent)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">

        {/* ── Section Header ── */}
        <div className="mb-14 lg:mb-16 max-w-2xl">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-primary/70">
              {badge}
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0.08}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-3xl lg:text-[2.5rem] font-black tracking-tighter text-foreground leading-[1.1] mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.16}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-base text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* ── Pipeline Three-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 lg:gap-0 items-stretch">

          {/* ─── Col 1: Sources ─── */}
          <div className="flex flex-col h-full">
            <ColumnHeader label="Sources" inView={isInView} delay={0.05} />
            <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${sources.length}, minmax(0, 1fr))` }}>
              {sources.map((label, i) => (
                <div key={label} className="flex flex-col justify-center py-2">
                  <PipelineNode
                    label={label}
                    delay={0.1 + i * 0.08}
                    direction="left"
                    accentClass="bg-blue-500"
                    inView={isInView}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Connectors L→C */}
          <FlowConnections type="converge" count={sources.length} delay={0.4} inView={isInView} />

          {/* ─── Col 2: Engine ─── */}
          <div className="flex flex-col h-full">
            <ColumnHeader label="Processing" align="center" inView={isInView} delay={0.15} />
            <div className="flex-1 flex flex-col justify-center">
              <EngineCore steps={steps} inView={isInView} />
            </div>
          </div>

          {/* Connectors C→R */}
          <FlowConnections type="diverge" count={destinations.length} delay={0.5} inView={isInView} />

          {/* ─── Col 3: Destinations ─── */}
          <div className="flex flex-col h-full">
            <ColumnHeader label="Destinations" align="right" inView={isInView} delay={0.2} />
            <div className="flex-1 grid" style={{ gridTemplateRows: `repeat(${destinations.length}, minmax(0, 1fr))` }}>
              {destinations.map((label, i) => (
                <div key={label} className="flex flex-col justify-center py-2">
                  <PipelineNode
                    label={label}
                    delay={0.25 + i * 0.08}
                    direction="right"
                    accentClass="bg-emerald-500"
                    inView={isInView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Business Outcomes Dashboard (post-destination output) ── */}
        <div className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="flex items-center gap-2 mb-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground/50">
              <path d="M6 1v5l3 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">
              Output → Intelligence Layer
            </span>
          </motion.div>
          <BusinessOutcomesDashboard inView={isInView} data={data} />
        </div>

        {/* ── Bottom narrative phases ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px border border-border bg-border"
        >
          {[
            {
              num: '01',
              title: 'Ingest',
              desc: 'Collect from any source — REST, GraphQL, CDC, scraping — with schema-on-read flexibility.',
              color: 'text-blue-600',
              border: 'border-blue-500/20',
            },
            {
              num: '02',
              title: 'Process',
              desc: 'Clean, enrich, and transform at sub-50ms latency using distributed stream processing.',
              color: 'text-primary',
              border: 'border-primary/20',
            },
            {
              num: '03',
              title: 'Deliver',
              desc: 'Route clean data to warehouses, search indices, and dashboards — automatically.',
              color: 'text-emerald-600',
              border: 'border-emerald-500/20',
            },
          ].map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.9 + i * 0.1 }}
              className={`group bg-background p-6 border-t-2 ${phase.border} hover:bg-secondary/30 transition-colors duration-300`}
            >
              <div className={`font-mono text-3xl font-black ${phase.color} opacity-20 mb-2`}>
                {phase.num}
              </div>
              <div className={`font-mono text-xs tracking-widest uppercase mb-2 ${phase.color}`}>
                {phase.title}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/70 transition-colors duration-300">
                {phase.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
