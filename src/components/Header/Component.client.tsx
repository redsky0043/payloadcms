'use client'

import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Icon } from '@/components/Icon'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
  services?: { slug: string; title: string }[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, services = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])

  useEffect(() => {
    if (!menuOpen) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onEscape)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onEscape)
    }
  }, [menuOpen, closeMenu])

  return (
    <header className={`header${menuOpen ? ' is-menu-opened' : ''}`}>
      <div className="container">
        <div
          className="header__backdrop"
          role="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={closeMenu}
          onKeyDown={(e) => e.key === 'Enter' && closeMenu()}
        />
        <div className="header__overlay" />
        <div className="header__wrapper">
          <Link href="/" className="header__logo" onClick={closeMenu}>
            <Icon name="icon-logo" width={132} height={30} className="header__img" />
          </Link>
          <div className="header__nav">
            <HeaderNav data={data} services={services} />
          </div>
          <Link className="header__button button--header button" href="#contacts">
            Send a request
          </Link>
          <div className="header__burger">
            <button
              type="button"
              className={`hamburger${menuOpen ? ' is-active' : ''}`}
              id="hamburger"
              aria-label={menuOpen ? 'close menu' : 'open menu'}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              <svg className="hamburger__cross" viewBox="0 0 100 100">
                <path className="hamburger__line hamburger__line--first" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path className="hamburger__line hamburger__line--second" d="M 20,50 H 80" />
                <path className="hamburger__line hamburger__line--third" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
              </svg>
            </button>
          </div>
          <div className="scroll-bar header__scrollbar">
            <div className="scroll-bar__line" />
          </div>
        </div>
        <div className="mobile-navigation">
          <div className="mobile-navigation__wrapper">
            <div className="mobile-navigation__nav">
              <HeaderNav
                data={data}
                services={services}
                className="nav--mobile"
                onNavigate={closeMenu}
              />
            </div>
            <Link
              className="header__button button--header button"
              href="#contacts"
              onClick={closeMenu}
            >
              Send a request
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
