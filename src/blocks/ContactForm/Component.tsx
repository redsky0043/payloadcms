'use client'

import React, { useState } from 'react'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

import FormInputText from '@/components/FormInputText'
import contactFormSchema, { type ContactFormData } from './validation'
import type { ContactFormBlock as ContactFormBlockProps } from '@/payload-types'

type Props = ContactFormBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ContactFormBlock: React.FC<Props> = ({
  headline = 'Do you want to optimize your business success?',
  successTitle = 'Thank you for your interest',
  successSubtitle = 'Our team will contact you shortly.',
  loadingTitle = 'Your application is being sent...',
  errorTitle = 'Something went wrong',
  errorSubtitle = 'Sorry, please try submitting the form later.',
  buttonText = 'Send',
  termsUrl = '/terms-of-use',
  privacyUrl = '/privacy-policy',
  className,
}) => {
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const methods = useForm<ContactFormData>({
    mode: 'onChange',
    resolver: yupResolver(contactFormSchema),
  })

  const { handleSubmit, reset, register, formState, setError } = methods
  const { errors } = formState

  const onSubmit: SubmitHandler<ContactFormData> = async (formData) => {
    setLoading(true)
    setIsSuccess(false)
    setIsError(false)

    const formDataToSend = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, String(value ?? ''))
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      setLoading(false)

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          reset()
        }, 5000)
        return
      }

      const data = await response.json()
      if (data.violations && Array.isArray(data.violations)) {
        data.violations.forEach(
          ({ propertyPath, title }: { propertyPath: string; title: string }) => {
            setError(propertyPath as keyof ContactFormData, {
              type: 'custom',
              message: title,
            })
          },
        )
      } else {
        setIsError(true)
        setTimeout(() => setIsError(false), 5000)
      }
    } catch (e) {
      setLoading(false)
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
        reset()
      }, 5000)
      console.error('Contact form error:', e)
    }
  }

  return (
    <FormProvider {...methods}>
      <section className={`contact-form ${className ?? ''}`.trim()} id="contacts">
        <div className="container">
          <div className="contact-form__wrapper">
            <div className="contact-form__bg" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`contact-form__form ${loading ? 'contact-form__form--loading' : ''} ${isError ? 'contact-form__form--failed' : ''} ${isSuccess ? 'contact-form__form--loaded' : ''}`}
            >
              <h3 className="h3 title contact-form__headline">{headline}</h3>
              <div className="contact-form__actions">
                <div className="contact-form__inputs">
                  <label className="textfield">
                    <FormInputText name="name" label="Your name" />
                  </label>
                  <label className="textfield">
                    <FormInputText name="email" label="Email address" />
                  </label>
                  <label className="textfield">
                    <FormInputText
                      type="tel"
                      name="phone"
                      label="Phone number"
                    />
                  </label>
                  <label className="textfield textfield--textarea">
                    <FormInputText rows={3} name="message" label="Your message" />
                  </label>
                </div>
                <label
                  className={`checkbox contact-form__checkbox ${errors.terms ? 'has-error' : ''}`}
                >
                  <input
                    className="checkbox__mark"
                    type="checkbox"
                    {...register('terms')}
                  />
                  <div className="checkbox__text">
                    I agree with{' '}
                    <Link className="underline underline--reverse" href={termsUrl}>
                      Terms of use
                    </Link>{' '}
                    and{' '}
                    <Link className="underline underline--reverse" href={privacyUrl}>
                      Privacy policy
                    </Link>
                  </div>
                </label>
                <button
                  type="submit"
                  className="button button--blue contact-form__button"
                  disabled={loading}
                >
                  {buttonText}
                </button>
              </div>
              <div className="contact-form__running">
                <div className="marquee">
                  <span>
                    Fill out the form and receive prompt assistance. Fill out the
                    form and receive prompt assistance.
                  </span>
                </div>
              </div>
              {isSuccess && (
                <div className="contact-form__status contact-form__status--loaded">
                  🏀
                  <p className="title contact-form__title">{successTitle}</p>
                  <p className="title contact-form__subtitle">
                    {successSubtitle}
                  </p>
                </div>
              )}
              {loading && (
                <div className="contact-form__status contact-form__status--loading">
                  🏃
                  <p className="title contact-form__title">{loadingTitle}</p>
                </div>
              )}
              {isError && (
                <div className="contact-form__status contact-form__status--failed">
                  😩
                  <p className="contact-form__title">{errorTitle}</p>
                  <p className="contact-form__subtitle">{errorSubtitle}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </FormProvider>
  )
}
