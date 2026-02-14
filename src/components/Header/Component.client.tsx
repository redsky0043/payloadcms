'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Icon } from '@/components/Icon'

interface HeaderClientProps {
  data: Header
  services?: { slug: string; title: string }[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, services = [] }) => {
  /* Storing the value in a useState to avoid hydration errors */
  // const [theme, setTheme] = useState<string | null>(null)
  // const { headerTheme, setHeaderTheme } = useHeaderTheme()
  // const pathname = usePathname()

  // useEffect(() => {
  //   setHeaderTheme(null)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname])

  // useEffect(() => {
  //   if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [headerTheme])

  return (
    <header className="header js-header">
      <div className="container">
        <div className="header__overlay js-header-overlay"></div>
        <div className="header__wrapper">
          <Link href="/" className="header__logo">
            <Icon name="icon-logo" width={132} height={30} className="header__img"/>
          </Link>
          <div className="header__nav">
            <HeaderNav data={data} services={services} />
          </div>
          <Link className="header__button button--header button" href="#contacts">
            Send a request
          </Link>
          <div className="header__burger">
            <button className="hamburger js-menu-toggle" id="hamburger" aria-label="open menu">
              <svg className="hamburger__cross" viewBox="0 0 100 100">
                <path className="hamburger__line hamburger__line--first" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path className="hamburger__line hamburger__line--second" d="M 20,50 H 80" />
                <path className="hamburger__line hamburger__line--third" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
              </svg>
            </button>
          </div>
          <div className="scroll-bar header__scrollbar">
            <div className="scroll-bar__line js-scroll-bar"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
