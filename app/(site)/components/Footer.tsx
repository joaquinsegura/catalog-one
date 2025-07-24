import Link from 'next/link';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="footer bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-lg font-bold">Lorem Ipsum</h3>
            <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/quienes-somos" className="text-sm hover:text-[#43d3ff] transition-colors">About Us</Link></li>
              <li><Link href="/contacto" className="text-sm hover:text-[#43d3ff] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:anything@example.com" className="hover:text-[#43d3ff] transition-colors">anything@example.com</a>
              </li>
              <li>
                <a className="hover:text-[#43d3ff] transition-colors">+1 23456789</a>
              </li>
              <li className="text-gray-500">Near the Roman Forum, Rome</li>
            </ul>
          </div>
        </div>

        {/*Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 Lorem Ipsum. All Rights Reserved.
          </p>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 sm:mt-0 hover:text-[#43d3ff] transition-colors"
            aria-label="Instagram de Ruta 40"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}