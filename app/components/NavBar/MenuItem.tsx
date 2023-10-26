'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <DropdownMenu.Item
      onClick={onClick}
      className='
      mx-1
      my-2
      flex
      w-[95%]
      cursor-pointer
      select-none
      items-center
      rounded-lg
      px-2
      text-[16px]
      outline-none
      transition
      hover:bg-gra
      '
    >
      {label}
    </DropdownMenu.Item>
  );
};

export default MenuItem;
