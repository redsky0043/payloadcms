import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TextBanner: Block = {
  slug: 'textBanner',
  interfaceName: 'TextBannerBlock',
  labels: {
    singular: 'Text banner',
    plural: 'Text banners',
  },
  imageURL: '/block-previews/text-banner.png',
  imageAltText: 'Text Banner — текстовий блок з параграфами та списками',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor(),
      required: true,
    },
  ],
}
