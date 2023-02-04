import { useContext } from 'react';
import styled from 'styled-components';
import { MenuContext, PageContext, StepContext } from '@/data/context';
import { LgSpanBlack, LgSpanPrimary, MdSpanWhite, MdSpanBlack, MdSpanPrimary, SmSpanBlack } from '@/components/StyledText';

const OrderTypeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderType = styled.div`
  width: 44vw;
  height: 24.48vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const OrderTypeIcon = styled.img`
  width: 27.61vw;
`;

const SelectOrderTypeArea = styled.div`
  height: 58.85vh;
  background-color: #f2f2f2;
`;

const StepTitle = styled.div`
  width: 100%;
  height: 19.79vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > span {
    line-height: 72px;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      line-height: 48px;
    }
  }
`;

const OrderCancelArea = styled.div`
  height: 16.67vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderPriceArea = styled.div`
  width: calc(100% - 130px);
  height: 8.07vh;
  padding: 0 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderCancelButton = styled.div`
  position: relative;
  width: 71.3vw;
  height: 5.21vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #000;
`;

const Type = () => {
  const {items, paymentType, setPaymentType  } = useContext(MenuContext);
  const {setPage} = useContext(PageContext);
  const {setStep} = useContext(StepContext);
  const price = items.reduce((total, item) => {
    switch(item?.setType) {
      case "largeSet":
        return total + parseInt(item?.price || '', 10) + 2700;
      case "set":
        return total + parseInt(item?.price || '', 10) + 2000;
      case "normal":
      default:
        return total + parseInt(item?.price || '', 10);
    }
  }, 0);

  const handleClick = () => {
    setStep(2)
    setPaymentType('pinpad')
  }

  return <>
  <SelectOrderTypeArea>
    <StepTitle>
      <LgSpanPrimary>Metodo de pago</LgSpanPrimary>
      <LgSpanBlack>Seleccionar</LgSpanBlack>
    </StepTitle>
    <OrderTypeArea>
      <OrderType onClick={handleClick}>
        <OrderTypeIcon src="/images/order/ic_payment_card.png" />
        <SmSpanBlack>Tarjeta</SmSpanBlack>
      </OrderType>
      <OrderType onClick={() => {setStep(2); setPaymentType('cash')}}>
        <OrderTypeIcon src="/images/order/ic_payment_cash.png" />
        <SmSpanBlack>Efectivo</SmSpanBlack>
      </OrderType>
    </OrderTypeArea>
  </SelectOrderTypeArea>
  <OrderCancelArea>
    <OrderPriceArea>
      <MdSpanBlack>Monto total a pagar</MdSpanBlack>
      <MdSpanPrimary>S/. {price}</MdSpanPrimary>
    </OrderPriceArea>
    <OrderCancelButton onClick={() => setPage('order')}>
      <MdSpanWhite>Cancelar pago</MdSpanWhite>
    </OrderCancelButton>
  </OrderCancelArea>
</>;
}

export default Type;