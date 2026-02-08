import React from 'react'

import type { IconName } from '@/icons/types'

type IconProps = {
  name: IconName
  width?: number
  height?: number
  className?: string
  'aria-hidden'?: boolean
  'aria-label'?: string
}

/**
 * Icon component using SVG sprite.
 * Add SVG files to src/icons/ and run `pnpm build:icons` to include them.
 *
 * @example
 * <Icon name="icon-arrow" size={24} />
 * <Icon name="icon-chevron-down" className="nav__chevron" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  className,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}) => {
  const sizeStyle = { width: width, height: height }

  return (
    <svg
      className={className}
      style={sizeStyle}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      fill="currentColor"
      stroke="currentColor"
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  )
}
