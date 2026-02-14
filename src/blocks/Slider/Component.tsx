'use client'

import React, { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Navigation } from 'swiper/modules'
import type { SliderBlock as SliderBlockProps } from '@/payload-types'
import type { Media } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'

import 'swiper/css'
import 'swiper/css/effect-cards'
import 'swiper/css/navigation'

type Props = SliderBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const SliderBlock: React.FC<Props> = ({
  headline,
  slides,
  className,
}) => {
  const actionRef = useRef<HTMLButtonElement>(null)
  const total = Array.isArray(slides) ? slides.length : 0

  if (!total) return null

  return (
    <section
      className={`slider ${className ?? ''}`.trim()}
      id="why"
    >
      <div className="container">
        <h2 className="h2 slider__headline">{headline}</h2>
          <Swiper
            loop
            grabCursor
            speed={1000}
            effect="cards"
            spaceBetween={50}
            slidesPerView={1}
            cardsEffect={{
              rotate: false,
              perSlideOffset: 6,
              slideShadows: false,
            }}
            modules={[EffectCards, Navigation]}
            className="slider__gallery"
            navigation={{
              nextEl: '.slider__action',
            }}
            breakpoints={{
              1440: {
                grabCursor: false,
                touchRatio: 3,
                cardsEffect: {
                  perSlideOffset: 8,
                },
                navigation: {
                  nextEl: '.slider__gallery',
                },
              },
            }}
            onSlideChangeTransitionStart={() => {
              actionRef.current?.classList.add('is-pressed')
            }}
            onSlideChangeTransitionEnd={() => {
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
            className="circle slider__action"
            aria-label="Next slide"
          >
            <div className="circle__wrapper">Next</div>
          </button>
      </div>
    </section>
  )
}
