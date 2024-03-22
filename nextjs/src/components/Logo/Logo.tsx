import Image, { type ImageProps } from 'next/image';

import styles from './Logo.module.scss';

export function Logo({ ...props }: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <>
      <Image
        {...props}
        className={styles.logo}
        data-theme="light"
        src="/storyteller-logo.svg"
        alt="Storyteller Logo"
      />
      <Image
        {...props}
        className={styles.logo}
        data-theme="dark"
        src="/storyteller-logo-light.svg"
        alt="Storyteller Logo"
      />
    </>
  );
}
