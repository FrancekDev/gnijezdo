'use client';
import { BiSearch } from 'react-icons/bi';

// import useSearchModal from '@/app/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
// import useCountries from '@/app/hooks/useCountries';
import { useMemo } from 'react';
// import { differenceInDays } from 'date-fns';

const Search = () => {
  //   const searchModal = useSearchModal();
  const params = useSearchParams();
  //   const { getByValue } = useCountries();

  //sa ovime prenosimo vrijednosti is searcha u searchBar

  //   const locationValue = params?.get('locationValue');
  //   const startDate = params?.get('startDate');
  //   const endDate = params?.get('endDate');
  //   const guestCount = params?.get('guestCount');

  //   const loactionLabel = useMemo(() => {
  //     if (locationValue) {
  //       return getByValue(locationValue as string)?.label;
  //     }

  //     return 'Anywhere';
  //   }, [getByValue, locationValue]);

  //   const durationLabel = useMemo(() => {
  //     if (startDate && endDate) {
  //       const start = new Date(startDate as string);
  //       const end = new Date(endDate as string);
  //       let diff = differenceInDays(end, start);

  //       if (diff === 0) {
  //         diff = 1;
  //       }

  //       return `${diff} Days`;
  //     }

  //     return 'Any Week';
  //   }, [startDate, endDate]);

  //   const guestLabel = useMemo(() => {
  //     if (guestCount) {
  //       return `${guestCount} Guests`;
  //     }

  //     return 'Add guests';
  //   }, [guestCount]);

  return (
    <div
      //   onClick={searchModal.onOpen}
      className='
      w-full
    cursor-pointer
    rounded-full
    border-[1px]
    border-blu
    bg-gra
    py-2
    shadow-sm
    transition
    hover:shadow-md
    md:w-auto'
    >
      <div
        className='
      flex
      flex-row
      items-center
      justify-between'
      >
        <div
          className='
        flex
        flex-row
        items-center
        gap-3
        px-6
        pr-2
        text-sm
        text-blu
        '
        >
          <div className='hidden w-40 text-blu sm:block'>Pretraga</div>
          <div
            className='
            text-beige
            rounded-full
            p-2
            text-blu
          '
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
