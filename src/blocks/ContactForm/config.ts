import type { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  labels: {
    singular: 'Contact form',
    plural: 'Contact forms',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
      defaultValue: 'Do you want to optimize your business success?',
    },
    {
      name: 'successTitle',
      type: 'text',
      label: 'Success title',
      defaultValue: 'Thank you for your interest',
    },
    {
      name: 'successSubtitle',
      type: 'text',
      label: 'Success subtitle',
      defaultValue: 'Our team will contact you shortly.',
    },
    {
      name: 'loadingTitle',
      type: 'text',
      label: 'Loading title',
      defaultValue: 'Your application is being sent...',
    },
    {
      name: 'errorTitle',
      type: 'text',
      label: 'Error title',
      defaultValue: 'Something went wrong',
    },
    {
      name: 'errorSubtitle',
      type: 'text',
      label: 'Error subtitle',
      defaultValue: 'Sorry, please try submitting the form later.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button text',
      defaultValue: 'Send',
    },
    {
      name: 'termsUrl',
      type: 'text',
      label: 'Terms of use URL',
      defaultValue: '/terms-of-use',
    },
    {
      name: 'privacyUrl',
      type: 'text',
      label: 'Privacy policy URL',
      defaultValue: '/privacy-policy',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      admin: {
        description: 'Image behind the form (e.g. contact-form__bg)',
      },
    },
  ],
}
