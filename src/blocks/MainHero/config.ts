import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const MainHero: Block = {
  slug: 'mainHero',
  interfaceName: 'MainHeroBlock',
  fields: [
    {
        name: 'richText',
        type: 'richText',
        editor: lexicalEditor(),
        label: false,
      },
    {
      name: 'bannerText',   
      type: 'text',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}