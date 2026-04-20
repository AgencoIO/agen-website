export function FormModule({ data }: { data: any }) {
  const isNewsletter = data.formType === "newsletter"

  return (
    <section className="w-full px-4 md:px-8 py-24 bg-background border-b border-border">
      <div className="max-w-xl mx-auto">
        <div className="border border-border bg-card">
          <div className="w-full border-b border-border bg-muted/30 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            <div className="ml-4 font-mono text-xs text-muted-foreground uppercase opacity-70">
              {data.heading || (isNewsletter ? "Newsletter Setup" : "System Access Request")}
            </div>
          </div>
          
          <form className="p-8 flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              {!isNewsletter && (
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-sm text-foreground uppercase tracking-widest">Subject_Name</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-mono text-primary">{'>'}</span>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full bg-background border border-border pl-10 pr-4 py-3 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <label className="font-mono text-sm text-foreground uppercase tracking-widest">Comm_Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 font-mono text-primary">{'>'}</span>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full bg-background border border-border pl-10 pr-4 py-3 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  />
                </div>
              </div>

              {!isNewsletter && (
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-sm text-foreground uppercase tracking-widest">Payload</label>
                  <textarea 
                    placeholder="Enter query parameters..." 
                    rows={4}
                    className="w-full bg-background border border-border p-4 text-foreground font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  ></textarea>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-foreground text-background font-mono font-bold uppercase tracking-widest hover:bg-primary transition-colors"
            >
              EXECUTE_POST
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
