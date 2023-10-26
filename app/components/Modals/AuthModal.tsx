'use client';

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './AuthModalHelper';
import AuthModalHelper from './AuthModalHelper';

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AuthModalHelper
      title='Dobrodošli nazad'
      description='Prijavite se!'
      isOpen={isOpen}
      onChange={onChange}
    >
      {/* napraviti custom AUTH UI  */}
      <Auth
        providers={['google']}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#155287',
                brandAccent: '#3b5dad',
                inputBackground: '#F7F7F3',
                inputBorderFocus: '#155287',
                inputBorderHover: '#3b5dad',
              },
            },
          },
        }}
      />
    </AuthModalHelper>
  );
};

export default AuthModal;
