import { useRouter } from 'next/navigation';

import Button from '../Button';

import toast from 'react-hot-toast';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import Menu from './Menu';

const UserMenu = () => {
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClent = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClent.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }

    // TODO: vidjeti je li ovo ispravno
    router.push('/');
    router.refresh();
  };

  return (
    <div className='realtive'>
      <div
        className='
        flex
        flex-row
        items-center
        justify-end
        gap-3
        '
      >
        {user ? (
          <div className='flex w-44 shrink-0 items-center gap-x-4'>
            <Menu />
            <Button small label='Odjavi se' onClick={handleLogout} />
          </div>
        ) : (
          <div className='flex w-20 gap-4'>
            <Button small label='Prijavi se' onClick={authModal.onOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
