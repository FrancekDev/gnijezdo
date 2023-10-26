'use client';

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#E6E4E0',
          color: '#155287',
        },
      }}
    />
  );
};

export default ToasterProvider;
