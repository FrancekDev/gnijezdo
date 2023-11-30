'use client';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { IoIosArrowDropdown } from 'react-icons/io';

import ModalHelper from './ModalHelper';
import Heading from '../Heading';
import Input from '../Inputs/TextInput';
import Counter from '../Inputs/Counter';
import LocationForm from '../Inputs/LocationInput';
import CategoryInputs from '../Inputs/CategoryInputs';
import ImageInput from '../Inputs/ImageInput';
import { categories } from '../Categories/Categories';
import PriceInput from '../Inputs/NumberInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  DESCRIPTION = 2,
  IMAGES = 3,
  INFO = 4,
  PRICE = 5,
}

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string>();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

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
      category: '',
      address: '',
      location: [],
      title: '',
      description: '',
      image_src: '',
      bathroom_count: 1,
      room_count: 1,
      price: null,
    },
  });

  const category = watch('category');

  const address = watch('address');
  const location = watch('location');

  const bathroom_count = watch('bathroom_count');
  const room_count = watch('room_count');

  const image_src = watch('image_src');

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

  // scroll functionality on info step

  const [reachedEnd, setReachedEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      const isAtEnd =
        container.scrollTop + container.clientHeight >= container.scrollHeight;

      setReachedEnd(isAtEnd);
    }
  };

  // SUBMIT

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    const imageFile = values.image_src;
    const formatedLoaction = `POINT(${location[1]} ${location[0]})`;
    let formatedstringPrice = values.price.replace('€', '').replace(',', '');
    let formatedPrice = parseFloat(formatedstringPrice);
    console.log(formatedPrice);

    try {
      setIsLoading(true);

      if (
        !category ||
        !address ||
        !location ||
        !values.description ||
        !values.title ||
        !image_src ||
        !bathroom_count ||
        !room_count ||
        !values.price ||
        !user
      ) {
        toast.error('Potrebno je popuniti sva polja!');
        return;
      }

      const uniqueID = uniqid();

      //upload images
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Neuspjelo učitavnje slike!');
      }
      //data upload real-estate
      const { error: supabaseError } = await supabaseClient
        .from('real-estate')
        .insert({
          user_id: user.id,
          title: values.title,
          description: values.description,
          image_src: imageData.path,
          address: address,
          location: formatedLoaction,
          category: category,
          room_count: room_count,
          bathroom_count: bathroom_count,
          price: formatedPrice,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(`Supabase error -> ${supabaseError.message}`);
      }

      router.refresh();
      setIsLoading(false);
      reset();
      setImage('');
      setStep(STEPS.CATEGORY);
      uploadModal.onClose();
    } catch (error) {
      toast.error(`Nešto je pošlo po krivu!`);
    } finally {
      setIsLoading(false);
      toast.success('Uspješno ste oglasili nekretninu!');
    }
  };

  // TODO: napraviti verifikaciju podataka i required,
  // TODO: mogucnost uplodanja vise slika,
  // TODO: staviti vise podataka: kvadratura, godina izgradnje...,
  // TODO: mapu kod lokacije
  // TODO: max MB za slike

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

        <Controller
          name='location'
          control={control}
          rules={{
            required: true,
          }}
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
        {/* <Map small /> */}
      </div>
    );
  }

  // STEP 2

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='Kako izgleda vaša nekretnina?'
          subtitle='Molimo vas kratko opišite vašu nekretninu kako bi potencijani kupci znali što nudite.'
        />
        <Input
          id='title'
          label='Naziv oglasa'
          disabled={isLoading}
          register={register}
          errors={errors}
          placeholder={'Mala kućica u predgrađu Zagreba'}
          required
        />
        <Input
          textarea
          id='description'
          label='Opis nekretnine'
          disabled={isLoading}
          register={register}
          errors={errors}
          placeholder={
            'Jednokatnica sa uređenim papirima, tlocrtne površine 70m2, ukupna površina zemljišta 180m2. Obnovljena 2017 god. nova stolarija, instalacije, ugrađeno podno grijanje. 20min vožnje od Zagreba.'
          }
          required
        />
      </div>
    );
  }

  // STEP 3

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='Imate li slike vaše nekretnine?'
          subtitle='Molimo vas učitajte slike nekretnine.'
        />

        <Controller
          name='image_src'
          control={control}
          defaultValue={''}
          rules={{
            required: true,
            validate: (image) => {
              if (image) return true;
              return 'Molimo vas da učitate željene slike';
            },
          }}
          render={({ field: { value, onChange } }) => (
            <ImageInput
              value={value}
              src={image}
              placeholder='Učitajte željene slike'
              id='image'
              type='file'
              disabled={isLoading}
              accept='image/*'
              multiple
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }

                const newValue = event.target.files?.[0];
                onChange(newValue);
                setCustomValue('image_src', newValue);
              }}
            />
          )}
        />
      </div>
    );
  }

  // STEP 4

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

  // STEP 5

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Kolika je ukupna cijena vaše nekretnine?'
          subtitle='Postavite traženu cijenu za vašu nekretninu.'
        />

        <Controller
          name='price'
          control={control}
          defaultValue={null}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <PriceInput
              id='price'
              label='Cijena'
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          )}
        />
        {/* <Input

          id='price'
          label='Cijena'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        /> */}
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
