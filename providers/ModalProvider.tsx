'use client';

import { useEffect, useState } from 'react';

import UploadModal from '@/app/components/Modals/UploadModal';
import AuthModal from '@/app/components/Modals/AuthModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
