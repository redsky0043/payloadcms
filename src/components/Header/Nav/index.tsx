'use client'

import React from 'react'

import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

type Props = {
  data: HeaderType
  services?: { slug: string; title: string }[]
}

export const HeaderNav: React.FC<Props> = ({ data, services = [] }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((navItem, i) => {
          const useServicesDropdown = navItem?.dropdownSource === 'services'
          const hasManualSubItems = navItem.subItems && navItem.subItems.length > 0
          const hasServices = useServicesDropdown && services.length > 0
          const hasSubItems = hasManualSubItems || hasServices
          const hasLink = navItem.link?.reference || navItem.link?.url

          if (hasSubItems) {
            return (
              <li key={i} className="underline nav__item">
                <span className="nav__link nav__link--dropdown">
                  {navItem.link?.label}
                </span>

                <div className="nav__dropdown">
                  {useServicesDropdown && hasServices
                    ? services.map((svc, j) => (
                        <div key={j} className="nav__dropdown__item underline">
                          <Link href={`/services/${svc.slug}`} className="block">
                            {svc.title}
                          </Link>
                        </div>
                      ))
                    : navItem.subItems?.map((subItem, j) => (
                        <div key={j} className="nav__dropdown__item underline">
                          <CMSLink {...subItem.link} appearance="link" className="block" />
                        </div>
                      ))}
                </div>
              </li>
            )
          }

          return (
            <li key={i} className="underline nav__item">
              <CMSLink key={i} {...navItem.link} className="nav__link" appearance="link" />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
