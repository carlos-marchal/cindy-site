import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'works',
  title: 'Works Page',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'category_filter',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
          options: { disableNew: true },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      type: 'array',
      name: 'showcases',
      of: [
        {
          type: 'reference',
          to: [{ type: 'showcase' }],
          options: { disableNew: true },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
})
