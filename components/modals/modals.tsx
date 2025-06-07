import Modal from './modal';

import { useAppSelector } from '@/hooks';

const Modals = () => {
  const activeModal = useAppSelector((state) => state.modal.activeModal);

  const renderModal = () => {
    if (!activeModal) {
      return null;
    }

    return <Modal modalName={activeModal} />;
  };

  return <>{renderModal()}</>;
};

export default Modals;
