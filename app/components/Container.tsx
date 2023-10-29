'use client';

interface ConatinerProps {
  children: React.ReactNode;
}

const Container: React.FC<ConatinerProps> = ({ children }) => {
  return (
    <div className='xl-px-20 mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10'>
      {children}
    </div>
  );
};
export default Container;
