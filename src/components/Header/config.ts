import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  lockDocuments: false, // Disable document locking
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
          overrides: {
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'type',
                    type: 'radio',
                    admin: {
                      layout: 'horizontal',
                      width: '50%',
                    },
                    defaultValue: 'reference',
                    options: [
                      {
                        label: 'Internal link',
                        value: 'reference',
                      },
                      {
                        label: 'Custom URL',
                        value: 'custom',
                      },
                    ],
                  },
                  {
                    name: 'newTab',
                    type: 'checkbox',
                    admin: {
                      style: {
                        alignSelf: 'flex-end',
                      },
                      width: '50%',
                    },
                    label: 'Open in new tab',
                  },
                ],
              },
              {
                type: 'row',
                fields: [
                  {
                    name: 'reference',
                    type: 'relationship',
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === 'reference',
                      width: '50%',
                    },
                    label: 'Document to link to',
                    relationTo: ['pages', 'posts', 'services'],
                    required: false,
                  },
                  {
                    name: 'url',
                    type: 'text',
                    admin: {
                      condition: (_, siblingData) => siblingData?.type === 'custom',
                      width: '50%',
                    },
                    label: 'Custom URL',
                    required: false,
                  },
                  {
                    name: 'label',
                    type: 'text',
                    admin: {
                      width: '50%',
                    },
                    label: 'Label',
                    required: true,
                  },
                ],
              },
            ],
          },
        }),
        {
          name: 'dropdownSource',
          type: 'select',
          label: 'Dropdown source',
          defaultValue: 'manual',
          options: [
            { label: 'Manual (sub items below)', value: 'manual' },
            { label: 'Services collection', value: 'services' },
          ],
          admin: {
            description: "Use 'Services collection' to auto-populate dropdown from Services",
          },
        },
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub Menu Items',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            description: 'Add sub-menu items (used when Dropdown source is Manual)',
            condition: (_, siblingData) => siblingData?.dropdownSource !== 'services',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
