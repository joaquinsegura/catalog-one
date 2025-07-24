import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Footer } from "./components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-8 sm:px-12 md:px-16 py-4 bg-white transition-colors duration-300 sticky top-0 z-50 border-b border-gray-200 global-header">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Ruta 40 Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl uppercase">
              Lorem Ipsum
            </span>
          </a>
          <div className="flex items-center gap-8">
            <Link href="/quienes-somos" className="text-md font-medium hover:text-[#43d3ff] transition-colors">
              About Us
            </Link>
            <Link href="/contacto" className="text-md font-medium hover:text-[#43d3ff] transition-colors">
              Contact
            </Link>
            <ThemeSwitcher />
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}