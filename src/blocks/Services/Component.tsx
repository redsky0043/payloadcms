import React from 'react'

import Link from 'next/link'
import type { Media, Service, ServicesBlock as ServicesBlockProps } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

type Props = ServicesBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ServicesBlock: React.FC<Props> = ({
  headline = 'Default headline',
  services,
  className,
  disableInnerContainer,
}) => {
  // Relationship може повертати ID (числа) або populated об'єкти — беремо лише повні документи з slug
  const serviceList = Array.isArray(services) ? services : []
  const resolved = serviceList.filter(
    (s): s is Service => typeof s === 'object' && s !== null && 'slug' in s,
  )

  if (!resolved.length) return null

  return (
    <section
      className={`services section section--bg-secondary section--rouded-top ${className ?? ''}`.trim()}
    >
      <div className="container">
        <h2 className="services__headline">
          {headline}
        </h2>
        <div className={disableInnerContainer ? '' : 'container'}>
          <div className="services__list">
            {resolved.map((service, i) => {
              // Зображення, заголовок і опис — з SEO даних сервіса (meta)
              const image =
                typeof service.meta?.image === 'object'
                  ? (service.meta.image as Media)
                  : null
              const title = service.meta?.title ?? service.title ?? ''
              const description = service.meta?.description ?? ''

              return (
                <Link
                  key={service.id ?? i}
                  href={`/services/${service.slug}`}
                  className="services__item"
                >
                  <div className="services__title">
                    {title}
                  </div>
                  {description && (
                    <p className="services__text">
                      {description}
                    </p>
                  )}
                  {image && (
                    <div className="services__bg">
                      <MediaComponent
                        resource={image}
                        fill
                        imgClassName="services__img"
                      />
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
