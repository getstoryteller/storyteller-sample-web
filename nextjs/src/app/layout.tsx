import { Lexend } from 'next/font/google';
import localFont from 'next/font/local';
import { User as StorytellerUser } from '@getstoryteller/storyteller-sdk-javascript';
import AmplitudeContextProvider from '@/contexts/AmplitudeContext';
import EnvVariablesContext from '@/contexts/EnvVariablesContext';
import StorytellerContextProvider from '@/contexts/StorytellerContext';
import UiStyleContextProvider from '@/contexts/UiStyleContext';
import { ApiKeyForm, Footer, Header } from '@/components';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Storyteller Web SDK Sample | NextJS',
  description: 'Stories SDKs for iOS, Android & Web',
};

const euclid = localFont({
  src: [
    {
      path: './fonts/EuclidCircularB-Light-WebXL.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/EuclidCircularB-Regular-WebXL.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/EuclidCircularB-Medium-WebXL.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--type-body',
  display: 'swap',
});

const storytellerFont = localFont({
  src: './fonts/EuclidCircularB-Semibold-WebXL.woff2',
  variable: '--type-storyteller',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const languageSetting = StorytellerUser.getUserAttribute('language') || 'en';

  return (
    <EnvVariablesContext>
      <AmplitudeContextProvider>
        <StorytellerContextProvider>
          <UiStyleContextProvider>
            <html
              lang={languageSetting}
              className={`${euclid.variable} ${storytellerFont.variable}`}
            >
              <body>
                <ApiKeyForm>
                  <Header />
                  <main>{children}</main>
                  <Footer />
                </ApiKeyForm>
              </body>
            </html>
          </UiStyleContextProvider>
        </StorytellerContextProvider>
      </AmplitudeContextProvider>
    </EnvVariablesContext>
  );
}
