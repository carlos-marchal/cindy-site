import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
