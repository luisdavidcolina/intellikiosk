import { useContext } from "react";
import { MenuContext, PageContext, StepContext, IItem } from "@/data/context";
import {
  MdSpanBlack,
  MdSpanPrimary,
  MdSpanWhite,
  SmSpanBlack,
  SmSpanLightBlack,
  SmSpanBoldGray,
  SmSpanPrimary,
} from "@/components/StyledText";

import {
  OrderedItemWrapper,
  OrderedItemTitle,
  OrderedItemImg,
  OrderedMenuArea,
  OrderedItemSize,
  PriceArea,
  OrderPrice,
  DiscountPrice,
  ButtonArea,
  CancelButton,
  OrderedItemPrice,
  TotalPrice,
  OrderButton,
} from "./Confirm.styles";

interface IOrderedItem {
  item: IItem;
}

const OrderedItem = (props: IOrderedItem) => {
  const { item } = props;
  const { menuName, price, img, setImg, setType, modifiers } = item;
  const getPrice = () => {
    switch (setType) {
      case "largeSet":
        return parseInt(price || "", 10) + 2700;
      case "set":
        return parseInt(price || "", 10) + 2000;
      case "normal":
      default:
        return parseInt(price || "", 10);
    }
  };
  const menuPrice = getPrice();
  return (
    <OrderedItemWrapper>
      <OrderedItemTitle>
        <MdSpanBlack>
          {menuName} {setType === "largeSet" && "largeset"}
          {setType === "set" && "set"}
          <br />
          <SmSpanBoldGray>
            {modifiers  && "Con : "}

            {modifiers?.map((modifier, idx) => (
              <SmSpanLightBlack key={idx}>
                {modifier}
                {idx !== modifiers.length - 1 && ", "}
              </SmSpanLightBlack>
            ))}
          </SmSpanBoldGray>
        </MdSpanBlack>
        <MdSpanPrimary>S/. {menuPrice}</MdSpanPrimary>
        <OrderedItemImg
          src={setType === "set" || setType === "largeSet" ? setImg : img}
        />
      </OrderedItemTitle>
      <OrderedItemSize>
        <SmSpanBoldGray>Cantidad</SmSpanBoldGray>
        <SmSpanBoldGray>1</SmSpanBoldGray>
      </OrderedItemSize>
      <OrderedItemPrice>
        <SmSpanBlack>Monto Total</SmSpanBlack>
        <SmSpanPrimary>S/. {menuPrice}</SmSpanPrimary>
      </OrderedItemPrice>
    </OrderedItemWrapper>
  );
};

const Confirm = () => {
  const { items } = useContext(MenuContext);
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
      <OrderedMenuArea>
        {items.map((item, idx) => (
          <OrderedItem key={idx} item={item} />
        ))}
      </OrderedMenuArea>
      <PriceArea>
        <OrderPrice>
          <SmSpanBlack>Monto Orden</SmSpanBlack>
          <SmSpanBlack>S/. {price}</SmSpanBlack>
        </OrderPrice>
        <DiscountPrice>
          <SmSpanLightBlack>Descuento</SmSpanLightBlack>
          <SmSpanLightBlack>S/. 0</SmSpanLightBlack>
        </DiscountPrice>
        <TotalPrice>
          <MdSpanBlack>Monto Total</MdSpanBlack>
          <MdSpanPrimary>S/. {price}</MdSpanPrimary>
        </TotalPrice>
      </PriceArea>
      <ButtonArea>
        <CancelButton onClick={() => setPage("order")}>
          <MdSpanWhite>Cancelar</MdSpanWhite>
        </CancelButton>
        <OrderButton onClick={() => setStep(1)}>
          <MdSpanWhite>Pagar</MdSpanWhite>
        </OrderButton>
      </ButtonArea>
    </>
  );
};

export default Confirm;
