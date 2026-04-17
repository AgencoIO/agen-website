import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { PortableTextComponents as PTComponents } from '@portabletext/react'

export const PortableTextComponents: PTComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              {...(value.asset?.metadata?.lqip && {
                placeholder: 'blur' as const,
                blurDataURL: value.asset.metadata.lqip,
              })}
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => {
      return (
        <div className="my-6">
          {value.filename && (
            <div className="bg-secondary/80 border border-border border-b-0 rounded-t-lg px-4 py-2 text-xs text-muted-foreground font-mono">
              {value.filename}
            </div>
          )}
          <pre
            className={`bg-secondary border border-border ${
              value.filename ? 'rounded-b-lg' : 'rounded-lg'
            } p-4 overflow-x-auto`}
          >
            <code className="text-sm font-mono">{value.code}</code>
          </pre>
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.blank ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/50 pl-6 py-2 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-4 text-foreground/90">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-foreground/90">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-foreground/90">{children}</li>
    ),
  },
}
