'use client';

import { useUser } from '@/hooks/useUser';
import * as Avatar from '@radix-ui/react-avatar';

import Image from 'next/image';
import Loader from './Loader';

interface AvatarProps {
  src: string | null | undefined;
}

const AvatarComp: React.FC<AvatarProps> = ({ src }) => {
  return (
    // TODO: napraviti Loader dok se ne učita navBar
    <Avatar.Root>
      <Avatar.Image
        height={30}
        width={30}
        className='rounded-full'
        src={src || '/images/avatar.jpg'}
        // onLoadingStatusChange={(
        //   status: 'idle' | 'loading' | 'loaded' | 'error'
        // ) => <Loader />}
      />
    </Avatar.Root>
  );
};

export default AvatarComp;
