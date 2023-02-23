import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { SmSpanLightGray } from "@/components/StyledText";
import { IItem, MenuContext, PageContext, ModalContext } from "@/data/context";

interface IActivable {
  active?: boolean;
}

const CartWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
  bottom: 0;
`;

const CartItemList = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffffff0;
  justify-content: space-between;
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
  const [bags, setBags] = useState(false);
  const [bagsQuantity, setBagsQuantity] = useState(0);
  const [arrowActivate, setArrowActivate] = useState({
    left: false,
    right: false,
  });
  const [activeCart, setActiveCart] = useState(false);

  const setPaymentOrder = (e: any) => {
    if (active) {
      e.preventDefault();
      setBags(true);
      //luisda
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
            {!bags && (
              <>
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
              </>
            )}
            {bags && (
              <>
                <div className="flex flex-col items-center mb-40">
                  <img
                    className="h-40 w-40"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEaElEQVR4nO1aSWgUQRR9iiYuMS4HFxQFFcQYjQmYmIAQVBDjRRCiHjx5cQHx5IoKelAD0YzGxEtOCi4nDeKCyyHBJUFciAYE40GjEsEtETUYHfnwauiMM93V41R1HPtBMTVTy/v/z+/q+r8KCBEiRIgQVlAAIAKgDcBXAJ8BPAFQA2A2MhjZAOoB/AQQTVKk7TiALGSg8reo5Dd6QDGAHAAjWD8GoJd9bmSaEeqoWCeA+R6PRyf7iidkBObStb9TQS8Usm8fgDnIAET4j4qL6+I4xxxBBqCdypT4GLOQY+Tt8M+jh8rIgqeLHI6Rsf88oiy2xg04REMDIPSAqEXPsY6rLltb00W4A8XIAJVXRbbSgWEahXgZgAu/4vxTESCKKMTDAAzwiPPL1jkwLHVEb7YNcJPzv+CGqRvAAwD7AYyHJaymEOcsG2AFEynJ1oUPACphAZtIKOGuLQOsjEuqHOU/LgtyOYBG/t7HP8go9pDsQNzvJQ4B/QRBXpgA4D3nfc7PvQn67XJ4wkQYRA2JtvL7MACHaX1lgD7+Jm1/i92cs5GcUYbbiXCJ7ftgEKdIso7f7zqUPsSijHEnDXz3OVc5OaV+OknfxWyXhdEYLpOkgt8TuX1xGteDj47QuoL1K0n65rL9EwyilSQL+D2ZoukygHMetc60avY3gg4STA/AADNY79DsbwSfSDA6AAOM0XDxtBkgG8AWAPcAfGGRRe0XgB8ABnkQ6ghyO8CAqtlNsMmOfXei0qWhqI4BglLeVbZsh/IS8a0CMIouv5m/t/tQQscAtuHKu8Wh/Li4tkUJ3KfZRfmmvxHEIFx5W9go/3yiPbm0XbAhiEG48qqcvrh9PNazrcGGIAbhyuvWuJ1tVTYESXLmGOHpkXozqXsG+enijbo0VrFtmw+ylAWJW5jrPO4ZSPxRq3nEnrIBGtgmj4ItAzjvGfTywLWYidEcninW8nQ5yqxRlikDXGSbLIa2DFDPPq8BzPPIVereM+jHm0qOX16HNgzgvGegkwgtpJfI45Cnwzs8xR2U2+TpNEBNCjdHajmmWod3EitvNSd/x/6SprJhgKdsL03hnkGbDm9egq1tMgyma0kwNAR2DKD2JJLo8HvPoFuHt5QVSWt5YayBbIuXAbrjQm8d5PoxwHKPFJMTMzWSEaYegTIfc5b6eQTWsnJGY2KVjpJYAZYXwRM+5jyhcdkqxruRFXnXekElJCUpassA+Vx3evme90KR39fgTlYOakyuUtKSFofFjZB6rb3xMEIRN0tu5wZ/8B5iZYeGsOpQQtzSpgGyeBCrtsK1fM5zGLGW0e3VldvrAIbq8p5kZYOGsAfYV47GYDkYyuJmqM8jGIpoKN+P9ywra3zc/ZXDUdsGUJjDxa2Ne4Qe1qt97k5jvNdYWaYx6Dz7VgZogLTztvg4zVUh6RITglhGjPcZK7M0Bj1m3wITglhGjLfLR3CjYu0pJgSxjBivyqL8rwVuOf1ML00BeF6IECFCYMDgN9qnDjxSbZHEAAAAAElFTkSuQmCC"
                  ></img>
                  <h2 className="text-3xl font-bold text-secondary">
                    ¿Necesitas bolsas?
                  </h2>
                  <div className="flex mt-5 items-center">
                    <button
                      className="btn btn-lg btn-secondary btn-circle"
                      onClick={() => {
                        if (bagsQuantity > 0) setBagsQuantity(bagsQuantity - 1);
                      }}
                    >
                      -
                    </button>
                    <h2 className="mx-10 font-bold text-5xl text-secondary">
                      {bagsQuantity}
                    </h2>
                    <button
                      className="btn btn-lg btn-secondary btn-circle"
                      onClick={() => {
                        setBagsQuantity(bagsQuantity + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
                  <button
                    className="btn btn-circle btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => {
                      setBags(!bags);
                    }}
                  >
                    B
                  </button>
                  <button
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={setPaymentOrder}
                  >
                    Continuar
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
              </>
            )}
          </CartItemList>
        </>
      )}
      {!activeCart && (
        <div className="fixed bottom-0 z-50 p-4">
          <div className="indicator">
            <span className="indicator-item badge  h-10 w-10 text-xl ">
              {items.length}
            </span>
            <div
              className={`${
                items.length > 0 ? " tooltip tooltip-right tooltip-open" : ""
              }`}
              data-tip="Visualiza tus productos y compra"
            >
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
        </div>
      )}
    </CartWrapper>
  );
};

export default Cart;
