import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { dashboardTool } from '@sanity/dashboard'
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'

// Import schemas
import siteSetting from './schemas/site-settings'
import homePage from './schemas/home'
import worksPage from './schemas/works'
import contactPage from './schemas/contact'
import aboutPage from './schemas/about'
import category from './schemas/category'
import showcase from './schemas/showcase'

// Import structure configuration
import { structure } from './desk-structure'

// Import singletons definition
import { singletons } from './singletons'

const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET
const remoteUrl = process.env.SANITY_STUDIO_PRODUCTION_URL
const localUrl =
  process.env.SANITY_STUDIO_DEVELOPMENT_URL ?? 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'cindy-site',

  projectId: 'oqid2l47',
  dataset: 'production',

  // Lock API version to prevent breaking changes
  // Using current date per Sanity best practices
  apiVersion: '2024-10-02',

  plugins: [
    structureTool({
      structure,
    }),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: 'Deploy to Netlify',
          sites: [
            {
              title: 'Website',
              apiId: process.env.SANITY_STUDIO_NETLIFY_SITE_ID,
              buildHookId: process.env.SANITY_STUDIO_NETLIFY_WEBHOOK_ID,
              url: process.env.SANITY_STUDIO_PRODUCTION_URL,
              name: 'Website',
            },
          ],
        }),
      ],
    }),
    // Only include vision tool in development
    ...(isDev ? [visionTool()] : []),
  ],

  schema: {
    types: [
      siteSetting,
      homePage,
      worksPage,
      category,
      showcase,
      contactPage,
      aboutPage,
    ],
  },

  document: {
    // Migrate singleton document actions from __experimental_actions
    actions: (prev, { schemaType }) => {
      // For singleton documents, only allow update and publish
      if (singletons.has(schemaType)) {
        return prev.filter(({ action }) =>
          ['update', 'publish'].includes(action)
        )
      }
      return prev
    },

    // Prevent creating new singleton documents
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !singletons.has(templateItem.templateId)
        )
      }
      return prev
    },

    // Migrate production URL resolver
    productionUrl: async (prev, context) => {
      const { document } = context
      const baseUrl =
        typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? localUrl
          : remoteUrl

      if (!baseUrl || !secret) {
        return prev
      }

      const previewUrl = new URL(baseUrl)
      previewUrl.pathname = `/api/preview`
      previewUrl.searchParams.append(`secret`, secret)

      let path = ''
      switch (document._type) {
        case 'home':
          path = ''
          break
        case 'works':
          path = 'works'
          break
        case 'showcase':
          path = `works/${(document as any).slug?.current || ''}`
          break
        default:
          return prev
      }

      previewUrl.searchParams.append(`path`, path)
      return previewUrl.toString()
    },
  },
})
