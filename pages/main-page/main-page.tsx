'use client';

import { useEffect, useRef, useState } from 'react';

import Header from '@/components/common/header';
import ProductList from '@/components/common/product-list';
import ReviewList from '@/components/common/review-list';

import { useLazyGetProductsQuery } from '@/services';
import type { IProduct } from '@/interfaces';

import styles from './main-page.module.scss';

const PAGE_SIZE = 10;

const MainPage = () => {
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [trigger, { data, isFetching, isLoading }] = useLazyGetProductsQuery();
  const hasMore = products.length < (data?.total || 0);

  useEffect(() => {
    trigger({ page, page_size: PAGE_SIZE }).then((res) => {
      if (res.data) {
        setProducts((prevState) => [...prevState, ...(res.data?.items ?? [])]);
      }
    });
  }, [page, trigger]);

  useEffect(() => {
    const el = observerRef.current;

    if (!el) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching && !isLoading) {
          setPage((prevState) => prevState + 1);
        }
      },
      { rootMargin: '400px' }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [hasMore, isFetching, isLoading, page]);

  return (
    <div className={styles.mainPage}>
      <Header />
      <main className={styles.mainPageContent}>
        <ReviewList />
        <ProductList ref={observerRef} isLoading={isFetching || isLoading} products={products} />
      </main>
    </div>
  );
};

export default MainPage;
