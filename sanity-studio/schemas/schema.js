import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import siteSetting from "./site-settings";
import home from "./home";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([siteSetting, home]),
});
