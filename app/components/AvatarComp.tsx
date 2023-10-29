'use client';

import { useUser } from '@/hooks/useUser';
import * as Avatar from '@radix-ui/react-avatar';

import Image from 'next/image';
import Loader from './Loader';

interface AvatarProps {
  // src: string | null | undefined;
}

const AvatarComp: React.FC<AvatarProps> = () => {
  const { user } = useUser();

  const userImage = user?.user_metadata.avatar_url;

  return (
    // TODO: napraviti Loader dok se ne učita navBar
    <Avatar.Root>
      <Avatar.Image
        height={30}
        width={30}
        className='rounded-full'
        src={userImage || '/images/avatar.jpg'}
        // onLoadingStatusChange={(
        //   status: 'idle' | 'loading' | 'loaded' | 'error'
        // ) => <Loader />}
      />
    </Avatar.Root>
  );
};

export default AvatarComp;
