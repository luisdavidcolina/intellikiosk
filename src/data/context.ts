import {createContext} from 'react';

export interface IItem {
  type?: string;
  menuName?: string;
  menuInfo?: string;
  modifiers?: string[];
  price?: string;
  img?: string;
  setImg?: string;
  setType?: string;
}
export interface IMenu {
  orderId: number,
  item: IItem | null,
  items: IItem[],
  paymentType: string,
  setItem: (item: IItem | null) => void,
  setItems: (items: IItem[]) => void,
  setOrderId: (orderId: number) => void,
  setPaymentType: (paymentType: string) => void
  statusOrder: number
  setStatusOrder: (orderId: number) => void,
}

const menu: IMenu = {
  orderId: 0,
  item: null,
  items: [],
  paymentType: '',
  setItem: (item: IItem | null) => {},
  setItems: (items: IItem[]) => {},
  setOrderId: (orderId: number) => {},
  setPaymentType: (paymentType: string) => {},
  statusOrder: 0,
  setStatusOrder: (orderId: number) => {},
}

export interface IPage {
  page: string;
  setPage: (page: string) => void;
}

const page: IPage = {
  page: 'home',
  setPage: (page: string) => {}
}

export interface IStep {
  step: number;
  setStep: (step: number) => void
}

const step: IStep = {
  step: 0,
  setStep: (step: number) => {}
}

export interface IModal {
  active: boolean;
  modal: string;
  modalProps?: any;
  openModal: (modal: string, modalProps?: any) => void;
  closeModal: () => void;
}

const modal: IModal = {
  active: false,
  modal: '',
  modalProps: {},
  openModal: () => {},
  closeModal: () => {},
}

export const MenuContext = createContext(menu);

export const PageContext = createContext(page);

export const StepContext = createContext(step);

export const ModalContext = createContext(modal);