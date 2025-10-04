import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'site_settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title_prefix',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'description',
      validation: (Rule) => Rule.required().min(25).max(140),
    }),
    defineField({
      type: 'image',
      name: 'preview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              type: 'string',
              name: 'name',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              type: 'string',
              name: 'path',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'contact_information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'phone',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'location',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'linkedin_url',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'instagram_url',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
