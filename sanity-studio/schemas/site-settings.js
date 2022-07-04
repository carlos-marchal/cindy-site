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
    {
      name: "contact_information",
      type: "object",
      fields: [
        {
          name: "email",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "phone",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "location",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "linkedin_url",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "instagram_url",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
