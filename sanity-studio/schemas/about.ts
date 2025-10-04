import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'portrait',
      fields: [
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
          options: { isHighlighted: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'array',
      name: 'entries',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'period',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [],
                  lists: [],
                  marks: {
                    decorators: [{ title: 'Emphasis', value: 'em' }],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
