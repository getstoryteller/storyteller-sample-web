'use client';

import { useEnvVariables } from '@/hooks/useEnvVariables';
import {
  getLocalStorageSetting,
  LOCAL_STORAGE_KEYS,
} from '@/helpers/getLocalStorageSetting';
import { useSettingsForm } from './useSettingsForm';
import type { ChangeEvent } from 'react';

import styles from './SettingsForm.module.scss';

export function SettingsForm({ onSubmit }: { onSubmit: () => void }) {
  const { setStorytellerApiKey, setAmplitudeApiKey } = useEnvVariables();

  const { formData, onFieldChange } = useSettingsForm({
    storytellerApiKey: getLocalStorageSetting(LOCAL_STORAGE_KEYS.STORYTELLER),
    amplitudeApiKey: getLocalStorageSetting(LOCAL_STORAGE_KEYS.AMPLITUDE),
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setStorytellerApiKey(formData.storytellerApiKey);
        setAmplitudeApiKey(formData.amplitudeApiKey);
        onSubmit();
      }}
    >
      <TextField
        label="Storyteller API key"
        onChange={onFieldChange}
        placeholder="0000-0000-0000-0000"
        value={formData.storytellerApiKey}
      />
      <TextField
        label="Amplitude API key"
        onChange={onFieldChange}
        placeholder="0000-0000-0000-0000"
        value={formData.amplitudeApiKey}
      />
      <button type="submit">Apply changes</button>
    </form>
  );
}

type TextFieldProps = {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

function TextField({ label, ...inputProps }: TextFieldProps) {
  return (
    <label>
      {label}
      <input {...inputProps} />
    </label>
  );
}
