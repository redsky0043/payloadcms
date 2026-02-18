import React from 'react'

import type { TextBannerBlock as TextBannerBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'

type Props = TextBannerBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const TextBannerBlock: React.FC<Props> = ({ content, className }) => {
  return (
    <section className={`banner-text ${className ?? ''}`.trim()}>
      <div className="container">
        <div className="banner-text__inner">
          {content && (
            <RichText data={content} enableGutter={false} enableProse={false} />
          )}
        </div>
      </div>
    </section>
  )
}
