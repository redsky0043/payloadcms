import React from 'react'

import type { TopImageBlock as TopImageBlockProps } from '@/payload-types'
import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

type Props = TopImageBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const TopImageBlock: React.FC<Props> = ({ image, className }) => {
  const imageResource =
    typeof image === 'object' && image ? (image as Media) : null

  return (
    <section className={`top-block ${className ?? ''}`.trim()}>
      {imageResource ? (
        <MediaComponent
          resource={imageResource}
          pictureClassName=""
          imgClassName="top-block__img"
        />
      ) : (
        <picture>
          <img
            className="top-block__img"
            src="/img/feedback_bg.jpg"
            alt=""
          />
        </picture>
      )}
    </section>
  )
}
