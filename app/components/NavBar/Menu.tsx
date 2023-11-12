import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './MenuItem';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import AvatarComp from '../AvatarComp';

const Menu = () => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onUpload = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className='
          shrink-0
          cursor-pointer
          rounded-full
          bg-gra
          outline-none
          transition
          hover:shadow-md
          md:px-1
          md:py-1
        '
        >
          <AvatarComp src={user?.user_metadata.avatar_url} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='
          z-50
          flex
          min-w-[220px]
          flex-col
          items-center
          justify-center
          rounded-lg
          bg-white
          drop-shadow-xl
          '
          sideOffset={5}
        >
          <MenuItem onClick={() => {}} label='Profil' />
          <MenuItem onClick={() => {}} label='Favoriti' />
          <MenuItem onClick={() => {}} label='Moje Nekretnine' />
          <MenuItem onClick={uploadModal.onOpen} label='Oglasi nektetninu' />

          <DropdownMenu.Arrow className='fill-white' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Menu;
