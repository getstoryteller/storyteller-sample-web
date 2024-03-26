import { SettingsForm } from '@/components/SettingsForm/SettingsForm';

import styles from './settings.module.scss';

export default function SettingsPage() {
  return (
    <div className={styles.settings}>
      <h2>Personalisation</h2>
      <SettingsForm />
    </div>
  );
}
