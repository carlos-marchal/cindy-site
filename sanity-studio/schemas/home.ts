import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'main_text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'footer',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
