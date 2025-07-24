export interface Color {
  nombre: string;
  valorHex: {
    hex : string;
  };
}

export interface Variante {
  _key: string;
  color: Color;
  imagen: any;
}

export interface Categoria {
  _id: string;
  nombre: string;
}

export interface Lente {
  _id: string;
  nombre: string;
  slug: {
    current: string;
  };
  variantesDeColor: Variante[];
  categoriaIds: string[];
  categorias?: Categoria[]; 
}


export interface LenteDetalle {
  nombre: string;
  descripcion: string;
  variantesDeColor: Variante[];
  material: string;
  tipoDeLente: string;
}