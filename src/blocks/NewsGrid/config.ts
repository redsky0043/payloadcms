import type { Block } from 'payload'

export const NewsGrid: Block = {
  slug: 'newsGrid',
  interfaceName: 'NewsGridBlock',
  labels: {
    singular: 'News grid',
    plural: 'News grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'News and blog',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Filter tags',
      admin: {
        description: 'Tags for filtering (e.g. All, News, blog, events)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL',
          required: true,
          admin: {
            description: 'e.g. /posts or /posts?category=news',
          },
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Active by default',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'basePath',
      type: 'text',
      label: 'Base path for pagination',
      defaultValue: '/posts',
      admin: {
        description: 'URL path for pagination links (e.g. /posts or /news)',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Posts per page',
      defaultValue: 9,
      admin: {
        description: 'Number of posts to show per page',
      },
    },
  ],
}
