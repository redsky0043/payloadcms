import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const Info: Block = {
  slug: 'info',
  interfaceName: 'InfoBlock',
  labels: {
    singular: 'Info',
    plural: 'Info',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
      admin: {
        description: 'Image on the left side',
      },
    },
    {
      name: 'bannerText',
      type: 'textarea',
      label: 'Banner text',
      required: true,
      admin: {
        description: 'Text above the button',
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 1,
        admin: {
          description: 'Button link (e.g. "Learn More")',
        },
      },
    }),
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Practice Areas',
      admin: {
        description: 'Heading on the right side',
      },
    },
    {
      name: 'listItems',
      type: 'array',
      label: 'List items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Item',
          required: true,
        },
      ],
      admin: {
        description: 'List items for the right column',
      },
    },
  ],
}
