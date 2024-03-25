'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useEnvVariables } from '@/hooks/useEnvVariables';
import { Logo } from '@/components/Logo/Logo';

import styles from './Header.module.scss';

export function Header() {
  const { setStorytellerApiKey } = useEnvVariables();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const burgerIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutsideDropdown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        burgerIconRef.current &&
        dropdownRef.current &&
        !burgerIconRef.current.contains(target) &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, [burgerIconRef, dropdownRef]);

  return (
    <>
      <header className={styles.header} aria-label="Main navigation">
        <Link href="/">
          <span className="sr-only">Storyteller demo</span>
          <Logo width={200} height={40} priority />
        </Link>
        <div className={styles.burgerMenu}>
          <button
            className={styles.burgerIcon}
            aria-expanded={isDropdownVisible ? 'true' : 'false'}
            aria-controls="nav"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            title={`${isDropdownVisible ? 'Collapse' : 'Expand'} menu`}
            ref={burgerIconRef}
          >
            <Bars3Icon aria-hidden="true" strokeWidth={2.5} />
          </button>
          <nav
            className={styles.nav}
            data-expanded={isDropdownVisible ? 'true' : 'false'}
            id="nav"
            tabIndex={isDropdownVisible ? undefined : -1}
            ref={dropdownRef}
          >
            <ul>
              <li>
                <Link href="/" onClick={() => setIsDropdownVisible(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  onClick={() => setIsDropdownVisible(false)}
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsDropdownVisible(false);
                    setStorytellerApiKey('');
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
