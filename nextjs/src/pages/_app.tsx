import { AppProps } from 'next/app';

import '@getstoryteller/storyteller-sdk-javascript/dist/storyteller.min.css';
import '../app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
