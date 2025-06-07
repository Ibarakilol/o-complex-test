'use client';

import { type FC, useRef } from 'react';
import clsx from 'clsx';

import ModalCart from '../modal-cart';
import ModalSuccess from '../modal-success';

import { closeModal } from '@/store/modal-slice';

import { Key, ModalName } from '@/constants';
import {
  useAppDispatch,
  useKeyUpGlobal,
  useOnClickOutside,
  useUnmountAnimation,
  useWindowScrollBlock,
} from '@/hooks';
import type { ICommonModalProps } from '@/interfaces';
import type { ModalProps } from './modal.props';

import styles from './modal.module.scss';

const MODAL_COMPONENTS: Record<ModalName, FC<ICommonModalProps>> = {
  [ModalName.CART]: ModalCart,
  [ModalName.SUCCESS]: ModalSuccess,
};

const Modal = ({ modalName }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const { isUnmounting, onAnimationEnd, unmountComponent } = useUnmountAnimation(handleCloseModal);

  useOnClickOutside(modalRef, unmountComponent, modalName === ModalName.SUCCESS);
  useKeyUpGlobal(Key.ESCAPE, (evt) => {
    evt.stopPropagation();
    unmountComponent();
  });
  useWindowScrollBlock(true);

  const ModalComponent = MODAL_COMPONENTS[modalName] || null;

  return (
    <div className={clsx(styles.modal, isUnmounting && styles.modalHiding)}>
      <div ref={modalRef} className={styles.modalWrapper} onAnimationEnd={onAnimationEnd}>
        <ModalComponent onCloseButtonClick={unmountComponent} />
      </div>
    </div>
  );
};

export default Modal;
