import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return (services.docs ?? []).map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ServicePage({ params: paramsPromise, searchParams }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug })
  const resolvedSearchParams = await searchParams

  if (!service) {
    return null
  }

  const { layout } = service

  return (
    <main className="">
      <PageClient />

      {draft && <LivePreviewListener />}

      <RenderBlocks
        blocks={layout}
        searchParams={resolvedSearchParams}
        pathname={`/services/${decodedSlug}`}
      />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug })

  return generateMeta({ doc: service, basePath: 'services' })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    depth: 2,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] ?? null
})
