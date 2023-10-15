import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
import { Arapey } from 'next/font/google';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className=' 
            fixed
            inset-0
            bg-neutral-700/70
            backdrop-blur-sm'
        />
        <Dialog.Content
          className='
          fixed 
          left-[50%] 
          top-[50%] 
          h-full 
          max-h-full 
          w-full 
          translate-x-[-50%] 
          translate-y-[-50%] 
          rounded-md
          bg-bei
          p-[25px]
          text-blu 
          drop-shadow-md 
          focus:outline-none 
          md:h-auto 
          md:max-h-[85vh] 
          md:w-[90vw] 
          md:max-w-[450px]'
        >
          <Dialog.Title
            className='
              mb-4 
              text-center 
              text-xl 
              font-bold'
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className={`
              mb-5
              text-center 
              text-sm
              leading-normal
              `}
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
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
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

// "use client"

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { IoMdClose } from 'react-icons/io';
// import Button from '../Button';

// interface ModalProps {
//   isOpen?: boolean;
//   onClose: () => void;
//   onSubmit: () => void;
//   title?: string;
//   body?: React.ReactElement;
//   footer?: React.ReactElement;
//   actionLabel: string;
//   disabled?: boolean;
//   secondaryAction?: () => void;
//   secondaryActionLabel?: string;
// }

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
//   title,
//   body,
//   actionLabel,
//   footer,
//   disabled,
//   secondaryAction,
//   secondaryActionLabel,
// }) => {
//   const [showModal, setShowModal] = useState(isOpen);
//   const modalRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     setShowModal(isOpen);
//   }, [isOpen]);

//   const handleClose = useCallback(() => {
//     if (disabled) {
//       return;
//     }
//     // onSubmit();
//     setShowModal(false);
//     setTimeout(() => {
//       onClose();
//     }, 300);
//   }, [disabled, onClose]);

//   const handleSubmit = useCallback(() => {
//     if (disabled) {
//       return;
//     }
//     onSubmit();
//   }, [onSubmit, disabled]);

//   const handleSecondaryAction = useCallback(() => {
//     if (disabled || !secondaryAction) {
//       return;
//     }
//     secondaryAction();
//   }, [secondaryAction, disabled]);

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleOutsideClick = (event: MouseEvent) => {
//       const el = modalRef?.current;

//       if (!el?.contains(event.target as Node)) {
//         isOpen: false;
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [handleClose, isOpen]);

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <>
//       {/* dimmed background */}
//       <div
//         ref={modalRef}
//         onClick={handleClose}
//         className='
//       fixed
//       inset-0
//       z-50
//       flex
//       items-center
//       justify-center
//       overflow-y-auto
//       overflow-x-hidden
//       bg-neutral-800/70
//       outline-none
//       focus:outline-none
//     '
//       >
//         <div
//           className='
//           relative
//           mx-auto
//           my-6
//           h-full
//           w-full
//           md:h-auto
//           md:w-4/6
//           lg:h-auto
//           lg:w-3/6
//           xl:w-2/5
//           '
//         >
//           {/* content */}
//           <div
//             onClick={(e) => {
//               // do not close modal if anything inside modal content is clicked
//               e.stopPropagation();
//             }}
//             className={`
//             translate
//             h-full
//             duration-300
//             ${showModal ? 'translate-y-0' : 'translate-y-full'}
//             ${showModal ? 'opacity-100' : 'opacity-0'}
//           `}
//           >
//             <div
//               className='
//               translate
//               relative
//               flex
//               h-full
//               w-full
//               flex-col
//               rounded-lg
//               border-0
//             bg-white
//               shadow-lg
//               outline-none
//               focus:outline-none
//               md:h-auto
//               lg:h-auto
//             '
//             >
//               {/* header */}
//               <div
//                 className='
//                 relative
//                 flex
//                 items-center
//                 justify-center
//                 rounded-t
//                 border-b-[1px]
//                 border-blu
//                 p-6
//                 '
//               >
//                 <button
//                   className='
//                     absolute
//                     left-9
//                     border-0
//                     p-1
//                     transition
//                     hover:opacity-70
//                   '
//                   onClick={handleClose}
//                 >
//                   <IoMdClose size={18} className='text-blu' />
//                 </button>
//                 <div className='text-lg font-semibold'>{title}</div>
//               </div>
//               {/*body*/}
//               <div className='relative flex-auto p-6'>{body}</div>
//               {/*footer*/}
//               <div className='flex flex-col gap-2 p-6'>
//                 <div
//                   className='
//                     flex
//                     w-full
//                     flex-row
//                     items-center
//                     gap-4
//                   '
//                 >
//                   {secondaryAction && secondaryActionLabel && (
//                     <Button
//                       disabled={disabled}
//                       label={secondaryActionLabel}
//                       onClick={handleSecondaryAction}
//                     />
//                   )}
//                   <Button
//                     disabled={disabled}
//                     label={actionLabel}
//                     onClick={handleSubmit}
//                   />
//                 </div>
//                 {footer}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Modal;
