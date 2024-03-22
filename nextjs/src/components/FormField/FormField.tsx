import type {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

import styles from './FormField.module.scss';

type FormFieldProps = {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  value: string;
};

type TextFieldProps = {
  error?: string;
  placeholder: string;
} & FormFieldProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function TextField({ error, label, ...inputProps }: TextFieldProps) {
  return (
    <div>
      <label className={styles.label}>
        {label}
        <input
          className={styles.input}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputProps.name}-Error` : undefined}
          {...inputProps}
        />
      </label>
      {error && (
        <p id={`${inputProps.name}-Error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = FormFieldProps & {
  options: { label: string; value: string }[];
};

export function SelectField({
  label,
  options,
  ...inputProps
}: SelectFieldProps) {
  return (
    <div>
      <label className={styles.label}>
        {label}
        <select className={styles.input} {...inputProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
