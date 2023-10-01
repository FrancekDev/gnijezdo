'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className='relative w-full'>
      {/*  možda inije potrebno */}
      {formatPrice && (
        <BiDollar
          size={20}
          className='
                absolute
                left-3
                top-7
                text-neutral-700
              '
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        className={`
              peer
              w-full
              rounded-md
              border-2 
              bg-white 
              p-1 
              pt-6
              font-light
              outline-none
              transition
              disabled:cursor-not-allowed
              disabled:opacity-70
              ${formatPrice ? 'pl-9' : 'pl-4'}
              ${errors[id] ? 'border-del' : 'border-neutral-300'}
              ${errors[id] ? 'focus:border-del' : 'focus:border-[#3b5dadb4]'}
            `}
      />
      <label
        className={`
        text-md 
        absolute

        top-4
        z-10 
        origin-[0] 
        -translate-y-4
        transform 
        duration-150 
        ${formatPrice ? 'left-9' : 'left-4'}
        peer-placeholder-shown:translate-y-0
        peer-placeholder-shown:scale-100 
        peer-focus:-translate-y-4
        peer-focus:scale-90
        ${errors[id] ? 'text-del' : 'text-zinc-400'}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
