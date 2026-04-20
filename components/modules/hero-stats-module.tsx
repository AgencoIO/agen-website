export function HeroStatsModule({ data }: { data: any }) {
  if (!data?.stats || data.stats.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-8 py-12 md:py-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
          {data.stats.map((stat: any, i: number) => (
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
      </div>
    </section>
  )
}
