import type {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';
import type { ButtonProps } from '@/components/Button/types';

type FormFieldProps = {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: string;
};

export type TextFieldProps = {
  buttonProps?: ButtonProps;
  error?: string;
  placeholder: string;
} & FormFieldProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type SelectFieldProps = FormFieldProps & {
  options: { label: string; value: string }[];
};
