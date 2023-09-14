import './globals.css';

import Navbar from './components/NavBar/NavBar';

import { Arapey, Manrope, Lora } from 'next/font/google';

const fontSecondary = Arapey({ subsets: ['latin'], weight: ['400'] });
const fontPrimary = Manrope({ subsets: ['latin'] });

export const metadata = {
  title: 'Moje Gnijezdo',
  description: 'Nekretnine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${fontPrimary.className} bg-[#FFF5DC] text-[#0F4D86]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
