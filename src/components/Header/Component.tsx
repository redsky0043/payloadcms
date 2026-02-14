import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  const hasServicesDropdown = headerData?.navItems?.some(
    (item) => item?.dropdownSource === 'services',
  )

  let services: { slug: string; title: string }[] = []
  if (hasServicesDropdown) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'services',
      draft: false,
      depth: 0,
      limit: 50,
      overrideAccess: true,
      pagination: false,
      sort: 'title',
      where: {
        _status: { equals: 'published' },
      },
      select: { slug: true, title: true },
    })
    services = (result.docs ?? []).map((d) => ({ slug: d.slug!, title: d.title! }))
  }

  return <HeaderClient data={headerData} services={services} />
}
