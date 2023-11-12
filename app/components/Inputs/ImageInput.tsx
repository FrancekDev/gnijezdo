import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import { FieldValues, UseFormRegister } from 'react-hook-form';

import Image from 'next/image';

export interface ImageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ className, type, disabled, value, ...props }, ref) => {
    return (
      <div className='grid-row grid'>
        <div
          className='
        flex
        w-full
        cursor-pointer
        grid-rows-2
        rounded-md
        border-[2px]
        border-dashed
        border-blu
        bg-bei
        text-base
        '
        >
          <input
            type={type}
            className={twMerge(
              `
            hidden
`,
              disabled && 'opacity-75',
              className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
          />
          <label
            htmlFor='image'
            className='flex h-8 w-full cursor-pointer items-center justify-center'
          >
            Učitajte željene slike
          </label>
        </div>
        {value && (
          <div className='h-[160px] w-[320px]'>
            <AspectRatio.Root ratio={16 / 9}>
              {/*  TODO: promjeniti da map.images_src */}
              <Image
                alt='slike nekretnine'
                fill
                style={{ objectFit: 'cover' }}
                src={value}
              />
            </AspectRatio.Root>
          </div>
        )}
      </div>
    );
  }
);

ImageInput.displayName = 'ImageInput';

export default ImageInput;
