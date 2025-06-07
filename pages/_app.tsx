import type { AppProps } from 'next/app';

import StoreProvider from '@/providers/store-provider';

import '@/scss/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
