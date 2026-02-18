import React from 'react'

import type { Media, Post } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

type Props = {
  post: Post
  children?: React.ReactNode
}

export const ArticleTop: React.FC<Props> = ({ post, children }) => {
  const title = post.title ?? ''
  const image =
    (post.meta?.image && typeof post.meta.image === 'object'
      ? post.meta.image
      : null) ??
    (post.heroImage && typeof post.heroImage === 'object' ? post.heroImage : null)

  return (
    <>
      <div className="article-top-bg">
        <img src="/img/stone.webp" alt="" />
      </div>
      <div className="article">
        <div className="container">
          <div className="container-rounded container-article">
            <div className="article-top">
              <div className="container-article--top">
                <h1 className="article-top__title">{title}</h1>
                <div className="article-top__tags">
                  <div className="tag tag--active">Blog</div>
                </div>
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
