'use client';

import Loader from '@/assets/loader.svg';

import { useGetReviewsQuery } from '@/services';
import { getSanitizedHtml } from '@/utils';

import styles from './review-list.module.scss';

const ReviewList = () => {
  const { data: reviews, isFetching, isLoading } = useGetReviewsQuery();

  return (
    <section className={styles.reviewList}>
      <h2 className={styles.reviewListTitle}>Отзывы</h2>

      <div className={styles.reviewListItems}>
        {isFetching || isLoading ? (
          <Loader />
        ) : (
          reviews?.map(({ id, text }) => (
            <div
              key={id}
              className={styles.reviewListItem}
              dangerouslySetInnerHTML={getSanitizedHtml(text)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewList;
