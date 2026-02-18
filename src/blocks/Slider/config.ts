import type { Block } from 'payload'

export const Slider: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  labels: {
    singular: 'Slider',
    plural: 'Sliders',
  },
  imageURL: '/block-previews/slider.png',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
      defaultValue: 'Why Choose MARILEX?',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'about',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
      ],
      admin: {
        description: 'Slider items with title, description and image.',
      },
    },
  ],
}
