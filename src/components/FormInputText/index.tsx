import type { FC } from 'react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export interface FormInputTextProps {
  name: string
  label: string
  checkbox?: boolean
  type?: string
  helperText?: string | unknown
  rows?: number | null
  restProps?: Record<string, unknown>
  disabled?: boolean
  multiline?: boolean
}

export const FormInputText: FC<FormInputTextProps> = ({
  name,
  label,
  helperText,
  rows = null,
  checkbox = false,
  type = 'text',
  disabled = false,
  multiline = false,
  restProps = {},
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field, fieldState }) => (
        <>
          {fieldState.error && (
            <span className="textfield__error">{fieldState.error.message}</span>
          )}
          {(multiline || (rows != null && rows > 0)) ? (
            <textarea
              {...restProps}
              rows={rows ?? 3}
              placeholder=" "
              disabled={disabled}
              value={field.value}
              className={`textfield__input ${fieldState.error ? 'has-error' : ''}`}
              onChange={(e) => field.onChange(e.target.value)}
            />
          ) : (
            <input
              type={type}
              {...restProps}
              placeholder=" "
              disabled={disabled}
              value={field.value}
              className={`textfield__input ${fieldState.error ? 'has-error' : ''}`}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
          <span className="textfield__label">{label}</span>
        </>
      )}
    />
  )
}

export default FormInputText
