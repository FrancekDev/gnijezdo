'use client';

import Categories from '../Categories/Categories';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

const Navbar = () => {
  // TODO: loader
  // if (!isLoaded){}
  return (
    <header className='fixed z-10 w-full bg-[#FFF5DC] text-blu shadow-sm'>
      <div className='m-auto w-5/6 py-2'>
        <div
          className='
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          '
        >
          {/* <Search /> */}
          <Logo />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
