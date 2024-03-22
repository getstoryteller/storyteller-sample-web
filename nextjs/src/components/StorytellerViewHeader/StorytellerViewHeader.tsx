import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import type { Url } from 'next/dist/shared/lib/router/router';

import styles from './StorytellerViewHeader.module.scss';
import { Button } from '../Button/Button';

interface StorytellerViewHeaderProps {
  moreButton?: {
    link: Url;
    title: string;
  };
  title: string;
}

export function StorytellerViewHeader({
  moreButton,
  title,
}: StorytellerViewHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {moreButton && (
        <Button
          as="Link"
          arrowDirection="right"
          href={moreButton.link}
          label={moreButton.title}
          variant="tint"
        />
      )}
    </div>
  );
}
