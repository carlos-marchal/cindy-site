import { textConfig } from "./text-config";

export default {
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    {
      type: "string",
      name: "title",
      validation: (Rule) => Rule.required(),
    },
    {
      type: "array",
      name: "content",
      of: textConfig,
      validation: (Rule) => Rule.unique(),
    },
  ],
};
