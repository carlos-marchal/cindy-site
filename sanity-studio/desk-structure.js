import S from "@sanity/desk-tool/structure-builder";

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("home").documentId("home")),
      S.listItem()
        .title("Works Page")
        .child(S.document().schemaType("works").documentId("works")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["site_settings", "home", "works"].includes(listItem.getId())
      ),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("site_settings").documentId("site_settings")
        ),
    ]);
