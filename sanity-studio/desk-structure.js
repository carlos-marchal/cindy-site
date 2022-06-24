import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Navigation")
        .child(S.document().schemaType("nav").documentId("nav")),
      S.listItem()
        .title("Home")
        .child(S.document().schemaType("home").documentId("home")),
      ...S.documentTypeListItems().filter(
        (listItem) => !["nav", "home"].includes(listItem.getId())
      ),
    ]);
