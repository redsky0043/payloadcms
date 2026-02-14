import * as yup from 'yup'

export const contactFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  message: yup.string().required('Message is required'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms'),
})

export type ContactFormData = yup.InferType<typeof contactFormSchema>

export default contactFormSchema
