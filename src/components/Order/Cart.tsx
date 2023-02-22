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
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e0e0e0;
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
            <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
              <div>Total</div>
              <div className="flex">S/. {price}</div>
            </div>
            <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
              <button
                className="btn btn-circle btn-lg btn-primary gap-2 text-2xl text-white"
                onClick={() => {
                  setActiveCart(!activeCart);
                  
                }}
              >
                B
              </button>
              <button
                className="btn btn-lg btn-primary gap-2 text-2xl text-white"
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
        <div
          className="fixed bottom-0 z-50 p-4"
          
        >
          <div className="indicator">
            <span className="indicator-item badge  h-10 w-10 text-xl ">
              {items.length}
            </span>
            <button className="btn h-20 w-20 btn-lg btn-primary btn-circle"
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
