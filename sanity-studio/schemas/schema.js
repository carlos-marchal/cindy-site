import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import siteSetting from "./site-settings";
import homePage from "./home";
import category from "./category";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([siteSetting, homePage, category]),
});
