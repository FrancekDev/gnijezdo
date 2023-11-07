'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { IoMdClose } from 'react-icons/io';

import * as Dialog from '@radix-ui/react-dialog';

import Button from '../Button';

interface ModalHelperProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: React.ReactElement | string;
  description?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const ModalHelper: React.FC<ModalHelperProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  return (
    <>
      <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            className=' 
            fixed
            inset-0
            z-20
            bg-neutral-700/70
            backdrop-blur-sm'
          />
          <Dialog.Content
            className='
          fixed
          left-[50%] 
          top-[50%] 
          z-30 
          h-full 
          max-h-full 
          w-full 
          translate-x-[-50%] 
          translate-y-[-50%] 
          rounded-md
          bg-bei 
          p-[25px] 
          drop-shadow-md 
          focus:outline-none 
          md:h-auto 
          md:max-h-[85vh]
          md:w-[90vw] md:max-w-[600px]
          '
          >
            <Dialog.Close asChild>
              <button
                className='
                  absolute 
                  right-[10px] 
                  top-[10px] 
                  inline-flex 
                  h-[25px] 
                  w-[25px] 
                  appearance-none 
                  items-center 
                  justify-center 
                  rounded-full 
                  text-blu
                  hover:text-secBlu
                  focus:outline-none'
              >
                <IoMdClose size={24} />
              </button>
            </Dialog.Close>

            <Dialog.Title
              className='
              mb-2
              text-center 
              text-xl 
              font-bold
              text-blu'
            >
              {title}
            </Dialog.Title>
            <hr className='border-blu' />

            {description && (
              <Dialog.Description
                className={`mb-5 mt-2 text-center font-light text-neutral-500`}
              >
                {description}
              </Dialog.Description>
            )}

            <div>
              <div className='relative flex-auto gap-2 p-5'>{body}</div>
            </div>

            <div className='flex flex-col p-5 pt-1'>
              <div
                className='
                    flex 
                    w-full 
                    flex-row 
                    items-center 
                    gap-4
                  '
              >
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default ModalHelper;
