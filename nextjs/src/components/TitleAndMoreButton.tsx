'use client';

import Link from 'next/link';

interface Props {
  title?: string | undefined;
  moreButtonTitle?: string | undefined;
  category?: string | undefined;
}

const TitleAndMoreButton = ({ title, moreButtonTitle, category }: Props) =>
  title || moreButtonTitle ? (
    <div className="flex space-between row mt-8">
      {title && <h2 className="text-lg sm:text-2xl font-bold px-4">{title}</h2>}
      {title && moreButtonTitle && (
        <div className="ml-auto">
          <Link
            href={encodeURI(`/category/${category}/${title}`)}
            className="hover:underline pr-4 hover:text-white/[0.8] transition-all duration-200"
          >
            {moreButtonTitle}
          </Link>
        </div>
      )}
    </div>
  ) : (
    <></>
  );

export default TitleAndMoreButton;
