import Button from '@/components/ui/button';

import type { ICommonModalProps } from '@/interfaces';

import styles from './modal-success.module.scss';

const ModalSuccess = ({ onCloseButtonClick }: ICommonModalProps) => {
  return (
    <div className={styles.modalSuccess}>
      <span className={styles.modalSuccessTitle}>Ваш заказ успешно создан!</span>
      <Button label="Закрыть" onClick={onCloseButtonClick} />
    </div>
  );
};

export default ModalSuccess;
