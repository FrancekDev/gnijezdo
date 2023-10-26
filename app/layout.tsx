import './globals.css';

import Navbar from './components/NavBar/NavBar';

import { Arapey, Manrope, Lora } from 'next/font/google';
import Modal from './components/Modals/AuthModalHelper';
// import RegisterModal from './components/Modals/RegisterModal';

import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';

import ToasterProvider from '@/providers/ToasterProvider';
import ModalProvider from '@/providers/ModalProvider';

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
      <body className={`${fontPrimary.className} bg-bei`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Navbar />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
