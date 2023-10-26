import useUploadModal from '@/hooks/useUploadModal';

import ModalHelper from './ModalHelper';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { useMemo, useState } from 'react';
import CategoryInputs from '../Inputs/CategoryInputs';
import { categories } from '../Categories/Categories';
import { FieldValues, useForm } from 'react-hook-form';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const UploadModal = () => {
  const uploadModal = useUploadModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');

  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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

  let bodyContent = (
    <div className='flex flex-col gap-6'>
      <Heading
        title='Koje je vrste vaša nekretnina?'
        subtitle='Izaberite kategoriju'
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

  return (
    <ModalHelper
      isOpen={uploadModal.isOpen}
      onClose={uploadModal.onClose}
      onSubmit={uploadModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Opišite svoju nekretninu'
      body={bodyContent}
    />
  );
};

export default UploadModal;
