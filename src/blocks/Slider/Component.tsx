'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'

import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { EffectCards, Navigation } from 'swiper/modules'
import type { SliderBlock as SliderBlockProps } from '@/payload-types'
import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'

const DESKTOP_BREAKPOINT_PX = 1440
/** 0–1: чим менше, тим плавніше і більше відставання від курсора */
const CURSOR_FOLLOW_LERP = 0.14

type Props = SliderBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const SliderBlock: React.FC<Props> = ({
  headline,
  slides,
  className,
}) => {
  const swiperRef = useRef<SwiperRef | null>(null)
  const actionRef = useRef<HTMLButtonElement>(null)
  const galleryWrapperRef = useRef<HTMLDivElement | null>(null)
  const cursorPosRef = useRef<{ x: number; y: number } | null>(null)
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null)
  const [displayPos, setDisplayPos] = useState<{ x: number; y: number } | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`)
    const handler = () => setIsDesktop(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const total = Array.isArray(slides) ? slides.length : 0

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktop || !galleryWrapperRef.current) return
      const rect = galleryWrapperRef.current.getBoundingClientRect()
      const next = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      cursorPosRef.current = next
      setCursorPos(next)
    },
    [isDesktop],
  )

  const handleMouseLeave = useCallback(() => {
    cursorPosRef.current = null
    setCursorPos(null)
  }, [])

  const goNext = () => {
    if (isTransitioning) return
    swiperRef.current?.swiper?.slideNext()
  }

  const followCursor = isDesktop && cursorPos !== null

  useEffect(() => {
    if (!followCursor) return
    let rafId: number
    const tick = () => {
      const target = cursorPosRef.current
      if (!target) return
      setDisplayPos((prev) => {
        if (prev === null) return target
        const x = prev.x + (target.x - prev.x) * CURSOR_FOLLOW_LERP
        const y = prev.y + (target.y - prev.y) * CURSOR_FOLLOW_LERP
        return { x, y }
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [followCursor])

  if (!total) return null

  return (
    <section
      className={`slider ${className ?? ''}`.trim()}
      id="why"
    >
      <div className="container">
        <h2 className="h2 slider__headline">{headline}</h2>
        <div
          ref={galleryWrapperRef}
          className="slider__gallery-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={goNext}
          style={{ position: 'relative' }}
        >
          <Swiper
            loop
            grabCursor
            speed={1000}
            effect="cards"
            ref={swiperRef}
            spaceBetween={50}
            slidesPerView={1}
            cardsEffect={{
              rotate: false,
              perSlideOffset: 6,
              slideShadows: false,
            }}
            className="slider__gallery"
            modules={[EffectCards, Navigation]}
            breakpoints={{
              1440: {
                grabCursor: false,
                touchRatio: 3,
                cardsEffect: {
                  perSlideOffset: 8,
                },
              },
            }}
            onSlideChangeTransitionStart={() => {
              setIsTransitioning(true)
              actionRef.current?.classList.add('is-pressed')
            }}
            onSlideChangeTransitionEnd={() => {
              setIsTransitioning(false)
              actionRef.current?.classList.remove('is-pressed')
            }}
          >
            {(slides ?? []).map((slide, i) => {
              const image =
                typeof slide.image === 'object' && slide.image
                  ? (slide.image as Media)
                  : null
              return (
                <SwiperSlide key={slide.id ?? i} className="slider__item">
                  <div className="slider__text">
                    <div className="slider__counter">
                      {i + 1}/{total}
                    </div>
                    <p className="slider__title">{slide.title || 'Default title'}</p>
                    <p className="slider__about">{slide.about || 'Default description'}</p>
                  </div>
                  {image && (
                    <MediaComponent
                      resource={image}
                      pictureClassName="slider__picture"
                      imgClassName="slider__img"
                    />
                  )}
                </SwiperSlide>
              )
            })}
          </Swiper>
          <button
            ref={actionRef}
            type="button"
            className={`circle slider__action${displayPos ? ' circle--moved' : ''}${followCursor ? ' is-focused' : ''}`}
            aria-label="Next slide"
            onTransitionEnd={(e) => {
              if (e.propertyName === 'transform' && !followCursor) {
                setDisplayPos(null)
              }
            }}
            style={
              displayPos
                ? {
                    position: 'absolute',
                    left: displayPos.x,
                    top: displayPos.y,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }
                : { pointerEvents: 'none' }
            }
          >
            <div className="circle__wrapper">Next</div>
          </button>
        </div>
      </div>
    </section>
  )
}
