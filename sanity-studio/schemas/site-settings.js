export default {
  name: "site_settings",
  type: "document",
  fields: [
    {
      name: "title_prefix",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              type: "string",
              name: "name",
              validation: (Rule) => Rule.required(),
            },
            {
              type: "string",
              name: "path",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
