import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { Icon } from '@/components/Icon'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const companyName = footerData?.companyName ?? 'Company name'
  const email = footerData?.email ?? 'example@example.com'
  const address = footerData?.address ?? '123 Main St, Anytown, USA'
  const addressUrl = footerData?.addressUrl ?? ''
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__intentify">
            <Link className="footer__logo" href="/">
              <Icon name="icon-logo" width={132} height={30} className="footer__icon" />
            </Link>
            <p className="footer__rules">©{currentYear} All rights reserved</p>
          </div>
          <div className="footer__connection">
            {address &&
              (addressUrl ? (
                <a
                  className="underline footer__contact"
                  href={addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                </a>
              ) : (
                <span className="footer__contact">{address}</span>
              ))}
            {companyName && <span className="footer__contact">{companyName}</span>}
            {email && (
              <a className="underline footer__contact" href={`mailto:${email}`}>
                {email}
              </a>
            )}
          </div>
          <div className="footer__copyright">
            {navItems.length > 0 ? (
              navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="footer__policy underline"
                  appearance="link"
                />
              ))
            ) : (
              <>
                <Link className="footer__policy underline" href="/cookies">
                  Cookies Policy
                </Link>
                <Link className="footer__policy underline" href="/terms">
                  Terms of Business
                </Link>
                <Link className="footer__policy underline" href="/policy">
                  Privacy Policy
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
