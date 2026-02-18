'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

export type ArticleAsideHeading = {
  id: string
  title: string
}

type Props = {
  headings: ArticleAsideHeading[]
}

export const ArticleAside: React.FC<Props> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  )
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (!href || href === '#') return
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    if (!headings.length) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          if (id) setActiveId(id)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    )

    const observer = observerRef.current
    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
      observerRef.current = null
    }
  }, [headings])

  if (!headings.length) return null

  return (
    <div className="article__content_left">
      <aside className="article-aside">
        <div className="article-aside-links">
          <div className="article-aside-links__list">
            {headings.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`article-aside-links__item ${activeId === id ? 'is-active' : ''}`}
                onClick={handleClick}
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
