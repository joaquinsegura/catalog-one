'use client';

import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ImageZoom } from '../../components/ImageZoom';
import type { LenteDetalle, Variante } from '@/types';

export default function LenteDetallePage(props: any) {
  const { slug } = use(props.params) as { slug: string };
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [lente, setLente] = useState<LenteDetalle | null>(null);
  const [varianteActiva, setVarianteActiva] = useState<Variante | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchLente = async () => {
      const data: LenteDetalle = await client.fetch(
        `*[_type == "lente" && slug.current == $slug][0]{
          ...,
          variantesDeColor[]{ ..., color->{nombre, valorHex} }
        }`,
        { slug }
      );
      setLente(data);
      setCargando(false);
    };
    fetchLente();
  }, [slug]);

  useEffect(() => {
    if (lente) {
      const variantKey = searchParams.get('variant');
      if (variantKey) {
        const foundVariant = lente.variantesDeColor.find((v: Variante) => v._key === variantKey);
        if (foundVariant && foundVariant.color && foundVariant.imagen) {
          setVarianteActiva(foundVariant);
          return;
        }
      }
      const firstValidVariant = lente.variantesDeColor.find(v => v.color && v.imagen);
      setVarianteActiva(firstValidVariant || null);
    }
  }, [lente, searchParams]);

  const handleVariantSelect = (variant: Variante) => {
    setVarianteActiva(variant);
    const newUrl = `${pathname}?variant=${variant._key}`;
    router.replace(newUrl, { scroll: false });
  };

  if (cargando) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (!lente || !varianteActiva) {
    return <div className="p-8 text-center">Item not found or incomplete information.</div>;
  }

  const imageUrl = urlForImage(varianteActiva.imagen);

  return (
    <main className="container mx-auto p-4 sm:p-8 product-page">
      <div className="mb-8">
        <Link href="/" className="font-semibold hover:text-[#43d3ff] transition-colors duration-300">
          ← Return to Catalog
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        <div className="flex flex-col gap-4">
          {imageUrl && (
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
              <ImageZoom 
                imageUrl={imageUrl!.url()}
                altText={`${lente.nombre} en color ${varianteActiva.color.nombre}`}
                zoomLevel={2.5}
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{lente.nombre}</h1>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">
              Color: <span className="font-normal">{varianteActiva.color.nombre}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {lente.variantesDeColor.map((variante) => {
                if (!variante.color) {
                  return null;
                }
                return (
                  <button
                    key={variante._key}
                    onClick={() => handleVariantSelect(variante)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-in-out focus:outline-none color-selector-button ${
                      varianteActiva._key === variante._key ? 'active ring-2 ring-offset-2' : ''
                    }`}
                    title={variante.color.nombre}
                    style={{ backgroundColor: variante.color.valorHex.hex}}
                  >
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-700 mb-6 description-text">{lente.descripcion}</p>
          
          <div className="space-y-4 border-t pt-6 detail-separator">
            <div className="flex">
              <span className="font-semibold w-32">Frame Material:</span>
              <span className="text-gray-600 description-text">{lente.material}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Type:</span>
              <span className="text-gray-600 description-text">{lente.tipoDeLente}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}