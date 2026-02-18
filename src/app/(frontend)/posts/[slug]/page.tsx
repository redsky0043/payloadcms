import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { ArticleAside } from '@/components/Article/ArticleAside'
import { ArticleContent } from '@/components/Article/ArticleContent'
import { ArticleTop } from '@/components/Article/ArticleTop'
import { parseArticleSections } from '@/utilities/parseArticleSections'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) {
    return null
  }

  const sections = parseArticleSections(post.content)
  const headings = sections
    .filter((s) => s.title)
    .map((s) => ({ id: s.id, title: s.title }))

  return (
    <main>
      <PageClient />
      {draft && <LivePreviewListener />}

      <ArticleTop post={post}>
        <div className="article__content">
          <ArticleAside headings={headings} />
          <ArticleContent content={post.content} />
        </div>
      </ArticleTop>

      {post.layout && post.layout.length > 0 ? (
        <RenderBlocks blocks={post.layout} />
      ) : null}
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post, basePath: 'posts' })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
