import { ArrowRight, Terminal } from "lucide-react"

export function CallToAction({ data }: { data: any }) {
  const alignment = data.imageAlignment || 'background'
  const hasImage = !!data.image?.asset?.url

  // If alignment is background, render similar to the old style but with the new tight constraints
  if (alignment === 'background') {
    return (
      <section className="w-full px-4 md:px-8 py-24 bg-primary border-b border-border relative overflow-hidden">
        {hasImage && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image.asset.url} alt="CTA Background" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-primary/95 mix-blend-multiply"></div>
          </div>
        )}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(currentColor_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none z-0 text-primary-foreground"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-background border border-primary/20 flex items-center justify-center mb-6 shadow-2xl">
            <Terminal className="w-6 h-6 text-primary" />
          </div>
          
          {data.heading && (
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-primary-foreground uppercase mb-6 mix-blend-difference drop-shadow-md">
              {data.heading}
            </h2>
          )}
          
          {data.subheading && (
            <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-10 max-w-2xl font-medium">
              {data.subheading}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {data.buttonText && (
              <a 
                href={data.buttonLink || "#"} 
                className="group inline-flex items-center justify-center px-8 py-4 bg-background text-primary font-mono font-bold text-base uppercase tracking-widest hover:bg-neutral-100 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <span>{data.buttonText}</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Handle Split Layouts (Left, Right, Top, Bottom)
  const isHorizontalSplit = alignment === 'left' || alignment === 'right'
  const isLeftSplit = alignment === 'left'
  const isTopSplit = alignment === 'top'

  return (
    <section className="w-full px-4 md:px-8 py-20 bg-background border-b border-border relative">
      <div className={`max-w-7xl mx-auto flex ${isHorizontalSplit ? (isLeftSplit ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse') : (isTopSplit ? 'flex-col' : 'flex-col-reverse')} items-stretch border border-primary/20 bg-primary/5`}>
        
        {/* Content block */}
        <div className={`flex-1 p-8 md:p-12 lg:p-16 relative overflow-hidden ${isHorizontalSplit ? 'md:w-1/2' : 'w-full'}`}>
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          
          <div className="relative z-10 flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center border border-primary">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">System.Init()</span>
            </div>
            
            {data.heading && (
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground uppercase mb-4 max-w-2xl">
                {data.heading}
              </h2>
            )}
            
            {data.subheading && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
                {data.subheading}
              </p>
            )}
            
            {data.buttonText && (
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a 
                  href={data.buttonLink || "#"} 
                  className="group inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-mono font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
                >
                  <span>{data.buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Abstract data viz or Image side */}
        <div className={`flex-1 relative bg-card ${isHorizontalSplit ? 'md:w-1/2 min-h-[300px]' : 'w-full min-h-[300px] border-y border-t-primary/20 border-b-transparent'} overflow-hidden`}>
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.image.asset.url} alt="CTA Visual" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 select-none" />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-6 font-mono text-xs text-primary/70 border-l border-primary/20 bg-primary/10">
              <div className="space-y-4">
                <div className="pb-4 border-b border-primary/20">
                  <span className="block text-primary font-bold mb-1">STATUS</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    ONLINE / ACTIVE
                  </span>
                </div>
                <div className="pb-4 border-b border-primary/20">
                  <span className="block text-primary font-bold mb-1">DATA FLOW</span>
                  <span>OPTIMIZED</span>
                </div>
              </div>
              <div className="pt-4 mt-auto text-right">
                <span className="opacity-50">// WAITING_FOR_IMAGE_PAYLOAD</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
