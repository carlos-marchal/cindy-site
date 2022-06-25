export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      type: "string",
      name: "name",
      validation: (Rule) => Rule.required(),
    },
  ],
};
