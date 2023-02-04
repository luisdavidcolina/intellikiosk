import { useContext } from 'react';
import styled from 'styled-components';
import Packing from './Packing';
import Billing from './Billing';
import SelectSet from './SelectSet';
import UpgradeSet from './UpgradeSet';
import { ModalContext } from '@/data/context';

const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalMask = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .6);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 83.33vw;
  // min-height: 47.92vh;
  background-color: #fff;
  z-index: 1001;
`;

const modalRenderer = (modal: string) => {
  switch(modal) {
    default:
      return <></>;
    case 'packing':
      return <Packing />;
    case 'billing':
      return <Billing />;
    case 'selectSet':
      return <SelectSet />;
    case 'upgradeSet':
      return <UpgradeSet />;
  }
}

const Modal = () => {
  const { modal } = useContext(ModalContext);
  return <ModalWrapper>
    <ModalMask />
    <ModalContainer>
      {modalRenderer(modal)}
    </ModalContainer>
  </ModalWrapper>
}

export default Modal;
