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
      validation: (Rule) => Rule.required(),
    },
  ],
};
