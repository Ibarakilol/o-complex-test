import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type ModalName } from '@/constants';

type TModalState = Record<string, any>;

interface ModalState {
  activeModal: ModalName | null;
  modalState: TModalState | null;
}

const initialState: ModalState = {
  activeModal: null,
  modalState: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<{ modal: ModalName; state?: TModalState }>) => {
      state.activeModal = action.payload.modal;
      state.modalState = action.payload.state ?? null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalState = null;
    },
  },
});

export const { showModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
