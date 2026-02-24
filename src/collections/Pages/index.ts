import type { CollectionConfig } from 'payload'

import {
  BlockquoteFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnorderedListFeature,
  UploadFeature,
  AlignFeature,
  IndentFeature,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { About } from '../../blocks/About/config'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
// import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { MainHero } from '../../blocks/MainHero/config'
import { Services } from '../../blocks/Services/config'
import { Info } from '../../blocks/Info/config'
import { ContactForm } from '../../blocks/ContactForm/config'
import { NewsGrid } from '../../blocks/NewsGrid/config'
import { NewsPreview } from '../../blocks/NewsPreview/config'
import { Slider } from '../../blocks/Slider/config'
import { TextBanner } from '../../blocks/TextBanner/config'
import { TopImageBlock } from '../../blocks/TopImageBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  lockDocuments: false, // Disable document locking to avoid locked_documents table issues
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (data) => Boolean(data?.useArticleLayout),
                description: 'Main image at the top. Falls back to SEO image if empty.',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature(),
                  AlignFeature(),
                  IndentFeature(),
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  ChecklistFeature(),
                  BlockquoteFeature(),
                  HorizontalRuleFeature(),
                  InlineCodeFeature(),
                  StrikethroughFeature(),
                  SubscriptFeature(),
                  SuperscriptFeature(),
                  UploadFeature(),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  EXPERIMENTAL_TableFeature(),
                ],
              }),
              admin: {
                condition: (data) => Boolean(data?.useArticleLayout),
                description: 'Article body. Headings (h2) are used for the table of contents.',
              },
            },
            {
              name: 'articleTag',
              type: 'text',
              admin: {
                condition: (data) => Boolean(data?.useArticleLayout),
                description: 'Optional label next to the title (e.g. "Careers", "Job openings").',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [MainHero, TopImageBlock, About, Services, Slider, Info, NewsPreview, NewsGrid, ContactForm, CallToAction, Content, MediaBlock, TextBanner, Archive /*, FormBlock */],
              admin: {
                initCollapsed: true,
                description: 'When Article layout is enabled, these blocks are shown below the article content. Otherwise they are the main page content.',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField,
    {
      name: 'useArticleLayout',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show this page as an article: title, hero image, table of contents, and rich text content (like a blog post).',
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
