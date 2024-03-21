'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { SettingsForm } from '../SettingsForm/SettingsForm';

import styles from './Header.module.scss';

export function Header() {
  const [isSettingsFormVisible, setIsSettingsFormVisible] =
    useState<boolean>(false);

  return (
    <>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/">
          <span className="sr-only">Storyteller demo</span>
          <Image
            className={styles.logo}
            data-theme="light"
            src="/storyteller-logo.svg"
            alt="Storyteller Logo"
            width={200}
            height={40}
            priority={true}
          />
          <Image
            className={styles.logo}
            data-theme="dark"
            src="/storyteller-logo-light.svg"
            alt="Storyteller Logo"
            width={200}
            height={40}
            priority={true}
          />
        </Link>
        <button
          className={styles.settingsBtn}
          aria-expanded={isSettingsFormVisible ? 'true' : 'false'}
          aria-controls="settings-form"
          onClick={() => setIsSettingsFormVisible(!isSettingsFormVisible)}
          title={`${isSettingsFormVisible ? 'Collapse' : 'Expand'} settings`}
        >
          {isSettingsFormVisible ? (
            <XMarkIcon aria-hidden="true" />
          ) : (
            <Cog8ToothIcon aria-hidden="true" />
          )}
        </button>
        {/* <UserOptions /> */}
      </nav>
      <div
        className={styles.settings}
        data-expanded={isSettingsFormVisible ? 'true' : 'false'}
        id="settings-form"
        role="region"
        tabIndex={isSettingsFormVisible ? undefined : -1}
      >
        <SettingsForm onSubmit={() => setIsSettingsFormVisible(false)} />
      </div>
    </>
  );
}
