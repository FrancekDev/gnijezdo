'use client';

import useUploadModal from '@/hooks/useUploadModal';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { categories } from '../Categories/Categories';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { IoIosArrowDropdown } from 'react-icons/io';

import ModalHelper from './ModalHelper';
import Heading from '../Heading';
import Counter from '../Inputs/Counter';
import LocationForm from '../Inputs/LoactionForm';
import Input from '../Inputs/Input';
import CategoryInputs from '../Inputs/CategoryInputs';
import ImageInput from '../Inputs/ImageInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

// type FormData = {
//   address: string;
//   category: string;
//   location: [number, number] | [null, null];
//   price: number;
//   description: string;
//   image_src: string;
//   bathroom_count: number;
//   room_count: number;
// };

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      address: '',
      category: '',
      location: [null, null],
      price: 1,
      description: '',
      image_src: '',
      bathroom_count: 1,
      room_count: 1,
    },
  });

  const category = watch('category');

  const address = watch('address');

  const bathroom_count = watch('bathroom_count');
  const room_count = watch('room_count');

  const image_src = watch('image_src');

  // SUBMIT

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
  };

  // FUNKCIJA ZA INPUTE

  const setCustomValue = (id: keyof FieldValues, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // NEXT and BACK

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Predaj oglas';
    }
    return 'Naprijed';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Nazad';
  }, [step]);

  // scroll functionality

  const [reachedEnd, setReachedEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      // Check if you've reached the end by comparing scroll properties.
      const isAtEnd =
        container.scrollTop + container.clientHeight >= container.scrollHeight;

      // Update the state variable accordingly.
      setReachedEnd(isAtEnd);
    }
  };

  // STEP 0

  let bodyContent = (
    <div className='flex flex-col gap-6'>
      <Heading
        title='Koje je vrste vaša nekretnina?'
        subtitle='Izaberite kategoriju vaše nekretnine'
      />
      <div
        className='
        grid
        max-h-[50vh]
        grid-cols-1
        gap-3
        overflow-y-auto
        md:grid-cols-3
      '
      >
        {categories.map((item) => (
          <div className='col-span-1' key={item.label}>
            <CategoryInputs
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // STEP 1

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='Gdje se nalazi vaša nekretnina?'
          subtitle='Pomozite potencijalnim kupcima da lociraju vašu nekretninu.'
        />

        {/* //TODO: validacija podataka required */}
        <Controller
          name='location'
          control={control}
          render={({ field: { onChange, value } }) => (
            <LocationForm
              onSelectAddress={(
                address: string,
                location: [number, number] | [null, null]
              ) => {
                // onChange(address);
                setValue('address', address);
                setValue('location', location);
              }}
              defaultValue=''
            />
          )}
        />

        {address ? (
          <div className='text-center text-base text-blu'>
            <p>Adresa vaše nekretnine je:</p>
            <p>{address}</p>
          </div>
        ) : (
          <></>
        )}
        {/* // TODO: map */}
        {/* <Map small /> */}
      </div>
    );
  }

  // STEP 2

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className='flex flex-col gap-4 overflow-y-auto'
        >
          <Heading
            title='Što posjeduje vaša nekretina?'
            subtitle='Koliko soba, kupaonica...'
          />
          <div
            className='
        grid
        max-h-[50vh]
        grid-cols-1
        gap-4
        px-4
      '
          >
            <hr className='border-blu' />
            <Counter
              title='Spavaće sobe'
              subtitle='Koliko spavaćih soba ima vaša nekretnina?'
              value={room_count}
              onChange={(value) => setCustomValue('room_count', value)}
            />
            <hr className='border-blu' />
            <Counter
              title='Kupaonica'
              subtitle='Koliko kupaonica ima vaša nekrenina?'
              value={bathroom_count}
              onChange={(value) => setCustomValue('bathroom_count', value)}
            />
            <hr className='border-blu' />
            <Counter
              title='Kupaonica'
              subtitle='Koliko kupaonica ima vaša nekrenina?'
              value={bathroom_count}
              onChange={(value) => setCustomValue('bathroom_count', value)}
            />
            <hr className='border-blu' />
            <Counter
              title='Kupaonica'
              subtitle='Koliko kupaonica ima vaša nekrenina?'
              value={bathroom_count}
              onChange={(value) => setCustomValue('bathroom_count', value)}
            />
            <hr className='border-blu' />
            <Counter
              title='Kupaonica'
              subtitle='Koliko kupaonica ima vaša nekrenina?'
              value={bathroom_count}
              onChange={(value) => setCustomValue('bathroom_count', value)}
            />
            <hr className='border-blu' />
            <Counter
              title='Kupaonica'
              subtitle='Koliko kupaonica ima vaša nekrenina?'
              value={bathroom_count}
              onChange={(value) => setCustomValue('bathroom_count', value)}
            />
            <hr className='border-blu' />
            <Counter
              title='Kupaonica'
              subtitle='Koliko kupaonica ima vaša nekrenina?'
              value={bathroom_count}
              onChange={(value) => setCustomValue('bathroom_count', value)}
            />
          </div>
        </div>
        {reachedEnd ? (
          <div className='flex h-[24px] justify-center '></div>
        ) : (
          <div className='flex justify-center text-center text-blu'>
            <IoIosArrowDropdown size={24} />
          </div>
        )}
      </>
    );
  }

  // STEP 3

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Dodajte slike vaše nekretnine'
          subtitle='Pokažite kupcima kako izgleda vaša nekretnina.'
        />
        <Controller
          name='image_src'
          control={control}
          defaultValue={''}
          // TODO: napraviti validaciju za min 2 slike
          // i napraviti conditional render za "molimo vas ucitajte minimalno dvije slike"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <ImageInput
              value={value}
              placeholder='Učitajte željene slike'
              id='image'
              type='file'
              disabled={isLoading}
              accept='image/*'
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
                setCustomValue('image_src', value);
              }}
              // onChange={(
              //   value: string,
              //   event: ChangeEvent<HTMLInputElement>
              // ) => {
              //   onChange(value);
              //   setCustomValue('image_src', value);
              // }}
            />
          )}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Opišite kako izgleda vaša nekretnina'
          subtitle='Kratko i jasno'
        />
      </div>
    );
  }

  return (
    <ModalHelper
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Opišite svoju nekretninu'
      body={bodyContent}
    />
  );
};

export default UploadModal;
