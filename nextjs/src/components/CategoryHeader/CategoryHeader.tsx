import { Button } from '@/components/Button/Button';

import styles from './CategoryHeader.module.scss';

export function CategoryHeader({ title }: { title: string }) {
  return (
    <div className={styles.header}>
      <Button
        as="Link"
        arrowDirection="left"
        href="/"
        label="Back"
        variant="tint"
      />
      <h1>{title}</h1>
    </div>
  );
}
