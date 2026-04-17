'use client'

import { usePathname } from 'next/navigation'

/**
 * Wraps children and only renders them if the current path
 * does NOT match any of the excluded patterns.
 */
export function ExcludeOnPaths({
  children,
  excludePaths,
}: {
  children: React.ReactNode
  excludePaths: string[]
}) {
  const pathname = usePathname()

  const shouldExclude = excludePaths.some((path) => {
    if (path.endsWith('*')) {
      return pathname.startsWith(path.slice(0, -1))
    }
    return pathname === path
  })

  if (shouldExclude) return null

  return <>{children}</>
}
