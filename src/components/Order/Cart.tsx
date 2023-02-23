import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
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

const getCas = async (items: IItem[]) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/print`, {
      items,
    });
    if (response.status === 200) {
      console.log(response.data);
      return 1;
    }
  } catch (error) {
    return 0;
  }
};

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
  const { items, setItems, setItem, paymentType, setStatusOrder } =
    useContext(MenuContext);
  const { openModal } = useContext(ModalContext);
  const { setPage } = useContext(PageContext);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(0);
  const [bagsQuantity, setBagsQuantity] = useState(0);
  const [documentId, setDocumentId] = useState("");
  const [arrowActivate, setArrowActivate] = useState({
    left: false,
    right: false,
  });
  const [activeCart, setActiveCart] = useState(false);

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
            {step === 0 && (
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
                    className="btn   btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => {
                      setActiveCart(!activeCart);
                    }}
                  >
                    B
                  </button>
                  <button
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => setStep(1)}
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
            {step === 1 && (
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
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => setStep(0)}
                  >
                    B
                  </button>
                  <button
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => setStep(2)}
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
            {step === 2 && (
              <>
                <div className="flex flex-col items-center mb-40">
                  <h2 className="text-3xl font-bold text-secondary">
                    Ingresa tu documento de identidad
                  </h2>
                  <div className="flex mt-5 items-center text-2xl font-bold text-secondary">
                    <input
                      type="radio"
                      name="radio-3"
                      className="radio radio-secondary mr-3"
                      checked
                    />
                    DNI
                    <input
                      type="radio"
                      name="radio-3"
                      className="radio radio-secondary ml-10 mr-3"
                    />
                    PASAPORTE
                    <input
                      type="radio"
                      name="radio-3"
                      className="radio radio-secondary ml-10 mr-3"
                    />{" "}
                    CE
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={documentId}
                    className="input m-5 input-lg input-bordered input-secondary w-full max-w-xs font-bold text-2xl"
                  ></input>
                  <div className="flex flex-col">
                    <div className="flex">
                      <button
                        onClick={() => setDocumentId(documentId + "1")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        1
                      </button>
                      <button
                        onClick={() => setDocumentId(documentId + "2")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        2
                      </button>
                      <button
                        onClick={() => setDocumentId(documentId + "3")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        3
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => setDocumentId(documentId + "4")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        4
                      </button>
                      <button
                        onClick={() => setDocumentId(documentId + "5")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        5
                      </button>
                      <button
                        onClick={() => setDocumentId(documentId + "6")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        6
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => setDocumentId(documentId + "7")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        7
                      </button>
                      <button
                        onClick={() => setDocumentId(documentId + "8")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        8
                      </button>
                      <button
                        onClick={() => setDocumentId(documentId + "9")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        9
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => setDocumentId("")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        -
                      </button>

                      <button
                        onClick={() => setDocumentId(documentId + "0")}
                        className="btn btn-lg btn-secondary gap-2 text-2xl m-1"
                      >
                        0
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
                  <button
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => setStep(1)}
                  >
                    B
                  </button>
                  <button
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => setStep(3)}
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
            {step === 3 && (
              <>
                <div className="flex flex-col items-center mb-40">
                  <h2 className="text-3xl font-bold text-secondary">
                    Elige tu método de pago
                  </h2>
                  <div className="pt-20 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setStep(4)}
                      className=" rounded-2xl btn btn-lg btn-secondary btn-square h-40 w-40  text-white"
                    >
                      <img className="h-28 w-28" src={""} />
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className=" rounded-2xl btn btn-lg btn-secondary btn-square h-40 w-40  text-white"
                    >
                      <img className="h-28 w-28" src={""} />
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className=" rounded-2xl btn btn-lg btn-secondary btn-square h-40 w-40  text-white"
                    >
                      <img className="h-28 w-28" src={""} />
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className=" rounded-2xl btn btn-lg btn-secondary btn-square h-40 w-40  text-white"
                    >
                      <img className="h-28 w-28" src={""} />
                    </button>
                  </div>
                </div>

                <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
                  <button
                    className="btn btn-lg btn-secondary gap-2 text-2xl"
                    onClick={() => setStep(0)}
                  >
                    B
                  </button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div
                  onClick={async () => {
                    setStatusOrder(Number(await getCas(items)));
                    setStep(5);
                  }}
                  className="flex flex-col items-center mb-40"
                >
                  <h2 className="text-3xl font-bold text-secondary">
                    Sigue las instrucciones del terminal
                  </h2>
                  <img
                    className="h-60 w-60 mt-10"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEfUlEQVR4nO2dz4scVRDHn6JeFBRP/solnoxoDFUTAgo5iHcvK7JTb3ZREEO8aDyICPkHPOUmHgImWzWOlwiJ4mH15A/8eXCNelsQ1INBMIuSBbPyxoFM966Z7rV3uup1feDBMjtvtr797Xr9uvrNvhAa5sDC6BYgeQGjfIZRNjDKlvG2gZE/ReLjSVuwxKGn+R4g+VrBQdzam8ZfQf/M3cECk8zI2Az5t5F8Cc+9cXPQzmSY2upCA5JjQTuTa8Z04OePDEb3BuMc7p+5D0kulAz5JGgHI1+eDjoJCZmAy7KvaAj/EbRTTuuQGWhNn7mAc9dXJeA0O0GSl5HkeyTZVDRz2kTiixD5xNGjH920W32qmBVwMgOivK9/BsXv7WRKdoaMM0PBAccqpkR5qa4+g4bwxbYPNFbOElmrq89ihhSvGYsr+4MScHFlfyE2ks38DVEuCI3Hn50gNB5/doLQePzZCULj8WcnCI3Hn50gNB5/doLQePzZCULj8WcnCI3Hn50gNB5/doLQePzZCULj8WdVXISB3N+54iJE/q78Hq0NIn9bV59FQ06YMYT4xbr6xhrHC+i2bggamBVweixaXt+ktJ3fzSPcXp+fQpLf0xIhiMOF0DZVzqAkND0eHQ9fyhY5AMlayozdLnKAKL9O/f7nYMEQy+AMfer0qwuoYdwQZbghysjOEIgrj2GU1fT9ius3PrfTTWN6DaK8O7N/lFVYGj7aeP/cDMEo69VnPXyu3H98MKvPnNab7p+jIZWnoUDyTbl/eq3OZzTd3w0p4YbUxDNEfMhCH7J2nyFAfKnGGL667fOJP6x+DeJLjffP7aIONBxUNGV9p2lneq3KTG3yN2LT/bMzxDrohujCDVGGG6KM7AzxWpa+M8hrWfPE79TF1pBVp7AHXlx0Q9CrvZ4he4rXssTWNcRrWXNG3Y1Rw2R3Y2gddEN04YYoIztDvJY1Z7yWJbYyxEsnc8YNEc8QvE75pXzC+MrFGRnk1d49xmtZYmvI8lrWnFF3Y9Qw2d0YWgetGZK+n93l7SpgSr+K7Sy2behCciEHU3BZ9qX/Bz9rQxckOTWl/VQ70RYC4uN1praWG0R+ftsBOHnyRiB+IrX0c9CwKVjaxawDZnxuYlOwRNpSbvJN1jzNIPnCzLZ5hX1CSI5B5I/L+1LZbHw5aUnDlJnMcBynCXoky6UL5On/+5lYcej5r/7lKnBv6ewjoSu4IcpwQ5ThhijDDVGGG6IMN0QZbogy3BBluCHKcEOU4YYoww1RhhuiDDdEGW6IMno07Befh8jbCp6HrBWehwz4wdAVen15vPSA6oc2DXmY3roVIv85/b4jz47uDF0BFka3Y+QrpSxZbMsQJHm96RPEHEjyTmlVxxXsy6u9pdFd8zBkvMvP4tmHMMqbGPlqcZkPvxa6xqEoDwDJX+0v75FCgyg/HVgY3Ra6CA6YkOTvtk3Aa20D+8Ne6DJAK08CyW9tmwHEPx6m4cG2j4cKDi6dvgOivJJWzs/PHL4KxL8g8QcY+RltqxH/AWTe2nrfnlnZAAAAAElFTkSuQmCC"
                  ></img>
                </div>
                <div></div>
              </>
            )}
            {step === 5 && (
              <>
                <div
                  onClick={async () => {
                    setActiveCart(false);
                    
                    setStep(0);
                    setItems([]);
                  }}
                  className="flex flex-col items-center mb-40"
                >
                  <img
                    className="h-40 w-40 mb-10"
                    src="data:image/png;base64,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"
                  ></img>
                  <h2 className="text-3xl font-bold text-secondary">
                    Muchas gracias por tu compra
                  </h2>
                  <h2 className="text-3xl font-bold text-secondary">
                    Vuelve Pronto
                  </h2>
                </div>
                <div></div>
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
                items.length > 0
                  ? "tooltip-primary tooltip tooltip-right tooltip-open"
                  : ""
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
