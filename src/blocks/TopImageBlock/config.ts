import type { Block } from 'payload'

export const TopImageBlock: Block = {
  slug: 'topImageBlock',
  interfaceName: 'TopImageBlock',
  labels: {
    singular: 'Top image block',
    plural: 'Top image blocks',
  },
  imageURL: '/block-previews/top-image-block.png',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
  ],
}
