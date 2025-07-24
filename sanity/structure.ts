// sanity/structure.ts

import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('lente').title('Lenses'),
      S.documentTypeListItem('categoria').title('Categories'),
      S.documentTypeListItem('colorProducto').title('Colors'),
    ])