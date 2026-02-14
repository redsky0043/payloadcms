import type { Metadata } from 'next'

import type { Media, Page, Post, Service, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

function getDocUrl(
  doc: Partial<Page> | Partial<Post> | Partial<Service> | null,
  basePath?: string,
): string {
  if (!doc?.slug) return '/'
  const slug = Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug
  return basePath ? `/${basePath}/${slug}` : `/${slug}`
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Service> | null
  basePath?: string
}): Promise<Metadata> => {
  const { doc, basePath } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: getDocUrl(doc, basePath),
    }),
    title,
  }
}
