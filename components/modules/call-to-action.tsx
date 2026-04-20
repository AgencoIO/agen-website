import { ArrowRight, Terminal } from "lucide-react"

export function CallToAction({ data }: { data: any }) {
  return (
    <section className="w-full px-4 md:px-8 py-32 bg-primary border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:20px_20px]"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-background border border-primary/20 flex items-center justify-center mb-8 shadow-2xl">
          <Terminal className="w-8 h-8 text-primary" />
        </div>
        
        {data.heading && (
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary-foreground uppercase mb-6 mix-blend-difference">
            {data.heading}
          </h2>
        )}
        
        {data.subheading && (
          <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed mb-12 max-w-2xl font-medium">
            {data.subheading}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {data.buttonText && (
            <a 
              href="#" 
              className="group inline-flex items-center justify-center px-10 py-5 bg-background text-primary font-mono font-bold text-lg uppercase tracking-widest hover:bg-neutral-100 transition-all outline-none focus:ring-4 focus:ring-primary/50"
            >
              <span>{data.buttonText}</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 w-full font-mono text-sm text-primary-foreground/60 flex justify-between">
          <span>SYS.MSG: INIT_CALL</span>
          <span>STATUS: STANDBY</span>
        </div>
      </div>
    </section>
  )
}
