
import { create } from 'zustand';

type ModalType = 'login' | 'signup' | 'forgotPassword' | null;

type ModalState = {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
}));

    