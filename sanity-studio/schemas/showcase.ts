import { defineType, defineField, defineArrayMember } from 'sanity'
import { toPlainText } from '@portabletext/toolkit'
import {
  ImageIcon,
  VideoIcon,
  TextIcon,
  HighlightIcon,
  ImagesIcon,
  StackIcon,
} from '@sanity/icons'
import { textConfig } from './text-config.jsx'
import { MultiThumbPreview } from './section-preview'

const captionField = {
  name: 'caption',
  title: 'Caption',
  type: 'string' as const,
  options: { isHighlighted: true },
}

const captionedImage = (name = 'image') =>
  defineField({
    type: 'image',
    name,
    fields: [captionField],
    validation: (Rule) => Rule.required().assetRequired(),
  })

const muxVideo = (name = 'video') =>
  defineField({
    type: 'mux.video',
    name,
    title: 'Video',
    validation: (Rule) => Rule.required().assetRequired(),
  })

const richText = (name = 'content') =>
  defineField({ name, type: 'array', of: textConfig })

const modeField = defineField({
  type: 'string',
  name: 'mode',
  options: { list: ['full', 'left', 'right', 'poster'], layout: 'radio' },
  validation: (Rule) => Rule.required(),
})

const galleryContent = defineField({
  type: 'array',
  name: 'content',
  options: { layout: 'grid' },
  validation: (Rule) => Rule.required(),
  of: [
    defineArrayMember({
      type: 'image',
      fields: [captionField],
      validation: (Rule) => Rule.assetRequired(),
    }),
    defineArrayMember({
      type: 'mux.video',
      title: 'Video',
      validation: (Rule) => Rule.assetRequired(),
    }),
  ],
})

const truncate = (s: string, n = 80) => (s.length > n ? s.slice(0, n) + '…' : s)

const richTextTitle = (content: unknown, fallback: string) => {
  if (!Array.isArray(content) || !content.length) return fallback
  const plain = toPlainText(content).trim()
  return plain ? truncate(plain) : fallback
}

const multiThumb = { preview: MultiThumbPreview as never }

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
    captionedImage('cover'),
    defineField({
      type: 'array',
      name: 'sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'intro',
          icon: ImageIcon,
          fields: [
            captionedImage(),
            defineField({
              type: 'string',
              name: 'title',
              validation: (Rule) => Rule.required(),
            }),
            richText(),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare: ({ title, media }) => ({
              title: title || 'Introduction',
              subtitle: 'Introduction · Image',
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'intro_video',
          icon: VideoIcon,
          fields: [
            muxVideo(),
            defineField({
              type: 'string',
              name: 'title',
              validation: (Rule) => Rule.required(),
            }),
            richText(),
          ],
          preview: {
            select: { title: 'title', media: 'video' },
            prepare: ({ title, media }) => ({
              title: title || 'Introduction',
              subtitle: 'Introduction · Video',
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'text_section',
          icon: TextIcon,
          fields: [richText()],
          preview: {
            select: { content: 'content' },
            prepare: ({ content }) => ({
              title: richTextTitle(content, 'Text block'),
              subtitle: 'Text',
              media: TextIcon,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          icon: HighlightIcon,
          fields: [captionedImage(), richText()],
          preview: {
            select: { content: 'content', media: 'image' },
            prepare: ({ content, media }) => ({
              title: richTextTitle(content, 'Highlight'),
              subtitle: 'Highlight · Image',
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'highlight_video',
          icon: HighlightIcon,
          fields: [muxVideo(), richText()],
          preview: {
            select: { content: 'content', media: 'video' },
            prepare: ({ content, media }) => ({
              title: richTextTitle(content, 'Highlight'),
              subtitle: 'Highlight · Video',
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'picture',
          icon: ImageIcon,
          fields: [captionedImage(), modeField],
          preview: {
            select: { media: 'image', mode: 'mode', caption: 'image.caption' },
            prepare: ({ media, mode, caption }) => ({
              title: caption || 'Picture',
              subtitle: `Picture · Image${mode ? ` · ${mode}` : ''}`,
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'picture_video',
          icon: VideoIcon,
          fields: [muxVideo(), modeField],
          preview: {
            select: { media: 'video', mode: 'mode' },
            prepare: ({ media, mode }) => ({
              title: 'Picture',
              subtitle: `Picture · Video${mode ? ` · ${mode}` : ''}`,
              media,
            }),
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'gallery',
          icon: ImagesIcon,
          fields: [galleryContent],
          preview: {
            select: { items: 'content' },
            prepare: ({ items }) => ({ title: 'Gallery', items }),
          },
          components: multiThumb,
        }),
        defineArrayMember({
          type: 'object',
          name: 'caroussel',
          icon: StackIcon,
          fields: [richText('intro'), galleryContent],
          preview: {
            select: { items: 'content' },
            prepare: ({ items }) => ({ title: 'Caroussel', items }),
          },
          components: multiThumb,
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
