import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import type { Url } from 'next/dist/shared/lib/router/router';

import styles from './StorytellerViewHeader.module.scss';

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
        <Link href={moreButton.link} className={styles.moreLink}>
          {moreButton.title} <ArrowRightCircleIcon aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
