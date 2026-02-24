import type { Metadata } from 'next'

// import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { ArticleAside } from '@/components/Article/ArticleAside'
import { ArticleContent } from '@/components/Article/ArticleContent'
import { ArticleTop } from '@/components/Article/ArticleTop'
import { parseArticleSections } from '@/utilities/parseArticleSections'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{ slug?: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params: paramsPromise, searchParams }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const resolvedSearchParams = await searchParams
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    // return <PayloadRedirects url={url} />
    return null
  }

  const { layout, useArticleLayout, content, articleTag } = page

  const useArticle = Boolean(useArticleLayout && content?.root?.children?.length)

  const sections = useArticle ? parseArticleSections(content) : []
  const headings = sections
    .filter((s) => s.title)
    .map((s) => ({ id: s.id, title: s.title }))

  return (
    <main className="">
      {draft && <LivePreviewListener />}

      {useArticle ? (
        <>
          <ArticleTop
            doc={page}
            tagLabel={articleTag ?? undefined}
          >
            <div className="article__content">
              <ArticleAside headings={headings} />
              <ArticleContent content={content} />
            </div>
          </ArticleTop>
          {layout && layout.length > 0 ? (
            <RenderBlocks
              blocks={layout}
              searchParams={resolvedSearchParams}
              pathname={`/${decodedSlug}`}
            />
          ) : null}
        </>
      ) : (
        <RenderBlocks
          blocks={layout ?? []}
          searchParams={resolvedSearchParams}
          pathname={`/${decodedSlug}`}
        />
      )}
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 3,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
