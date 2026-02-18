import React, { Fragment } from 'react'

import type { Page, Post, Service } from '@/payload-types'

import { AboutBlock } from '@/blocks/About/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
// import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MainHero } from '@/blocks/MainHero/Component'
import { ServicesBlock } from '@/blocks/Services/Component'
import { ContactFormBlock } from '@/blocks/ContactForm/Component'
import { InfoBlock } from '@/blocks/Info/Component'
import { NewsGridBlock } from '@/blocks/NewsGrid/Component'
import { NewsPreviewBlock } from '@/blocks/NewsPreview/Component'
import { SliderBlock } from '@/blocks/Slider/Component'
import { TextBannerBlock } from '@/blocks/TextBanner/Component'
import { TopImageBlock } from '@/blocks/TopImageBlock/Component'

const blockComponents = {
  about: AboutBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  // formBlock: FormBlock,
  contactForm: ContactFormBlock,
  info: InfoBlock,
  mediaBlock: MediaBlock,
  mainHero: MainHero,
  newsGrid: NewsGridBlock,
  newsPreview: NewsPreviewBlock,
  services: ServicesBlock,
  slider: SliderBlock,
  textBanner: TextBannerBlock,
  topImageBlock: TopImageBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'] | Service['layout'] | Post['layout']
  searchParams?: { [key: string]: string | string[] | undefined }
  pathname?: string
}> = (props) => {
  const { blocks, searchParams, pathname } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <Fragment key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block
                    {...block}
                    disableInnerContainer
                    searchParams={searchParams}
                    pathname={pathname}
                  />
                </Fragment>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
