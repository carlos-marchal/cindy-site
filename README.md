This is a personal portfolio site for Cindy Adames. The website is built with Next.js, which fetches all data at build time from Sanity.io, a headless CMS with very flexible customization options.

## Project requirements

- As it is a designer's portfolio, the site must be easily editable by a non technical person. It was also necessary to choose a CMS that allowed easy customization, to adapt inputs and schemas to the various types of pages and sections. For these reasons, we used [Sanity.io](https://www.sanity.io/get-started/1), which is fully customizable through code. All code related to CMS configuration is inside the `sanity-studio` directory.

- The content is highly visual, with several large images per page in the showcase section. The original images are in 4K or more. It was necessary to find a way to serve these images efficiently and at appropriate sizes, without requiring the editor to have to painstakingly manipulate or resize images. To this end, we leveraged both Sanity's image conversion API and Next.js' image component. Integrating both with a custom loader generates images with source sets appropriate for all common screen sizes. Sanity's API also detects Webp support and uses it when possible. This, combined with Next.js' lazy loading, makes pages with tens of MB of master images have an initial load size of ~100kb without apparent quality loss.

- On top of image loading time, it is also a priority to have the lowest loading time possible for the site itself. This is achieved using server side rendering with fully static generation. All pages are prerendered at built time, so that requests simply have to serve the pregenerated HTML. Sanity's editor has been configured to allow triggering of new builds of the site by the editor when a new version needs to be published.

- As the site is statically generated, there has to be a way to preview changes while editing without having to run, and wait for, an expensive rebuild. We use Next.js' preview mode for this. Using a special route and a secret token, it tells the server to bypass the staticlly generated files, and fetch new drafts at request time. Then on the client side, we start a connection to Sanity to get live updates on the documents. This effectively gives the editor the impression that they are editing the site live, even though the changes won't be published to other users until a deploy is triggered.

- There are several parts of the site with custom animations (index page, about page...) These needed to be performant and work at 60fps, even when linked to user events such as scroll. To achieve this, we chose Framer Motion, an animation library for React that precomputes as much of the animations as it can into CSS keyframes. It then updates styles outside the React rendering cycle, allowing smooth visuals even for fully JavaScript driven animations.

## Developing

There are two components to the site. The first is the Next.js project itself, at the root of the repository, which runs the main site. Packages at this level are managed using npm. To install them, run `npm install` and then to start the development version of the site run `npm run dev`. The following environment variables need to be set:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: The ID of the Sanity project to fetch data from
- `NEXT_PUBLIC_SANITY_DATASET`: The name of the Sanity dataset to fetch data from
- `SANITY_API_TOKEN`: A Sanity API token allowing full read access to the Sanity dataset
- `SANITY_PREVIEW_SECRET`: An arbitrary secret to allow enabling preview mode (must match the one set in Sanity Studio)

The second component is Sanity Studio, inside the `sanity-studio` directory. Packages at this level are managed using Sanity's own tooling. Run `npx -p @sanity/cli sanity install` to execute Sanity's install script, and then `npm start` to start the development version of the editor. The following environment variables need to be set:

- `SANITY_STUDIO_API_PROJECT_ID`: The ID of the Sanity project to edit data from
- `SANITY_STUDIO_API_DATASET`: The name of the Sanity dataset to edit data from
- `SANITY_STUDIO_PREVIEW_SECRET`: An arbitrary secret to allow enabling preview mode (must match the one set in Next.js)
- `SANITY_STUDIO_PRODUCTION_URL`: The URL of the main site when in production

## Building and deploying

The site is fully built using continuous integration. The main site is deployed on Vercel. The Sanity editor is deployed to Sanity's cloud using a custom Github action, only when changes to files inside the `sanity-studio` directory are detected.
