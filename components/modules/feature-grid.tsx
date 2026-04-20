import { Terminal } from "lucide-react"

export function FeatureGrid({ data }: { data: any }) {
  if (!data.features || data.features.length === 0) return null

  return (
    <section className="w-full px-4 md:px-8 py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        {data.sectionTitle && (
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase mb-16 border-l-4 border-primary pl-6">
            {data.sectionTitle}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((feature: any, i: number) => (
            <div 
              key={i} 
              className="group p-8 border border-border bg-card/40 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 flex flex-col gap-6"
            >
              <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors text-primary">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-mono tracking-wide text-foreground uppercase mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
