import type { Field } from 'payload'
import { formatSlug } from '../utilities/formatSlug' 

export const slugField: Field = {
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL-адреса сторінки (генерується автоматично з заголовка)',
  },
  hooks: {
    beforeValidate: [
      formatSlug('title'),
    ],
  },
}