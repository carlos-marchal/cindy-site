import { defineType, defineField } from 'sanity'
import { textConfig } from './text-config.jsx'

export default defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'content',
      of: textConfig,
      validation: (Rule) => Rule.unique(),
    }),
  ],
})
