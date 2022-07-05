export default {
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "image",
      name: "portrait",
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
      name: "entries",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "period",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [],
                  lists: [],
                  marks: {
                    decorators: [{ title: "Emphasis", value: "em" }],
                    annotations: [],
                  },
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
