'use client';

export function ScrollButton() {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalogo');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
  onClick={scrollToCatalog}
  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#43d3ff] px-8 py-4 text-lg font-bold text-black shadow-lg hover:shadow-xl hover:bg-[#00bfff] transition-all duration-300"
>
      Browse Catalog
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
}