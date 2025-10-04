// Note: This file is deprecated in Sanity v3
// Schemas are now imported directly in sanity.config.ts
// This file is kept for reference but is no longer used

import siteSetting from "./site-settings";
import homePage from "./home";
import worksPage from "./works";
import contactPage from "./contact";
import aboutPage from "./about";
import category from "./category";
import showcase from "./showcase";

// Schema types are now defined in sanity.config.ts
export const schemaTypes = [
  siteSetting,
  homePage,
  worksPage,
  category,
  showcase,
  contactPage,
  aboutPage,
];
