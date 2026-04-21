import { Search } from "lucide-react"

export function GalleryModule({ data }: { data: any }) {
  if (!data.images || data.images.length === 0) return null

  return (
    <section className="w-full px-4 md:px-8 py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-border">
          <h2 className="text-2xl font-bold tracking-tight text-foreground uppercase border-l-4 border-primary pl-4">
            Asset Explorer
          </h2>
          <div className="font-mono text-sm text-muted-foreground">
            {data.images.length} ITEM(S) LOADED
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.images.map((item: any, idx: number) => {
            const url = item?.asset?.url
            if (!url) return null
            return (
            <div 
              key={idx} 
              className="group relative aspect-video border border-border bg-card overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={url} 
                alt={`Gallery asset ${idx + 1}`} 
                className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                 <Search className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 border border-border font-mono text-[10px] text-muted-foreground">
                INDEX_{idx.toString().padStart(2, '0')}
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
