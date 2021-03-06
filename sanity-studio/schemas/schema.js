import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import siteSetting from "./site-settings";
import homePage from "./home";
import worksPage from "./works";
import contactPage from "./contact";
import aboutPage from "./about";
import category from "./category";
import showcase from "./showcase";
import { singletons } from "../singletons";

export default createSchema({
  name: "default",
  types: schemaTypes.concat(
    [
      siteSetting,
      homePage,
      worksPage,
      category,
      showcase,
      contactPage,
      aboutPage,
    ].map((schema) =>
      singletons.has(schema.name)
        ? {
            ...schema,
            __experimental_actions: ["update", "publish"],
          }
        : schema
    )
  ),
});
