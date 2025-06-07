'use client';

import { forwardRef } from 'react';

import ProductCard from '../product-card';
import Loader from '@/assets/loader.svg';

import type { ProductListProps } from './product-list.props';

import styles from './product-list.module.scss';

const ProductList = forwardRef<HTMLDivElement, ProductListProps>(({ isLoading, products }, ref) => {
  return (
    <section className={styles.productList}>
      <h2 className={styles.productListTitle}>Товары</h2>

      <div className={styles.productListItems}>
        {isLoading && !products.length ? (
          <Loader />
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>

      <div ref={ref} className={styles.productListTrigger} />
    </section>
  );
});

ProductList.displayName = 'ProductList';
export default ProductList;
