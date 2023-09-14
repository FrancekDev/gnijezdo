import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <header className='fixed z-10 w-full shadow-sm'>
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
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
