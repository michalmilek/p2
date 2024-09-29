import { Inter, Cinzel } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", display: 'swap', fallback: ['Inter', 'sans-serif'] });

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="bg-[#1a1a1a] text-[#d4af37] min-h-screen flex flex-col w-screen max-w-full overflow-x-hidden font-cinzel">
        <div className="flex-grow flex flex-col w-screen max-w-full">
          <header className="border-b border-[#d4af37]/20">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex space-x-4 justify-center font-cinzel text-lg">
                <li><Link href="/" className="hover:text-[#f0e68c] transition-colors duration-300">Home</Link></li>
                <li><Link href="/blog" className="hover:text-[#f0e68c] transition-colors duration-300">Chronicles</Link></li>
                <li><Link href="/contact" className="hover:text-[#f0e68c] transition-colors duration-300">Contact</Link></li>
                <li><Link href="/repositories" className="hover:text-[#f0e68c] transition-colors duration-300">Contracts (github repositories)</Link></li>
              </ul>
            </nav>
          </header>
          <main className="flex h-full px-4 py-8 justify-center items-center flex-grow">
            {children}
          </main>
          <footer className="border-t border-[#d4af37]/20">
            <div className="container mx-auto px-4 py-4 text-center text-sm">
              © 2024 Michał Miłek. All rights reserved.
            </div>
          </footer>
        </div>
        <div className="fixed inset-0 pointer-events-none">
          <div
            id="parallax-bg"
            className="absolute inset-0 bg-[url('/skellige-4k.jpg')] bg-cover bg-center opacity-10 bg-"
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]/80"></div>
        </div>
      </body>
    </html>
  );
}
