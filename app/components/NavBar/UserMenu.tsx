'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { useCallback, useEffect, useRef, useState } from 'react';

import MenuItem from './MenuItem';
import { useRouter } from 'next/navigation';
import Avatar from '../Avatar';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Button from '../Button';

interface UserMenuProps {
  currentUser?: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

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
        {true ? (
          <div className='flex w-64 gap-4'>
            <Button small label='Sign In' onClick={registerModal.onOpen} />
            <Button
              small
              onClick={() => {
                setIsOpen(false);
              }}
              label='Login'
            />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={`
          flex
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
