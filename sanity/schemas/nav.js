export default {
  name: "nav",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "entries",
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
              name: "destination",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
