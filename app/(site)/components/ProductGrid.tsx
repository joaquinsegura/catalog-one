'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from './ProductCard';
import { Pagination } from './pagination';
import type { Lente, Categoria } from '@/types';

const ITEMS_PER_PAGE = 16;

export function ProductGrid({ lentes, categorias }: { lentes: Lente[], categorias: Categoria[] }) {
  const searchParams = useSearchParams();
  

  const [filtrosActivos, setFiltrosActivos] = useState<string[]>([]);
  const [lentesFiltrados, setLentesFiltrados] = useState<Lente[]>(lentes);

  useEffect(() => {
    if (filtrosActivos.length === 0) {
      setLentesFiltrados(lentes);
    } else {
      const filtrados = lentes.filter(lente => 
        filtrosActivos.every(filtroId => 
          lente.categoriaIds?.includes(filtroId)
        )
      );
      setLentesFiltrados(filtrados);
    }
  }, [filtrosActivos, lentes]);

  const handleFiltroClick = (categoriaId: string) => {
    setFiltrosActivos(prevFiltros => {
      if (prevFiltros.includes(categoriaId)) {
        return prevFiltros.filter(id => id !== categoriaId);
      } else {
        return [...prevFiltros, categoriaId];
      }
    });
  };

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(lentesFiltrados.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const lentesDePaginaActual = lentesFiltrados.slice(startIndex, endIndex);

  return (
    <section id="catalogo" className="px-8 sm:px-12 md:px-16 py-20 bg-gray-100 transition-colors catalog-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Lens Designs</h2>
          <div className="flex justify-center gap-2 sm:gap-4 mt-6 flex-wrap">
            <button
              onClick={() => setFiltrosActivos([])}
              className={`filter-button ${filtrosActivos.length === 0 ? 'active' : ''}`}
            >
              All
            </button>
            {categorias.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleFiltroClick(cat._id)}
                className={`filter-button ${filtrosActivos.includes(cat._id) ? 'active' : ''}`}
              >
                {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {lentesDePaginaActual.length === 0 && (
          <p className="text-center">No results found for your selected filters.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {lentesDePaginaActual.map((lente) => (
            <ProductCard key={lente._id} lente={lente} />
          ))}
        </div>

        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </section>
  );
}