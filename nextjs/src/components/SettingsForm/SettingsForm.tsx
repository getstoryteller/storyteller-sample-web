'use client';

import { useRouter } from 'next/navigation';
import { useUiStyle } from '@/hooks/useUiStyle';
import { Button } from '@/components/Button/Button';
import { SelectField } from '@/components/FormField/FormField';
import { useSettingsForm } from './useSettingsForm';
import type { UiStyle } from '@getstoryteller/storyteller-sdk-javascript';

import styles from './SettingsForm.module.scss';

export function SettingsForm() {
  const router = useRouter();
  const { uiStyle, setUiStyle } = useUiStyle();
  const { formData, onFieldChange } = useSettingsForm({
    uiStyle,
  });

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();

        setUiStyle(formData.uiStyle as UiStyle);
        router.push('/');
      }}
    >
      <SelectField
        label="UI style"
        name="uiStyle"
        onChange={onFieldChange}
        value={formData.uiStyle}
        options={[
          { label: 'Auto', value: 'auto' },
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ]}
      />
      <Button type="submit" label="Save changes" size="large" />
    </form>
  );
}
