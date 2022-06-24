import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import nav from "./nav";
import home from "./home";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([nav, home]),
});
