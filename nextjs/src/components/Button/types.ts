import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import type { LinkProps } from 'next/link';

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

type ButtonAsButtonProps = {
  as?: 'button';
} & SharedProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;
