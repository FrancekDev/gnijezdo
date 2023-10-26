'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { PiHouseLine } from 'react-icons/pi';
import { MdOutlineApartment } from 'react-icons/md';
import { BiLandscape } from 'react-icons/bi';

import CategoryBox from './CategoryBox';
import Container from '../Container';

export const categories = [
  {
    label: 'Kuća',
    urlLabel: 'kuca',
    icon: PiHouseLine,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Stan',
    urlLabel: 'stan',
    icon: MdOutlineApartment,
    description: 'This property is has windmills!',
  },
  {
    label: 'Zemljište',
    urlLabel: 'zemljiste',
    icon: BiLandscape,
    description: 'This property is modern!',
  },
];

const Categories = () => {
  //funkcionalnost da "category" može pregledavati URL i biti selektirana te da kada nismo na main pageu u urlu ne bude ?category=beach
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <>
      <div
        className='
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        pt-4
      '
      >
        {categories.map((item) => (
          <CategoryBox
            urlLabel={item.urlLabel}
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </>
  );
};

export default Categories;
