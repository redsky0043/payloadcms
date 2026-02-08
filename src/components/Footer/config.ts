import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  lockDocuments: false, // Disable document locking
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      defaultValue: 'Company name',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      defaultValue: 'example@example.com',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      defaultValue: '123 Main St, Anytown, USA',
    },
    {
      name: 'addressUrl',
      type: 'text',
      label: 'Address link (Google Maps or other)',
      defaultValue: 'https://maps.app.goo.gl/gosbToQrfQzk9Nod7',
      admin: {
        description: 'Optional. Leave empty to show address as plain text.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
