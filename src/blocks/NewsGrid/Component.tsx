import Link from 'next/link'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { NewsGridBlock as NewsGridBlockProps } from '@/payload-types'
import type { Media, Post } from '@/payload-types'

import { Icon } from '@/components/Icon'
import { Media as MediaComponent } from '@/components/Media'

function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

type Props = NewsGridBlockProps & {
  className?: string
  disableInnerContainer?: boolean
  currentPage?: number
  pathname?: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function NewsGridBlock(props: Props) {
  const {
    title = 'News and blog',
    tags = [],
    limit = 9,
    basePath = '/posts',
    className,
    currentPage: currentPageProp,
    pathname,
    searchParams,
  } = props

  const pageParam =
    searchParams?.page && typeof searchParams.page === 'string'
      ? parseInt(searchParams.page, 10)
      : searchParams?.page && Array.isArray(searchParams.page)
        ? parseInt(searchParams.page[0], 10)
        : undefined
  const currentPage =
    typeof currentPageProp === 'number' && currentPageProp > 0
      ? currentPageProp
      : typeof pageParam === 'number' && !Number.isNaN(pageParam) && pageParam > 0
        ? pageParam
        : 1

  const paginationBase = pathname ?? basePath

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    depth: 1,
    limit,
    page: currentPage,
    overrideAccess: true,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  const posts = (result.docs ?? []) as Post[]
  const totalPages = result.totalPages ?? 1
  const page = result.page ?? 1
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return (
    <>
      <section className={`news ${className ?? ''}`.trim()}>
        <div className="container">
          <h1 className="h1 news__title">{title}</h1>
          {tags.length > 0 && (
            <div className="news__tags">
              {tags.map((tag, i) => (
                <Link
                  key={tag.id ?? i}
                  href={tag.href}
                  className={`tag ${tag.isActive ? 'tag--active' : ''}`}
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          )}
          <div className="news__wrapper">
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
                          ? new Date((post.publishedAt ?? post.createdAt) as string)
                              .toISOString()
                              .slice(0, 10)
                          : undefined
                      }
                    >
                      {dateStr}
                    </time>
                  )}
                  <Link className="card__text" href={href}>
                    {post.title}
                  </Link>
                  <div className="card__tags" />
                </div>
              )
            })}
          </div>
          <div className="news__line" />
        </div>
      </section>
      {totalPages > 1 && (
        <div className="pagination">
          <div className="container">
            <div className="pagination__wrapper">
              {hasPrevPage ? (
                <Link
                  href={page === 2 ? paginationBase : `${paginationBase}?page=${page - 1}`}
                  className="pagination__button"
                >
                  <Icon
                    name="icon-arrow-pagination"
                    className="pagination__icon"
                    width={24}
                    height={24}
                  />
                </Link>
              ) : (
                <span className="pagination__button pagination__button--disabled">
                  <Icon
                    name="icon-arrow-pagination"
                    className="pagination__icon pagination__icon--inactive"
                    width={24}
                    height={24}
                  />
                </span>
              )}
              <div className="pagination__items">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={p === 1 ? paginationBase : `${paginationBase}?page=${p}`}
                    className={`pagination__item ${p === page ? 'pagination__item--active' : ''}`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
              {hasNextPage ? (
                <Link
                  href={`${paginationBase}?page=${page + 1}`}
                  className="pagination__button"
                >
                  <Icon
                    name="icon-arrow-pagination"
                    className="pagination__icon"
                    width={24}
                    height={24}
                  />
                </Link>
              ) : (
                <span className="pagination__button pagination__button--disabled">
                  <Icon
                    name="icon-arrow-pagination"
                    className="pagination__icon pagination__icon--inactive"
                    width={24}
                    height={24}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
