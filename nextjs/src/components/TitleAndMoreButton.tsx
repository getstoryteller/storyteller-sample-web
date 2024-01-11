'use client';

import Link from 'next/link';
import type { Url } from 'next/dist/shared/lib/router/router';

interface Props {
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  moreButton?: {
    title: string;
    link: Url;
  };
}

const TitleAndMoreButton = ({ title, moreButton }: Props) =>
  title || moreButton ? (
    <div className="flex space-between row mt-8">
      {title && <h2 className="text-lg sm:text-2xl font-bold px-4">{title}</h2>}
      {title && moreButton && (
        <div className="ml-auto">
          <Link
            href={moreButton.link}
            className="hover:underline pr-4 hover:text-white/[0.8] transition-all duration-200"
          >
            {moreButton.title}
          </Link>
        </div>
      )}
    </div>
  ) : (
    <></>
  );

export default TitleAndMoreButton;
