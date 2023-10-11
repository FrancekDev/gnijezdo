'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
// import { signIn } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useRef, useState } from 'react';
// import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
// import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from './Modal';
// import Heading from "../Heading";
import Button from '../Button';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
// import Input from "../Inputs/Input";

const RegisterModal = () => {
  //   const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLodaing, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        // toast.success('Regestrated!');
        // loginModal.onOpen();
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Greška!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Vaše Gnijezdo vas čeka.' subtitle='Postanite korisnik!' />
      <Input
        id='email'
        label='Email'
        disabled={isLodaing}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Korisničko ime'
        disabled={isLodaing}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='password'
        disabled={isLodaing}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='potvrdi password'
        disabled={isLodaing}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='mt-3 flex flex-col gap-2'>
      <hr />
      <Button
        outline
        label='Nastavite sa Google računom'
        icon={FcGoogle}
        onClick={() => {}}
        // onClick={() => signIn('google')}
      />
      <div
        className='text-cneter
      mt-4
      font-light
      text-neutral-500'
      >
        <div className='itmes-center flex flex-row justify-center gap-2'>
          <div>Već ste registrirani?</div>
          <div
            // onClick={toggle}
            className='cursor-pointer text-blu hover:underline'
          >
            Prijavite se
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLodaing}
      isOpen={registerModal.isOpen}
      title='Registracija'
      actionLabel='Registriraj se'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
