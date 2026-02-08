'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
// import "./Nav.scss"

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((navItem, i) => {
          const hasSubItems = navItem.subItems && navItem.subItems.length > 0
          const hasLink = navItem.link?.reference || navItem.link?.url

          if (hasSubItems) {
            return (
              <li key={i} className="underline nav__item">
                <span className="nav__link nav__link--dropdown">
                  {navItem.link?.label}
                </span>
                
                <div className="nav__dropdown">
                  {navItem.subItems?.map((subItem, j) => (
                    <div key={j} className="nav__dropdown__item underline">
                      <CMSLink {...subItem.link} appearance="link" className="block" />
                    </div>
                  ))}
                </div>
              </li>
            )
          }

          // Regular link without dropdown
          return (
            <li key={i} className="underline nav__item">
              <CMSLink key={i} {...navItem.link} className='nav__link' appearance="link" />
            </li>
          )
          
        })}
      </ul>
    </nav>
  )
}
