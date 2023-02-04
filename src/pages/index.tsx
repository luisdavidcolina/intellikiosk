import {useState} from 'react';
import {IItem, MenuContext, PageContext, ModalContext} from '@/data/context';
import {Page, PageInnerWrapper} from '@/components/Page';
import Modal from '@/components/Modal';
import HomePage from '@/components/Home';
import OrderPage from '@/components/Order';
import PaymentPage from '@/components/Payment';

const Index = () => {
  const [selectedItem, selectItem] = useState<IItem | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<IItem[]>([]);
  const [orderId, setOrderId] = useState(0);
  const [statusOrder, setStatusOrder] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [pageState, setPageState] = useState('home');
  const [activateModal, setActivateModal] = useState(false);
  const [modalState, setModalState] = useState('');
  const [modalProps, setModalProps] = useState({});
  const menuContext = {
    item: selectedItem,
    setItem: selectItem,
    items: selectedMenu,
    setItems: setSelectedMenu,
    orderId: orderId,
    paymentType: paymentType,
    setOrderId: setOrderId,
    setPaymentType: setPaymentType,
    statusOrder: statusOrder, 
    setStatusOrder: setStatusOrder,
  };

  const pageContext = {
    page: pageState,
    setPage: setPageState
  }

  const openModal = (modalName: string, modalProps?: any) => {
    setModalState(modalName);
    setModalProps(modalProps);
    setActivateModal(true);
  }
  const closeModal = () => {
    setModalState('');
    setModalProps({});
    setActivateModal(false);
  }

  const modalContext = {
    active: activateModal,
    modal: modalState,
    modalProps: modalProps,
    openModal: openModal,
    closeModal: closeModal
  }

  const renderPage = (state: string) => {
    switch(state) {
      case 'home':
      default:
        return <HomePage />;
      case 'order':
        return <OrderPage />;
      case 'payment':
        return <PaymentPage />;
    }
  }
  return (<Page>
    <PageContext.Provider value={pageContext}>
      <ModalContext.Provider value={modalContext}>
        <MenuContext.Provider value={menuContext}>
          <PageInnerWrapper>
            {renderPage(pageState)}
          </PageInnerWrapper>
          {activateModal && <Modal />}
        </MenuContext.Provider>
      </ModalContext.Provider>
    </PageContext.Provider>
  </Page>);
}


export default Index;