import { Lexend } from 'next/font/google';
import { User as StorytellerUser } from '@getstoryteller/storyteller-sdk-javascript';
import AmplitudeContextProvider from '@/contexts/AmplitudeContext';
import EnvVariablesContext from '@/contexts/EnvVariablesContext';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import { Footer, Header } from '@/components';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Storyteller Web SDK Sample | NextJS',
  description: 'Stories SDKs for iOS, Android & Web',
};

const roboto = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  style: ['normal'],
  variable: '--type-body',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const languageSetting = StorytellerUser.getUserAttribute('language') || 'en';

  return (
    <EnvVariablesContext>
      <AmplitudeContextProvider>
        <StorytellerContextProvider>
          <html lang={languageSetting} className={roboto.variable}>
            <body>
              <Header />
              <main className="container">{children}</main>
              <Footer />
            </body>
          </html>
        </StorytellerContextProvider>
      </AmplitudeContextProvider>
    </EnvVariablesContext>
  );
}
