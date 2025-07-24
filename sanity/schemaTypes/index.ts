import { type SchemaTypeDefinition } from 'sanity';
import lente from './lente';
import categoria from './categoria';
import color from './color';
import variante from './variante';
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [lente, categoria, color, variante],
};
