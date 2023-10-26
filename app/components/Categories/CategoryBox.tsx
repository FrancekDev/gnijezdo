'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  urlLabel: string;
  description?: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  urlLabel,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: urlLabel,
    };

    if (params?.get('category') === urlLabel) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [urlLabel, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex 
      cursor-pointer 
      flex-col 
      items-center 
      justify-center
      gap-2
      border-b-2
      p-3
      text-blu
      transition
      hover:text-neutral-800
    ${selected ? 'border-b-blu' : 'border-transparent'}
    ${selected ? 'text-secBlu' : 'text-neutral-500'}
  `}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  );
};

export default CategoryBox;
