import React from 'react'

import type { InfoBlock as InfoBlockProps } from '@/payload-types'
import type { Media } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media as MediaComponent } from '@/components/Media'

type Props = InfoBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const InfoBlock: React.FC<Props> = ({
  image,
  bannerText,
  links,
  title,
  listItems,
  className,
}) => {
  const imageResource = typeof image === 'object' && image ? (image as Media) : null
  const buttonLink = links?.[0]?.link
  const items = Array.isArray(listItems) ? listItems : []

  return (
    <section
      className={`vertically section section--bg-secondary section--rouded-bottom ${className ?? ''}`.trim()}
    >
      <div className="container">
        <div className="vertically__inner">
          <div className="vertically__left">
            {imageResource && (
              <MediaComponent
                resource={imageResource}
                pictureClassName="vertically__picture"
                imgClassName="vertically__img"
              />
            )}
            <div className="vertically-banner">
              {bannerText && (
                <p className="vertically-banner__text">{bannerText}</p>
              )}
              {buttonLink && (
                <CMSLink
                  {...buttonLink}
                  className="button button--blue vertically__button"
                  appearance="default"
                />
              )}
            </div>
          </div>
          <div className="vertically__right">
            {title && <h2 className="vertically__title">{title}</h2>}
            <div className="vertically__list">
              <ul>
                {items.map((entry, i) => (
                  <li key={entry.id ?? i}>{entry.item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
