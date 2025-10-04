import { defineType, defineField, defineArrayMember } from 'sanity'
import { textConfig } from './text-config.jsx'

export default defineType({
  name: 'showcase',
  title: 'Showcase',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'string',
      name: 'description',
      validation: (Rule) => Rule.required().min(25).max(140),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'reference',
      name: 'category',
      to: [{ type: 'category' }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'cover',
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
      name: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'intro',
          fields: [
            defineField({
              type: 'image',
              name: 'image',
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
              type: 'string',
              name: 'title',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              type: 'array',
              of: textConfig,
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare: ({ title, media }) => ({
              title: `Introduction: ${title}`,
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'text_section',
          fields: [
            defineField({
              name: 'content',
              type: 'array',
              of: textConfig,
            }),
          ],
          preview: {
            select: { content: 'content.0.children.0.text' },
            prepare: ({ content }) => ({
              title: `Text: ${content.slice(0, 100)}...`,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({
              type: 'image',
              name: 'image',
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
              name: 'content',
              type: 'array',
              of: textConfig,
            }),
          ],
          preview: {
            select: { content: 'content.0.children.0.text', media: 'image' },
            prepare: ({ content, media }) => ({
              title: `Highlight: ${content}`,
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'picture',
          fields: [
            defineField({
              type: 'image',
              name: 'image',
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
              type: 'string',
              name: 'mode',
              options: {
                list: ['full', 'left', 'right', 'poster'],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { media: 'image' },
            prepare: ({ media }) => ({ title: `Picture`, media }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'gallery',
          fields: [
            defineField({
              type: 'array',
              name: 'content',
              options: { layout: 'grid' },
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: 'image',
                  name: 'image',
                  fields: [
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                      options: { isHighlighted: true },
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                },
              ],
            }),
          ],
          preview: {
            prepare: () => ({
              title: 'Gallery',
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'caroussel',
          fields: [
            defineField({
              name: 'intro',
              type: 'array',
              of: textConfig,
            }),
            defineField({
              type: 'array',
              name: 'content',
              options: { layout: 'grid' },
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: 'image',
                  name: 'image',
                  fields: [
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                      options: { isHighlighted: true },
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                },
              ],
            }),
          ],
          preview: {
            prepare: () => ({
              title: 'Caroussel',
            }),
          },
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'related',
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
