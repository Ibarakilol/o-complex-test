import { Roboto } from 'next/font/google';
import Head from 'next/head';

import Modals from '@/components/modals';
import MainPage from './main-page';

const fontSans = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>O-complex Test</title>
        <meta content="Тестовое задание для O-complex" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className={fontSans.variable}>
        <MainPage />
        <Modals />
      </div>
    </>
  );
}
