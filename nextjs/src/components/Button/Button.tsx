import {
  createElement,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
} from 'react';
import Link, { LinkProps } from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import styles from './Button.module.scss';

type SharedProps = {
  label: string;
  size?: 'regular' | 'large';
  variant?: 'primary' | 'tint';
  arrowDirection?: 'left' | 'right';
};

type ButtonAsLinkProps = {
  as: 'Link';
} & SharedProps &
  LinkProps;

type ButtonProps = {
  as?: 'button';
} & SharedProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button({
  as = 'button',
  arrowDirection,
  label,
  size = 'regular',
  variant = 'primary',
  ...props
}: ButtonAsLinkProps | ButtonProps) {
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
