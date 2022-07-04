export default {
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "main_text",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "string",
      name: "footer",
      validation: (Rule) => Rule.required(),
    },
  ],
};
