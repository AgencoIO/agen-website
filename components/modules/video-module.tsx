import { Play } from "lucide-react"

export function VideoModule({ data }: { data: any }) {
  if (!data.videoUrl) return null

  // Minimal logic for demo purposes (assuming simple iframe wrapper for standard URLs if it's YouTube)
  // In a real scenario, you'd parse YouTube/Vimeo specifically. Doing a generic box for visual sake.
  const isYoutube = data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be')

  return (
    <section className="w-full px-4 md:px-8 py-24 bg-background border-b border-border">
      <div className="max-w-5xl mx-auto">
        {data.caption && (
          <div className="mb-8 font-mono text-sm text-primary uppercase tracking-widest border-l-2 border-primary pl-4">
            STREAM // {data.caption}
          </div>
        )}
        
        <div className="relative w-full aspect-video border border-border bg-card p-2 md:p-4 group">
          <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
          
          <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
             <div className="absolute z-20 w-16 h-16 bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary hover:scale-110 transition-all border border-primary-foreground/20">
               <Play className="w-6 h-6 text-primary-foreground ml-1" />
             </div>
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src={data.videoUrl.includes('jpg') ? data.videoUrl : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"} 
               alt="Video placeholder" 
               className="opacity-100 transition-all duration-700 w-full h-full object-cover" 
             />
             <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between font-mono text-xs text-white/70">
                <span>00:00:00 / --:--:--</span>
                <span>[AWAITING_BUFFER]</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
