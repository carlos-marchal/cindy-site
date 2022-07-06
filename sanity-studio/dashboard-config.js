export default {
  widgets: [
    {
      name: "netlify",
      options: {
        title: "Deploy to Netlify",
        sites: [
          {
            title: "Website",
            apiId: process.env.SANITY_STUDIO_NETLIFY_SITE_ID,
            buildHookId: process.env.SANITY_STUDIO_NETLIFY_WEBHOOK_ID,
            url: process.env.SANITY_STUDIO_PRODUCTION_URL,
          },
        ],
      },
    },
  ],
};
