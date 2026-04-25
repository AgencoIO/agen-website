import { HeroModule } from './modules/hero-module'
import { FeatureGrid } from './modules/feature-grid'
import { TextWithIllustration } from './modules/text-with-illustration'
import { CallToAction } from './modules/call-to-action'
import { GalleryModule } from './modules/gallery-module'
import { FormModule } from './modules/form-module'
import { VideoModule } from './modules/video-module'
import { HeroStatsModule } from './modules/hero-stats-module'
import { DataFlowPipeline } from './modules/data-flow-pipeline'

const componentsMap: any = {
  heroModule: HeroModule,
  featureGrid: FeatureGrid,
  textWithIllustration: TextWithIllustration,
  callToAction: CallToAction,
  gallery: GalleryModule,
  form: FormModule,
  video: VideoModule,
  heroStatsModule: HeroStatsModule,
  dataFlowPipeline: DataFlowPipeline,
}

export function PageBuilder({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block) => {
        const Component = componentsMap[block._type]
        if (!Component) {
          console.warn(`No component found for type: ${block._type}`)
          return null
        }
        return <Component key={block._key} data={block} />
      })}
    </div>
  )
}
