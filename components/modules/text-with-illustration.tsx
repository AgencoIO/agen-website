export function TextWithIllustration({ data }: { data: any }) {
  const isLeft = data.imageAlignment === "left"

  return (
    <section className="w-full px-4 md:px-8 py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col gap-12 lg:gap-16 ${isLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}>
          
          <div className="flex-1 flex flex-col justify-center">
            {/* <div className="mb-6 inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary animate-pulse"></span>
              {data._type.toUpperCase()} / DATA_BLOCK
            </div> */}
            {data.heading && (
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase mb-6 drop-shadow-sm border-l-4 border-primary pl-6">
                {data.heading}
              </h2>
            )}
            {data.copy && (
              <div className="prose prose-invert prose-headings:font-bold prose-headings:uppercase prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p>{data.copy}</p>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-[400px] border border-border bg-card/20 relative group overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {data.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={data.imageUrl} 
                alt={data.heading || "Illustration"} 
                className="relative z-10 w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            ) : (
              <div className="relative z-10 w-full h-full border border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center font-mono text-muted-foreground text-sm">
                <span>[AWAITING_IMAGE_PAYLOAD]</span>
              </div>
            )}
            
            {/* <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex justify-between font-mono text-xs text-muted-foreground">
              <span>IMG // {data.imageUrl ? data.imageUrl.split('/').pop() : 'placeholder.png'}</span>
              <span>100% SCALE</span>
            </div> */}
          </div>

        </div>
      </div>
    </section>
  )
}
