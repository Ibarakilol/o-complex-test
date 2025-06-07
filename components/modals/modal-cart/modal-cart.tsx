'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

import { changePhone, clearCart } from '@/store/cart-slice';
import { showModal } from '@/store/modal-slice';

import { ModalName, Regex } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useCreateOrderMutation } from '@/services';
import { getOnlyNumbers } from '@/utils';

import styles from './modal-cart.module.scss';

const ModalCart = () => {
  const { items, phone } = useAppSelector((state) => state.cart);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const handleChangePhone = (value: string) => {
    setIsPhoneValid(true);
    dispatch(changePhone(value));
  };
  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();

  const handleCreateOrder = async () => {
    if (!Regex.PHONE.test(phone)) {
      setIsPhoneValid(false);
      return;
    }

    const cart = items.map((item) => ({ id: item.id, quantity: item.quantity }));

    await createOrder({ phone: getOnlyNumbers(phone), cart });
  };

  useEffect(() => {
    const handleClearCart = () => dispatch(clearCart());
    const handleShowSuccessModal = () => dispatch(showModal({ modal: ModalName.SUCCESS }));

    if (isSuccess) {
      handleClearCart();
      handleShowSuccessModal();
    }
  }, [dispatch, isSuccess]);

  return (
    <div className={styles.modalCart}>
      <span className={styles.modalCartTitle}>Добавленные товары</span>
      {!!items.length && (
        <ul className={styles.modalCartItems}>
          {items.map((item) => (
            <li key={item.id} className={styles.modalCartItem}>
              <span className={styles.modalCartItemTitle}>{item.title}</span>
              <div className={styles.modalCartItemTotal}>
                <span className={styles.modalCartItemQuantity}>X{item.quantity}</span>
                <span className={styles.modalCartItemPrice}>{item.price * item.quantity} ₽</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.modalCartActions}>
        <Input
          isDisabled={isLoading}
          isValid={isPhoneValid}
          mask="+7 (999) 999 99-99"
          maskPlaceholder="_"
          placeholder="Телефон"
          value={phone}
          onChange={handleChangePhone}
        />
        <Button isDisabled={isLoading} label="Заказать" onClick={handleCreateOrder} />
      </div>
    </div>
  );
};

export default ModalCart;
