import type { StructureResolver } from 'sanity/structure'
import { singletons } from './singletons'

// In Sanity v3+, the structure builder (S) is passed as a parameter
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...Array.from(singletons).map(([id, name]) =>
        S.listItem()
          .title(name)
          .child(S.document().schemaType(id).documentId(id))
      ),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletons.has(listItem.getId()!)
      ),
    ])
