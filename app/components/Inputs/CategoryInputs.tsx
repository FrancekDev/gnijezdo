'use client';

import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInputs: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      className={`
    flex
    cursor-pointer
    flex-col
    items-center
    justify-center 
    gap-2
    rounded-xl
    border-2
    p-3 
    text-blu
    transition 
    hover:border-oli
    ${selected ? 'border-oli' : 'border-blu'}
  `}
      onClick={() => {
        onClick(label);
      }}
    >
      <Icon size={30} />
      <div className='font-semibold'>{label}</div>
    </div>
  );
};

export default CategoryInputs;
