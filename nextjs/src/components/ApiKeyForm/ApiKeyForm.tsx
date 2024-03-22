'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { useEnvVariables } from '@/hooks/useEnvVariables';
import { TextField } from '@/components/FormField/FormField';
import { Button } from '@/components/Button/Button';
import { Logo } from '@/components/Logo/Logo';

import styles from './ApiKeyForm.module.scss';

type LoginState = 'loading' | 'logged-in' | 'logged-out';

export function ApiKeyForm({ children }: { children: ReactNode }) {
  const [loginState, setLoginState] = useState<LoginState>('loading');
  const { storytellerApiKey, setStorytellerApiKey } = useEnvVariables();
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    if (storytellerApiKey) {
      setLoginState('logged-in');
    } else {
      setLoginState('logged-out');
    }
  }, [storytellerApiKey]);

  if (loginState === 'loading') {
    return <LoadingScreen />;
  }

  if (loginState === 'logged-in') {
    return children;
  }

  return (
    <main className={styles.login}>
      <div className={styles.form}>
        <Logo width={200} height={40} />
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!!apiKey) {
              setStorytellerApiKey(apiKey);
            }
          }}
        >
          <p>Please enter your API key to proceed.</p>
          <TextField
            autoComplete="current-password"
            name="apiKey"
            // @todo validation?
            // error="The access code you entered is incorrect. Please double-check your code and try again."
            label="API key"
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="0000-0000-0000-0000"
            value={apiKey}
          />
          <Button
            arrowDirection="right"
            label="Get started"
            type="submit"
            size="large"
          />
        </form>
      </div>
      <div className={styles.illustration}>
        <Image
          data-theme="light"
          src="/login-illustration.png"
          alt=""
          width={542}
          height={743}
        />
        <Image
          data-theme="dark"
          src="/login-illustration-light.png"
          alt=""
          width={542}
          height={743}
        />
      </div>
    </main>
  );
}

function LoadingScreen() {
  return (
    <div className={styles.loader}>
      <p className="sr-only">Loading...</p>
      <div className={styles.loadingSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
