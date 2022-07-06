import S from "@sanity/desk-tool/structure-builder";
import { singletons } from "./singletons";

export default () =>
  S.list()
    .title("Content")
    .items([
      ...Array.from(singletons).map(([id, name]) =>
        S.listItem()
          .title(name)
          .child(S.document().schemaType(id).documentId(id))
      ),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletons.has(listItem.getId())
      ),
    ]);
