import './globals.css';

import Navbar from './components/NavBar/NavBar';

import { Arapey, Manrope, Lora } from 'next/font/google';
import Modal from './components/Modals/Modal';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';

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
            <RegisterModal />
            <Navbar />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
