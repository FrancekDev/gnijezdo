'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  del?: boolean;
  secondary?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  del,
  secondary,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
            relative
            w-full
            select-none
            rounded-lg
            text-bei
            transition
            hover:opacity-80
            disabled:cursor-not-allowed
            disabled:opacity-70
            ${del ? 'bg-del' : 'bg-blu'}
            ${del ? 'hover:bg-secDel' : 'hover:bg-secBlu'}
            ${del ? 'hover:border-secDel' : 'hover:border-secBlu'}
            ${del ? 'border-del' : 'border-blu'}
            ${outline ? 'bg-white' : 'bg-blu'}
            ${outline ? 'border-black' : 'border-blu'}
            ${outline ? 'hover:bg-white' : 'hover:border-secBlu'}
            ${outline ? 'text-black' : 'text-white'}
            ${secondary ? 'bg-oli' : 'bg-blu'}
            ${secondary ? 'hover:bg-secOli' : 'hover:bg-secBlu'}
            ${secondary ? 'hover:border-secOli' : 'hover:border-secBlu'}
            ${secondary ? 'border-oli' : 'border-blu'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-[2px]'}
          `}
    >
      {Icon && (
        <Icon
          size={24}
          className='
                absolute
                left-4
                top-3
              '
        />
      )}
      {label}
    </button>
  );
};

export default Button;
