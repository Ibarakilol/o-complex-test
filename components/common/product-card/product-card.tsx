'use client';

import { useMemo } from 'react';
import Image from 'next/image';

import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import Input from '@/components/ui/input';
import MinusIcon from '@/assets/icons/minus.svg';
import PlusIcon from '@/assets/icons/plus.svg';

import { addToCart, changeQuantity, removeFromCart } from '@/store/cart-slice';

import { WindowWidth } from '@/constants';
import { useAppDispatch, useAppSelector, useWindowSize } from '@/hooks';
import { getOnlyNumbers } from '@/utils';
import type { ProductCardProps } from './product-card.props';

import styles from './product-card.module.scss';

const ProductCard = ({ product }: ProductCardProps) => {
  const windowSize = useWindowSize();
  const { description, image_url, price, title } = product;
  const cartItem = useAppSelector((state) => state.cart.items).find(
    (item) => item.id === product.id
  );
  const dispatch = useAppDispatch();
  const handleAddToCart = () => dispatch(addToCart(product));
  const handleRemoveFromCart = () => dispatch(removeFromCart(product.id));
  const handleChangeQuantity = (quantity: string) =>
    dispatch(changeQuantity({ ...product, quantity: Number(getOnlyNumbers(quantity)) }));

  const isLaptop = useMemo(() => windowSize.width >= WindowWidth.LAPTOP, [windowSize.width]);

  return (
    <div className={styles.productCard}>
      <div className={styles.productCardContent}>
        <Image
          alt={title}
          className={styles.productCardImage}
          height={300}
          priority
          src={image_url}
          width={isLaptop ? 400 : 300}
        />
        <h3 className={styles.productCardTitle}>{title}</h3>
        <p className={styles.productCardDescription}>{description}</p>
        <span className={styles.productCardPrice}>{price} ₽</span>
      </div>

      <div className={styles.productCardActions}>
        {cartItem ? (
          <>
            <IconButton ariaLabel="Удалить" icon={<MinusIcon />} onClick={handleRemoveFromCart} />
            <Input value={cartItem.quantity.toString()} onChange={handleChangeQuantity} />
            <IconButton ariaLabel="Добавить" icon={<PlusIcon />} onClick={handleAddToCart} />
          </>
        ) : (
          <Button label="Купить" onClick={handleAddToCart} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
