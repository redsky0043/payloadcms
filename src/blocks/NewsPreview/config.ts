import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const NewsPreview: Block = {
  slug: 'newsPreview',
  interfaceName: 'NewsPreviewBlock',
  labels: {
    singular: 'News preview',
    plural: 'News preview',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Headline',
      required: true,
      defaultValue: 'News and blog',
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 1,
        admin: {
          description: 'Link for "All news" (e.g. to /posts)',
        },
      },
    }),
  ],
}
