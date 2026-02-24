import React from 'react'

import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

/** Document with title and optional meta image / hero image (Post or Page with article layout). */
export type ArticleTopDoc = {
  title: string | null
  meta?: { image?: (number | null) | Media } | null
  heroImage?: (number | null) | Media
}

type Props = {
  doc: ArticleTopDoc
  /** Optional label next to title (e.g. "Blog", "Careers"). Omit to hide the tag. */
  tagLabel?: string | null
  children?: React.ReactNode
}

export const ArticleTop: React.FC<Props> = ({ doc, tagLabel, children }) => {
  const title = doc.title ?? ''
  // Main hero image: only use heroImage; when removed, show placeholder (no SEO fallback here).
  const image =
    doc.heroImage && typeof doc.heroImage === 'object'
      ? (doc.heroImage as Media)
      : null

  const bgImage =
    doc.meta?.image && typeof doc.meta.image === 'object'
      ? (doc.meta.image as Media)
      : null

  return (
    <>
      <div className="article-top-bg">
        {bgImage ? (
          <MediaComponent
            resource={bgImage}
            pictureClassName=""
            imgClassName=""
          />
        ) : (
          <img src="/img/stone.webp" alt="" />
        )}
      </div>
      <div className="article">
        <div className="container">
          <div className="container-rounded container-article">
            <div className="article-top">
              <div className="container-article--top">
                <h1 className="article-top__title">{title}</h1>
                {tagLabel ? (
                  <div className="article-top__tags">
                    <div className="tag tag--active">{tagLabel}</div>
                  </div>
                ) : null}
                <div className="article-top__img">
                  {image ? (
                    <MediaComponent
                      resource={image as Media}
                      pictureClassName=""
                      imgClassName=""
                    />
                  ) : (
                    <picture>
                      <img src="/img/placeholder-article.webp" alt="" />
                    </picture>
                  )}
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
