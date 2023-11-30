import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import Image from 'next/image';

export interface ImageInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ className, type, disabled, value, src, ...props }, ref) => {
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
            className={twMerge(`hidden`, disabled && 'opacity-75', className)}
            disabled={disabled}
            ref={ref}
            {...props}
          />
          <label
            htmlFor='image'
            className='flex h-10 w-full cursor-pointer items-center justify-center text-neutral-600'
          >
            Učitajte željene slike
          </label>
        </div>
        {src ? (
          <div className=' pt-6'>
            <AspectRatio.Root ratio={16 / 9}>
              {/*  TODO: promjeniti da map.images_src */}
              <Image
                alt='slike nekretnine'
                fill
                style={{ objectFit: 'cover' }}
                src={src}
              />
            </AspectRatio.Root>
          </div>
        ) : (
          <p className='pt-5 text-center'>Molimo vas da učitate sliku.</p>
        )}
      </div>
    );
  }
);

ImageInput.displayName = 'ImageInput';

export default ImageInput;
