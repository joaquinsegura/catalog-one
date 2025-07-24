'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import type { Lente, Variante } from '@/types';

const MAX_COLORS_TO_SHOW = 3; 

export function ProductCard({ lente }: { lente: Lente }) {
  const [activeVariant, setActiveVariant] = useState<Variante | undefined>(lente.variantesDeColor[0]);

  if (!activeVariant || !activeVariant.imagen) {
    return (
      <div className="group text-center">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100"></div>
        <div className="p-4">
          <h2 className="text-base font-medium text-black product-card-title">{lente.nombre}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="group text-left">
      <div className="relative block overflow-hidden">
        <Link href={`/lente/${lente.slug.current}?variant=${activeVariant._key}`}>
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src={urlForImage(activeVariant.imagen)!.url()}
              alt={`Lente de sol ${lente.nombre}`}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/lente/${lente.slug.current}?variant=${activeVariant._key}`}>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
            {lente.nombre}
          </h3>
          <h2 className="text-lg font-semibold text-black transition-colors duration-300 product-card-title">
           {lente.nombre.toUpperCase()}
          </h2>
        </Link>

        {lente.variantesDeColor.length > 1 && (
          <div className="flex gap-2 mt-2 items-center"> 
            {lente.variantesDeColor.slice(0, MAX_COLORS_TO_SHOW).map((variante) => {
              if (!variante.color) return null;
              return (
                <button
                  key={variante._key}
                  onMouseEnter={() => setActiveVariant(variante)}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-200"
                  style={{ backgroundColor: variante.color.valorHex.hex }}
                  title={variante.color.nombre}
                />
              );
            })}
            {/* indicador "+x" por si hay más colores */}
            {lente.variantesDeColor.length > MAX_COLORS_TO_SHOW && (
              <Link 
                href={`/lente/${lente.slug.current}`} 
                className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center hover:bg-gray-300 transition-colors"
                title={`Ver ${lente.variantesDeColor.length - MAX_COLORS_TO_SHOW} colores más`}
              >
                +{lente.variantesDeColor.length - MAX_COLORS_TO_SHOW}
              </Link>
            )}
          </div>
        )}

        {lente.variantesDeColor.length > 1 && (
          <p className="text-sm text-gray-500 mt-2">
            {lente.variantesDeColor.length} colors
          </p>
        )}
      </div>
    </div>
  );
}