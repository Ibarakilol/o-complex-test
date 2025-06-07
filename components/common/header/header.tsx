'use client';

import clsx from 'clsx';

import IconButton from '@/components/ui/icon-button';
import CartIcon from '@/assets/icons/cart.svg';

import { showModal } from '@/store/modal-slice';

import { ModalName } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';

import styles from './header.module.scss';

const Header = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleOpenCart = () => dispatch(showModal({ modal: ModalName.CART }));

  return (
    <div className={styles.header}>
      <span className={styles.headerLogo}>O-complex Test</span>
      <IconButton
        ariaLabel="Корзина"
        className={clsx(styles.headerCartButton, items.length && styles.headerCartButtonFilled)}
        icon={<CartIcon />}
        onClick={handleOpenCart}
      />
    </div>
  );
};

export default Header;
