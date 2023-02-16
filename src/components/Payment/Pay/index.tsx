import { useContext, MouseEvent } from "react";
import axios from "axios";
import { MenuContext, PageContext, StepContext } from "@/data/context";

import {
  LgSpanBlack,
  LgSpanPrimary,
  MdSpanBlack,
  MdSpanPrimary,
  MdSpanWhite,
} from "@/components/StyledText";

import {
  SelectOrderTypeArea,
  StepTitle,
  OrderCancelArea,
  OrderPriceArea,
  InsertImage,
  OrderCancelButton,
} from "./Pay.styles";

const getCas = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/print`
    );
    if (response.status === 200) {
      console.log(response.data);
      return 1
    }
    
  } catch (error) {
    return 0
  }
};

const PayTypes = {
  pinpad: {
    title: "Tarjeta",
    subTitle: "Ingresa tu tarjeta",
    src: "images/order/ic_payment_insert.png",
  },
  cash: {
    title: "Efectivo",
    subTitle: "Ingresa tu efectivo",
    src: "images/order/ic_cash_insert.png",
  },
};

type fun = {
  setStep: (step: number) => void;
  price: number;
  paymentType: string;
  setStatusOrder: (statusOrder: number) => void;
};

const X = ({ setStep, price, paymentType, setStatusOrder}: fun) => {
  const PayType =
    paymentType === "pinpad" ? PayTypes["pinpad"] : PayTypes["cash"];

  const getCash = async (event: MouseEvent) => {
    event.preventDefault();
    setStatusOrder(Number(await getCas(price)))
    setStep(3)
  };

  return (
    <SelectOrderTypeArea>
      <StepTitle>
        <LgSpanPrimary>{PayType.title}</LgSpanPrimary>
        <LgSpanBlack>{PayType.subTitle}</LgSpanBlack>
      </StepTitle>
      <InsertImage onClick={getCash} src={PayType.src} />
    </SelectOrderTypeArea>
  );
};

const Pay = () => {
  const { items, paymentType, setStatusOrder } = useContext(MenuContext);
  const { setPage } = useContext(PageContext);
  const { setStep } = useContext(StepContext);
  const price = items.reduce((total, item) => {
    switch (item?.setType) {
      case "largeSet":
        return total + parseInt(item?.price || "", 10) + 2700;
      case "set":
        return total + parseInt(item?.price || "", 10) + 2000;
      case "normal":
      default:
        return total + parseInt(item?.price || "", 10);
    }
  }, 0);

  return (
    <>
      <X setStep={setStep} price={price} paymentType={paymentType} setStatusOrder={setStatusOrder} />
      <OrderCancelArea>
        <OrderPriceArea>
          <MdSpanBlack>Monto total a pagar</MdSpanBlack>
          <MdSpanPrimary>S/. {price}</MdSpanPrimary>
        </OrderPriceArea>
        <OrderCancelButton onClick={() => setPage("order")}>
          <MdSpanWhite>Cancelar pago</MdSpanWhite>
        </OrderCancelButton>
      </OrderCancelArea>
    </>
  );
};

export default Pay;
