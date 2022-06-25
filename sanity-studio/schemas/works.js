export default {
  name: "works",
  title: "Works Page",
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "array",
      name: "category_filter",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
          options: { disableNew: true },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
};
