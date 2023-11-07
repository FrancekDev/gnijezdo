'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Arapey } from 'next/font/google';

const fontSecondary = Arapey({ subsets: ['latin'], weight: ['400'] });

const Logo = () => {
  const router = useRouter();

  return (
    <div className='flex cursor-pointer flex-row items-center justify-center'>
      <Image
        onClick={() => router.push('/')}
        src='/images/light.png'
        alt='Logo'
        height='70'
        width='70'
        className='cursor-pointer md:block'
      />
    </div>
  );
};

export default Logo;
