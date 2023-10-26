import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface AuthModalHelperProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  body?: React.ReactElement;
}

const AuthModalHelper: React.FC<AuthModalHelperProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
  body,
}) => {
  return (
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
              <IoMdClose size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthModalHelper;
