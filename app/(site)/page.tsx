import { client } from '@/sanity/lib/client';
import { HeroCarousel } from './components/HeroCarousel';
import { ProductGrid } from './components/ProductGrid';
import type { Lente, Categoria } from '@/types';
import { Suspense } from 'react';

export default async function HomePage() {
  const lentes: Lente[] = await client.fetch(`*[_type == "lente"] | order(_createdAt desc){
    _id,
    nombre,
    slug,
    "categoriaIds": categorias[]._ref,
    variantesDeColor[]{
      _key,
      imagen,
      color->{nombre, valorHex}
    }
  }`);
  
  const categorias: Categoria[] = await client.fetch(`*[_type == "categoria"] | order(nombre asc)`);

  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <Suspense>
      <ProductGrid lentes={lentes} categorias={categorias} />
      </Suspense>
    </div>
  );
}