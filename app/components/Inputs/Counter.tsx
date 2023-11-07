'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-col'>
        <div className='font-medium text-blu'>{title}</div>
        <div className='font-light text-neutral-500'>{subtitle}</div>
      </div>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onReduce}
          className='
          flex
          h-8
          w-8
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border-[1px]
          border-blu
          text-blu
          transition
          hover:opacity-80
        '
        >
          <AiOutlineMinus />
        </div>
        <div
          className='
          w-2
          text-xl 
          font-light 
          text-neutral-600
        '
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          className='
          flex
          h-8
          w-8
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border-[1px]
          border-blu
          text-blu
          transition
          hover:opacity-80
        '
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
<div></div>;
