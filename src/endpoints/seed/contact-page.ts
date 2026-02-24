import type { ContactFormBlock } from '@/payload-types'

/** Page data for contact page; layout uses contactForm block (no forms collection). */
export type ContactPageSeedData = {
  slug: string
  _status: 'published'
  title: string
  layout: ContactFormBlock[]
}

export const contact = (): ContactPageSeedData => ({
  slug: 'contact',
  _status: 'published',
  title: 'Contact',
  layout: [
    {
      blockType: 'contactForm',
      headline: "Let's solve your legal and corporate challenges together!",
      successTitle: 'Thank you for your interest',
      successSubtitle: 'Our team will contact you shortly.',
      buttonText: 'Send',
      policyUrl: '/policy',
    },
  ],
})
