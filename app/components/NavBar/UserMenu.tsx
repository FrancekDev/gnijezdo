'use client';

import { AiOutlineMenu } from 'react-icons/ai';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import MenuItem from './MenuItem';
import Button from '../Button';
import Avatar from '../Avatar';
// import useRegisterModal from '@/app/hooks/useRegisterModal';
import toast from 'react-hot-toast';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface UserMenuProps {
  currentUser?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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

    router.refresh();
  };

  // const registerModal = useRegisterModal();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let handler = (e: any) => {
      if (menuRef.current && !menuRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [menuRef]);

  return (
    <div className='realtive' ref={menuRef}>
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
            <Button small label='Odjavi se' onClick={handleLogout} />
            <div
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className={`
          flex
          shrink-0
          cursor-pointer
          flex-row
          items-center
          gap-3
          rounded-full
          border-[1px]
          border-blu
          bg-[#F7F7F3]
          p-4
          transition
          hover:shadow-md
          md:px-2
          md:py-1`}
            >
              <AiOutlineMenu className='text-blu' />
              <div
                className='
            hidden
            md:block
          '
              >
                {/* <Avatar src={currentUser?.image} /> */}
                <Avatar src={'/images/avatar.jpg'} />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex w-20 gap-4'>
            <Button small label='Prijavi se' onClick={authModal.onOpen} />
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className='
          absolute
          right-8
          top-24
          w-[30vw]
          overflow-hidden
          rounded-xl
          bg-white
          text-sm
          shadow-md
          md:w-1/4
        '
        >
          <div className='flex cursor-pointer flex-col'>
            <MenuItem
              onClick={() => {
                setIsOpen(false);
              }}
              label='Favoriti'
            />
            <MenuItem
              onClick={() => {
                setIsOpen(false);
              }}
              label='Moje nekretnine'
            />
            <MenuItem
              onClick={() => {
                setIsOpen(false);
              }}
              label='Oglasi svoju nektetninu'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
