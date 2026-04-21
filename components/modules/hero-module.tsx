export function HeroModule({ data }: { data: any }) {
  const hasBg = !!data.bgImage?.asset?.url

  return (
    <section className="w-full px-4 md:px-8 py-32 bg-background border-b border-border relative overflow-hidden">
      
      {/* Background Layers */}
      {!hasBg ? (
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>
      ) : (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={data.bgImage.asset.url} 
            alt="Hero Background" 
            className="w-full h-full object-cover select-none object-center" 
          />
          
          {/* Pro Max Aesthetic Gradient Overlays */}
          {/* 1. Primary horizontal fade: Solid near the text, dissolving smoothly to the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/5 sm:to-transparent"></div>
          
          {/* 2. Secondary vertical fade: Ensures any overflowing text downward remains legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"></div>
          
          {/* 3. Base wash: A very subtle global dimming to prevent bright spots in the image from breaking UI contrast */}
          <div className="absolute inset-0 bg-foreground/5 backdrop-blur-[1px]"></div>
          
          {/* 4. Deep Tech Grid: Super subtle pattern over the image to maintain the data engineering vibe */}
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="max-w-3xl">
          {data.badge && (
            <div className="inline-flex items-center px-3 py-1 mb-6 border border-primary/30 bg-primary/10 text-primary font-mono text-sm uppercase tracking-wider">
              {data.badge}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase mb-6 drop-shadow-sm">
            {data.heading || "Hero Module"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            {data.tagline || "Configure this module in the CMS."}
          </p>
          <div className="flex flex-wrap gap-4">
            {data.ctaText && (
              <a 
                href={data.ctaLink || "#"} 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
              >
                {data.ctaText}
              </a>
            )}
            {data.secondaryCtaText && (
              <a 
                href={data.secondaryCtaLink || "#"} 
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-border text-foreground font-mono font-bold uppercase tracking-wide hover:border-foreground transition-colors"
              >
                {data.secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
