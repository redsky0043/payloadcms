import React from 'react'

import type { AboutBlock as AboutBlockProps } from '@/payload-types'
import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

type Props = AboutBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const AboutBlock: React.FC<Props> = ({ title, image, className }) => {
  const imageResource =
    typeof image === 'object' && image ? (image as Media) : null

  return (
    <section className={`about ${className ?? ''}`.trim()}>
      <div className="container">
        {title && <h2 className="about__title">{title}</h2>}
      </div>
      <div className="about__picture">
        {imageResource ? (
          <MediaComponent
            resource={imageResource}
            pictureClassName=""
            imgClassName=""
          />
        ) : (
          <picture>
            <img src="/img/feedback_bg.webp" alt="" />
          </picture>
        )}
      </div>
    </section>
  )
}
