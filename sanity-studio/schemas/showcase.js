import { textConfig } from "./text-config";

export default {
  name: "showcase",
  title: "Showcase",
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "description",
      validation: (Rule) => Rule.required().min(25).max(140),
    },
    {
      type: "slug",
      name: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      type: "reference",
      name: "category",
      to: [{ type: "category" }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    },
    {
      type: "image",
      name: "cover",
      fields: [
        {
          name: "caption",
          title: "Caption",
          type: "string",
          options: { isHighlighted: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      type: "array",
      name: "sections",
      of: [
        {
          type: "object",
          name: "intro",
          fields: [
            {
              type: "image",
              name: "image",
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  options: { isHighlighted: true },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              type: "array",
              of: textConfig,
            },
          ],
          preview: {
            select: { title: "title", media: "image" },
            prepare: ({ title, media }) => ({
              title: `Introduction: ${title}`,
              media,
            }),
          },
        },
        {
          type: "object",
          name: "text_section",
          fields: [
            {
              name: "content",
              type: "array",
              of: textConfig,
            },
          ],
          preview: {
            select: { content: "content.0.children.0.text" },
            prepare: ({ content }) => ({
              title: `Text: ${content.slice(0, 100)}...`,
            }),
          },
        },
        {
          type: "object",
          name: "highlight",
          fields: [
            {
              type: "image",
              name: "image",
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  options: { isHighlighted: true },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              type: "array",
              of: textConfig,
            },
          ],
          preview: {
            select: { content: "content.0.children.0.text", media: "image" },
            prepare: ({ content, media }) => ({
              title: `Highlight: ${content}`,
              media,
            }),
          },
        },
        {
          type: "object",
          name: "picture",
          fields: [
            {
              type: "image",
              name: "image",
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                  options: { isHighlighted: true },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "mode",
              options: {
                list: ["full", "left", "right", "poster"],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { media: "image" },
            prepare: ({ media }) => ({ title: `Picture`, media }),
          },
        },
        {
          type: "object",
          name: "gallery",
          fields: [
            {
              type: "array",
              name: "content",
              options: { layout: "grid" },
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: "image",
                  name: "image",
                  fields: [
                    {
                      name: "caption",
                      title: "Caption",
                      type: "string",
                      options: { isHighlighted: true },
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            prepare: () => ({
              title: "Gallery",
            }),
          },
        },
        {
          type: "object",
          name: "caroussel",
          fields: [
            {
              name: "intro",
              type: "array",
              of: textConfig,
              validation: (Rule) => Rule.required(),
            },
            {
              type: "array",
              name: "content",
              options: { layout: "grid" },
              validation: (Rule) => Rule.required(),
              of: [
                {
                  type: "image",
                  name: "image",
                  fields: [
                    {
                      name: "caption",
                      title: "Caption",
                      type: "string",
                      options: { isHighlighted: true },
                    },
                  ],
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            prepare: () => ({
              title: "Caroussel",
            }),
          },
        },
      ],
    },
    {
      type: "array",
      name: "related",
      of: [
        {
          type: "reference",
          to: [{ type: "showcase" }],
          options: { disableNew: true },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
};
