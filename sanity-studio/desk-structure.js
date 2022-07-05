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
      S.listItem()
        .title("Contact Page")
        .child(S.document().schemaType("contact").documentId("contact")),
      S.listItem()
        .title("About Page")
        .child(S.document().schemaType("about").documentId("about")),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["site_settings", "home", "works", "contact", "about"].includes(
            listItem.getId()
          )
      ),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("site_settings").documentId("site_settings")
        ),
    ]);
