import { useContext, useState } from "react";
import { MenuContext, PageContext, ModalContext } from "@/data/context";

import {
  LgSpanBlack,
  LgSpanPrimary,
  SmSpanLightBlack,
  MdSpanWhite
} from "@/components/StyledText";

import {
  CompleteOrderArea,
  CompleteOrderTitle,
  CompleteOrderNo,
  CompleteOrderMessage,
  CompleteOrderImage,
  PaymentWrapper,
  PaymentButton
} from "./Complete.styles";

import {status as Status} from "./CompleteConst";



const Complete = () => {
  const { setItems, orderId, statusOrder } = useContext(MenuContext);
  const { setPage } = useContext(PageContext);
  const {openModal} = useContext(ModalContext);
  const status = Status[statusOrder]

  const active = 1
  //(statusOrder===1)

  const setBillingInformation = (e: any) => {
    if(active) {
      e.preventDefault();
      openModal('billing');
    }
  }

  return (
    <>
      <CompleteOrderArea>
        <CompleteOrderTitle>
          <LgSpanBlack>{status.t}</LgSpanBlack>
        </CompleteOrderTitle>
        <CompleteOrderNo>
          <LgSpanPrimary>{status.t2}</LgSpanPrimary>
          <span>{orderId}</span>
        </CompleteOrderNo>
        <CompleteOrderMessage>
          <SmSpanLightBlack>{status.t3}</SmSpanLightBlack>
        </CompleteOrderMessage>
        <CompleteOrderImage
          onClick={() => {
            setItems([]);
            setPage("order");
          }}
          src={status.src}
        />
        <PaymentWrapper>
         <PaymentButton active={Boolean(active)} onClick={setBillingInformation}>
           <MdSpanWhite>Facturar</MdSpanWhite>
         </PaymentButton>
       </PaymentWrapper>
      </CompleteOrderArea>
    </>
  );
};

export default Complete;
