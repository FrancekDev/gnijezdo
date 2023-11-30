'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';

interface NumberInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  price?: boolean;
  placeholder?: string;
  formatedValue?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  formatedValue,
}) => {
  const handleOnValueChange = (
    _value: string | undefined,
    fieldName: string | undefined
  ): void => {
    if (!fieldName) {
      return;
    }

    const value = Number(_value);
    // console.log(value);
    formatedValue = value;
  };

  return (
    <div className='relative w-full'>
      <CurrencyInput
        id={id}
        disabled={disabled}
        placeholder='2,000.00 €'
        decimalsLimit={2}
        suffix=' €'
        onValueChange={handleOnValueChange}
        {...register(id, { required })}
        className={`
        peer
        w-full
        border-b
        border-blu
        bg-bei
        p-1 
        pt-6
        font-light
        outline-none
        transition
        placeholder:start-0
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${errors[id] ? 'border-del' : 'border-blu'}
        ${errors[id] ? 'focus:border-del' : 'focus:border-[#3b5dadb4]'}
      `}
      />

      <label
        className={`
                text-md 
                absolute
                left-1
                top-0 
                z-10 
                origin-[0] 
                -translate-y-2
                transform
                duration-200
                peer-placeholder-shown:translate-y-0
                peer-placeholder-shown:scale-100
                peer-focus:-translate-y-3
                peer-focus:scale-90
                peer-focus:border-b 
                ${errors[id] ? 'text-rose-500' : 'text-neutral-600'}
                ${
                  errors[id]
                    ? 'peer-focus:border-rose-500'
                    : 'peer-focus:border-blu'
                }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default NumberInput;
