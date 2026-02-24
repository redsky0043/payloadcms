import type React from 'react'
import type { Config, Page, Post } from '@/payload-types'

import { getCachedDocument } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
}

/** Shape of a redirect doc when redirects collection is from plugin (not in generated types). */
type RedirectItem = { from?: string; to?: { url?: string; reference?: { relationTo?: string; value?: string | { slug?: string } } } }

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = (await getCachedRedirects()()) as RedirectItem[]

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo as keyof Config['collections'] | undefined
      const id = redirectItem.to?.reference?.value

      const document =
        collection && id
          ? ((await getCachedDocument(collection as keyof Config['collections'], id)()) as Page | Post)
          : undefined
      redirectUrl = document
        ? `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${document.slug}`
        : ''
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
