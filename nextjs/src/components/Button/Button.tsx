import { createElement } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import type { ButtonProps } from './types';

import styles from './Button.module.scss';

export function Button({
  as = 'button',
  arrowDirection,
  label,
  size = 'regular',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return createElement(
    as === 'Link' ? Link : 'button',
    {
      className: `${styles.button} ${styles[`${variant}Button`]} ${
        styles[`${size}Button`]
      }`,
      ...props,
    },
    <>
      {arrowDirection === 'left' && (
        <ArrowLeftIcon aria-hidden="true" strokeWidth={2.5} />
      )}
      <span>{label}</span>
      {arrowDirection === 'right' && (
        <ArrowRightIcon aria-hidden="true" strokeWidth={2.5} />
      )}
    </>,
  );
}
