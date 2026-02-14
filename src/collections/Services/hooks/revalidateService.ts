import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/services/${doc.slug}`

      payload.logger.info(`Revalidating service at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/')
      revalidateTag('services-sitemap')
      revalidateTag('global_header')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/services/${previousDoc.slug}`

      payload.logger.info(`Revalidating old service at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/')
    }
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate && doc?.slug) {
    revalidatePath(`/services/${doc.slug}`)
    revalidatePath('/')
    revalidateTag('global_header')
  }
  return doc
}
