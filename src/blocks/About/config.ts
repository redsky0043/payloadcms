import type { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About',
    plural: 'About blocks',
  },
  imageURL: '/block-previews/about.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
  ],
}
