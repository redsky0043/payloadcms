import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { NewsPreviewBlock as NewsPreviewBlockProps } from '@/payload-types'
import type { Media, Post } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Icon } from '@/components/Icon'
import { Media as MediaComponent } from '@/components/Media'

const LIMIT = 3

function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

type Props = NewsPreviewBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export async function NewsPreviewBlock(props: Props) {
  const { title, links, className } = props

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    depth: 1,
    limit: LIMIT,
    overrideAccess: true,
    pagination: false,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  const posts = (result.docs ?? []) as Post[]
  const allNewsLink = links?.[0]?.link

  return (
    <section className={`news-preview ${className ?? ''}`.trim()}>
      <div className="container">
        <div className="news-preview__headline">
          <h2 className="news-preview__title">{title ?? 'News and blog'}</h2>
          <div className="news-preview__subtitle">
            {allNewsLink ? (
              <CMSLink
                {...allNewsLink}
                label={null}
                className="news-preview__post underline"
                appearance="link"
              >
                All news
                <Icon name="icon-arrow" className="news-preview__icon" width={24} height={24} />
              </CMSLink>
            ) : (
              <Link href="/posts" className="news-preview__post underline">
                All news
                <Icon name="icon-arrow" className="news-preview__icon" width={24} height={24} />
              </Link>
            )}
          </div>
        </div>
        <div className="news-preview__wrapper">
          {posts.map((post) => {
            const href = `/posts/${post.slug}`
            const image =
              typeof post.heroImage === 'object' && post.heroImage
                ? (post.heroImage as Media)
                : null
            const dateStr = formatDate(post.publishedAt ?? post.createdAt)
            return (
              <div key={post.id} className="card">
                <Link className="card__img" href={href}>
                  {image ? (
                    <MediaComponent
                      resource={image}
                      htmlElement={null}
                      pictureClassName=""
                      imgClassName=""
                    />
                  ) : (
                    <picture>
                      <img src="/img/example.jpg" alt="" />
                    </picture>
                  )}
                </Link>
                {dateStr && (
                  <time
                    className="card__date"
                    dateTime={
                      post.publishedAt || post.createdAt
                        ? new Date((post.publishedAt ?? post.createdAt) as string).toISOString().slice(0, 10)
                        : undefined
                    }
                  >
                    {dateStr}
                  </time>
                )}
                <Link className="card__text underline" href={href}>
                  {post.title}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
