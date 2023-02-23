import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {
  MdSpanWhite,
  SmSpanBlack,
  SmSpanLightGray,
  SmSpanPrimary,
  SmSpanWhite,
} from "@/components/StyledText";
import { IItem, MenuContext, PageContext, ModalContext } from "@/data/context";

interface IActivable {
  active?: boolean;
}

const PaymentWrapper = styled.div`
  width: 100%;
  height: 5.21vh;
  display: flex;
`;

const CancelButton = styled.div<IActivable>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${(props) => (props.active ? "#000000" : "#bdbdbd")};
`;

const PaymentButton = styled.div<IActivable>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${(props) => (props.active ? "#de0000" : "#828282")};
`;

const CartWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
  bottom: 0;
`;

const ItemSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ItemBadge = styled.span<IActivable>`
  margin: 0 0 0 10px;
  padding: 4px 31px;
  border-radius: 30px;
  background-color: ${(props) => (props.active ? "#de0000" : "#828282")};
`;

const ItemsPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Price = styled.span<IActivable>`
  margin-left: 20px;
  font-family: S-CoreDream-7;
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => (props.active ? "#de0000" : "#828282")};
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

const CartItemList = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffffff0;
`;

const CartItems = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 2vw;
`;

const CartItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.2s transform;
`;

const CartItemsEmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ICartItem {
  item: IItem;
  idx: number;
}

const CartItem = (props: ICartItem) => {
  const { item, idx } = props;
  const { menuName, price, setType } = item;

  const menu = useContext(MenuContext);
  const { items, setItems } = menu;
  const onClickDelete = () => {
    const temp = Object.assign([], items);
    temp.splice(idx, 1);
    setItems(temp);
  };
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
    <div className="card w-full bg-base-100 p-5 shadow-xl mb-2">
      <div className="flex w-full justify-between text-2xl font-bold">
        <div>{menuName}</div>
        <div className="flex w-[30vw]">
          <button
            className="btn btn-sm btn-outline btn-circle"
            onClick={onClickDelete}
          >
            -
          </button>
          <h2 className="mx-10">S/. {menuPrice}</h2>
          <button className="btn btn-sm btn-primary btn-circle">+</button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { items, setItems, setItem } = useContext(MenuContext);
  const { openModal } = useContext(ModalContext);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [arrowActivate, setArrowActivate] = useState({
    left: false,
    right: false,
  });
  const [activeCart, setActiveCart] = useState(false);
  const onClickLeftArrow = () => {
    if (arrowActivate?.left) {
      setPosition(position - 1);
    }
  };
  const onClickRightArrow = () => {
    if (arrowActivate?.right) {
      setPosition(position + 1);
    }
  };
  const setPaymentOrder = (e: any) => {
    if (active) {
      e.preventDefault();
      openModal("packing");
    }
  };

  const clearItems = () => {
    if (active) {
      setItem(null);
      setItems([]);
    }
  };
  useEffect(() => {
    setActive(items.length !== 0);
  }, [items]);

  useEffect(() => {
    const leftActivate = position !== 0;
    const rightActivate = items.length > position + 2;
    setArrowActivate({
      left: leftActivate,
      right: rightActivate,
    });
    if (position > items.length - 2 && items.length - 2 >= 0) {
      setPosition(items.length - 2);
    }
  }, [position, items]);

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
    <CartWrapper>
      {activeCart && (
        <>
          <CartItemList>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEXElEQVR4nO2cW4hWVRiGHxU1wQsPUTiNF6YoGFQmCeb5whLHzPAqjTEwvAjUlFQyk2oulDyAYomnCxPMAyl4GJEYJM1D4pWliKIXohOKWv521mbiw/en3T/OMO4c17fG9cCC+ffes/53vbPWt457IJFIJBKJRCKRaEg5sB0oAPXAn8Al4BtgAdAnmda0eddlXGPpDrAFeCoZ2ZDtMmm3DLK0R9dOAeuA3/T5GjA2mfhfis02W7t66tpP+twD2JFp3q8lE//lpowpv4eBP5cYVaXrvwL9kol3+Uqm7JGJlvbqmjXvUtbr3tEGdx5R+iq2lXYc1xvpfTurh7ZnXgmg1yUW/7aqOd9UzWtq6DJLBu58iBpbFU8CdTK7fWgxsXJatfCF0EJiZYsMnBJaSKx8IAOXhhYSK+Nl4P7QQmKlV2aefBE4AVQDXwDLgfnAVM1ahmjg3TW0aE+0ycxi7jfd0Dz7W83BzfTFwEygEngVGAiUtfZe/ogMeRN4UQsNZsBsYBGwAdil587mNNyGS1fV6x/UnHy1ppUzgEnAaOA5jWc7EhFrVEgryP1gTfkZYKhq2zTgI2CFauNuhYRa4HYO03/X71ot/1p5rtB3TNN3DpUGq+XBmC7Ba1vwO9oCTwD9geHAROAdYCGwEtgM1AAnZdpfOQy35bqnCcBIpwsLXTTHf0mjhanq1JarNlZnarjp/zGU0G4S8ItqSmy8Lf3bQoq4LBFBmsD/ZKO0WygKxj6JmNCMZw8DhwJcb4wL0v48AflUIj5sxrOHNBR52NfvRXlm1b0dAamUEFtPjIlJmZX4oAyQEBvoxsRq6Z4XWshjGuze1s+xxMAfZKDN090srg6IJAZ21xTRBtAdcMBWGWjxMAYmSO8BnLBAgpYQB8uk92Oc/UX3RRIDj0uvreK4oLcE2X6x9xjYOdPp2c9uFlcLMtECtGdGS+d3OOOYhI3AN5943Qxb14yJuYcYeEA63Z0wmylhtkrtNQZ21NivzmOoGSUDbf/DK0Ok8Xsc8rjEFdSpeOR9afwcp9RKoO0Ze4yBxXOPb+CU/RJo+xDeYmAXbT3UeT4sv1QG2rkZb8yNIEbzlkR+iS9e1uF40zYOxwyUSFtrC41N0wZpWFXcnP8M53TSYaN6Z+mOzt5EsfV6xoFh9Wqy53Vq4lkifPNpcmghsbJQBlqTSeTgdRlog9ZEDvrIQDu1mshBW434zcR0pDcnx2XgsFQF87FBBtpByEQO3m3G4mqiCQbLwNrQJ59ipR1wTibaJk4iB2OAv7X+tkkLDVG9guCBSr1yUO8sRUVvYJVetKlzYF50BhYZJvF/AO/pP4FYmqNrecaNw1sgT7dUq0BW0MaW2/fmPOD+IPN0yxUVyGpI6Q5ame5dcZCnWwolhc3uoBULW3CQp1tqVCCLT6XM070aB3m6pSIT8OeqhpSpoMUdswoHebqmqomhRZWjPF1ToWZ1S6nmAdSSlsgzkUgkEolEglbAP5lTX8ghkRRPAAAAAElFTkSuQmCC"
              className="w-40 h-40 p-5 mt-20 mx-auto"
            ></img>
            <CartItems>
              {items.length === 0 ? (
                <CartItemsEmptyWrapper>
                  <SmSpanLightGray>
                    No hay productos en el carrito
                  </SmSpanLightGray>
                </CartItemsEmptyWrapper>
              ) : (
                <CartItemsWrapper>
                  {items.map((item, idx) => (
                    <CartItem key={idx} idx={idx} item={item} />
                  ))}
                </CartItemsWrapper>
              )}
            </CartItems>
            <div className="flex w-full justify-between text-4xl text-black font-bold px-12 pb-5">
              <div>Total</div>
              <div className="flex">S/. {price}</div>
            </div>
            <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
              <button
                className="btn btn-circle btn-lg btn-secondary gap-2 text-2xl"
                onClick={() => {
                  setActiveCart(!activeCart);
                }}
              >
                B
              </button>
              <button
                className="btn btn-lg btn-secondary gap-2 text-2xl"
                onClick={setPaymentOrder}
              >
                Comprar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </CartItemList>
        </>
      )}
      {!activeCart && (
        <div className="fixed bottom-0 z-50 p-4">
          <div className="indicator">
            <span className="indicator-item badge  h-10 w-10 text-xl ">
              {items.length}
            </span>
            <button
              className="btn h-20 w-20 btn-lg btn-secondary btn-circle"
              onClick={() => {
                setActiveCart(!activeCart);
              }}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nN2UvwqBURiHD4MkBsmmTC6AXIQ/ZXIr7kGuQVFyCTbFbjRbMMhgIgw8klcR3+c9PvLnNz+/9zmd93SM+YtwncY7BPsLwQaIv1xyDNDBe3rGKUDxBYKhm8APjAQsOIK3vQgwk17pEVwRsGMhqEqnr4GjwEoWn1LwiQs+qz1RU05UU7BtYVuq4VLKSGkBhFy4NLAD1kBSLZDywOLlVG2Hx4C5YvBarihoK6jLgC7gsyorhoflu9hqXtEzggCw5IkYC0lZuYOrmK8Jp09vCkyAvFfuXvFYOGfslfuIIC/lMZDzyv12DiLMmTXG+gXzAAAAAElFTkSuQmCC" />
            </button>
          </div>
        </div>
      )}
    </CartWrapper>
  );
};

export default Cart;
