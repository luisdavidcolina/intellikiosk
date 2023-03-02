import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { SmSpanLightGray } from "@/components/StyledText";
import { IItem, MenuContext, PageContext, ModalContext } from "@/data/context";

const CartItemList = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffffff0;
  justify-content: center;
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
    <div className="card w-full bg-base-100 p-5 shadow-2xl  mb-2">
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
  const { setPage } = useContext(PageContext);
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [bagsQuantity, setBagsQuantity] = useState(0);
  const [documentId, setDocumentId] = useState("");

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
      <CartItemList>
        {step === 0 && (
          <div className=" h-full w-full flex flex-col justify-center">
            <div className="flex flex-col h-full w-full items-center justify-center">
              <h2 className="text-4xl font-bold">Escanea los códigos</h2>

              <img
                className="h-40 w-40 mx-auto mt-10"
                src="data:image/png;base64,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"
              ></img>
              <button
                className="btn btn-primary mt-6 rounded-2xl btn btn-lg "
                onClick={() => setPage("order")}
              >
                O selecciona tus productos
              </button>
            </div>
            {items.length === 0 ? (
              <></>
            ) : (
              <div className="w-full flex flex-col px-10">
                {items.map((item, idx) => (
                  <CartItem key={idx} idx={idx} item={item} />
                ))}
              </div>
            )}{" "}
            <div className="flex w-full justify-between text-4xl text-black font-bold px-12 py-10">
              <div>Total</div>
              <div className="flex">S/. {price}</div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col items-center mb-40 h-full flex flex-col justify-center">
            <img
              className="h-40 w-40"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEaElEQVR4nO1aSWgUQRR9iiYuMS4HFxQFFcQYjQmYmIAQVBDjRRCiHjx5cQHx5IoKelAD0YzGxEtOCi4nDeKCyyHBJUFciAYE40GjEsEtETUYHfnwauiMM93V41R1HPtBMTVTy/v/z+/q+r8KCBEiRIgQVlAAIAKgDcBXAJ8BPAFQA2A2MhjZAOoB/AQQTVKk7TiALGSg8reo5Dd6QDGAHAAjWD8GoJd9bmSaEeqoWCeA+R6PRyf7iidkBObStb9TQS8Usm8fgDnIAET4j4qL6+I4xxxBBqCdypT4GLOQY+Tt8M+jh8rIgqeLHI6Rsf88oiy2xg04REMDIPSAqEXPsY6rLltb00W4A8XIAJVXRbbSgWEahXgZgAu/4vxTESCKKMTDAAzwiPPL1jkwLHVEb7YNcJPzv+CGqRvAAwD7AYyHJaymEOcsG2AFEynJ1oUPACphAZtIKOGuLQOsjEuqHOU/LgtyOYBG/t7HP8go9pDsQNzvJQ4B/QRBXpgA4D3nfc7PvQn67XJ4wkQYRA2JtvL7MACHaX1lgD7+Jm1/i92cs5GcUYbbiXCJ7ftgEKdIso7f7zqUPsSijHEnDXz3OVc5OaV+OknfxWyXhdEYLpOkgt8TuX1xGteDj47QuoL1K0n65rL9EwyilSQL+D2ZoukygHMetc60avY3gg4STA/AADNY79DsbwSfSDA6AAOM0XDxtBkgG8AWAPcAfGGRRe0XgB8ABnkQ6ghyO8CAqtlNsMmOfXei0qWhqI4BglLeVbZsh/IS8a0CMIouv5m/t/tQQscAtuHKu8Wh/Li4tkUJ3KfZRfmmvxHEIFx5W9go/3yiPbm0XbAhiEG48qqcvrh9PNazrcGGIAbhyuvWuJ1tVTYESXLmGOHpkXozqXsG+enijbo0VrFtmw+ylAWJW5jrPO4ZSPxRq3nEnrIBGtgmj4ItAzjvGfTywLWYidEcninW8nQ5yqxRlikDXGSbLIa2DFDPPq8BzPPIVereM+jHm0qOX16HNgzgvGegkwgtpJfI45Cnwzs8xR2U2+TpNEBNCjdHajmmWod3EitvNSd/x/6SprJhgKdsL03hnkGbDm9egq1tMgyma0kwNAR2DKD2JJLo8HvPoFuHt5QVSWt5YayBbIuXAbrjQm8d5PoxwHKPFJMTMzWSEaYegTIfc5b6eQTWsnJGY2KVjpJYAZYXwRM+5jyhcdkqxruRFXnXekElJCUpassA+Vx3evme90KR39fgTlYOakyuUtKSFofFjZB6rb3xMEIRN0tu5wZ/8B5iZYeGsOpQQtzSpgGyeBCrtsK1fM5zGLGW0e3VldvrAIbq8p5kZYOGsAfYV47GYDkYyuJmqM8jGIpoKN+P9ywra3zc/ZXDUdsGUJjDxa2Ne4Qe1qt97k5jvNdYWaYx6Dz7VgZogLTztvg4zVUh6RITglhGjPcZK7M0Bj1m3wITglhGjLfLR3CjYu0pJgSxjBivyqL8rwVuOf1ML00BeF6IECFCYMDgN9qnDjxSbZHEAAAAAElFTkSuQmCC"
            ></img>
            <h2 className="text-3xl font-bold text-primary">
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
              <h2 className="mx-10 font-bold text-5xl text-primary">
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
        )}
        {step === 2 && (
          <div className="flex flex-col items-center mb-40  h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-primary">
              Ingresa tu documento de identidad
            </h2>
            <div className="flex mt-5 items-center text-2xl font-bold text-primary">
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
        )}
        {step === 3 && (
          <div className="flex flex-col items-center mb-40  h-full flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-primary">
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
        )}
        {step === 4 && (
          <div
            onClick={async () => {
              setStatusOrder(Number(await getCas(items)));
              setStep(5);
            }}
            className="flex flex-col items-center mb-40  h-full flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-primary">
              Sigue las instrucciones del terminal
            </h2>
            <img
              className="h-60 w-60 mt-10"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEfUlEQVR4nO2dz4scVRDHn6JeFBRP/solnoxoDFUTAgo5iHcvK7JTb3ZREEO8aDyICPkHPOUmHgImWzWOlwiJ4mH15A/8eXCNelsQ1INBMIuSBbPyxoFM966Z7rV3uup1feDBMjtvtr797Xr9uvrNvhAa5sDC6BYgeQGjfIZRNjDKlvG2gZE/ReLjSVuwxKGn+R4g+VrBQdzam8ZfQf/M3cECk8zI2Az5t5F8Cc+9cXPQzmSY2upCA5JjQTuTa8Z04OePDEb3BuMc7p+5D0kulAz5JGgHI1+eDjoJCZmAy7KvaAj/EbRTTuuQGWhNn7mAc9dXJeA0O0GSl5HkeyTZVDRz2kTiixD5xNGjH920W32qmBVwMgOivK9/BsXv7WRKdoaMM0PBAccqpkR5qa4+g4bwxbYPNFbOElmrq89ihhSvGYsr+4MScHFlfyE2ks38DVEuCI3Hn50gNB5/doLQePzZCULj8WcnCI3Hn50gNB5/doLQePzZCULj8WcnCI3Hn50gNB5/doLQePzZCULj8WdVXISB3N+54iJE/q78Hq0NIn9bV59FQ06YMYT4xbr6xhrHC+i2bggamBVweixaXt+ktJ3fzSPcXp+fQpLf0xIhiMOF0DZVzqAkND0eHQ9fyhY5AMlayozdLnKAKL9O/f7nYMEQy+AMfer0qwuoYdwQZbghysjOEIgrj2GU1fT9ius3PrfTTWN6DaK8O7N/lFVYGj7aeP/cDMEo69VnPXyu3H98MKvPnNab7p+jIZWnoUDyTbl/eq3OZzTd3w0p4YbUxDNEfMhCH7J2nyFAfKnGGL667fOJP6x+DeJLjffP7aIONBxUNGV9p2lneq3KTG3yN2LT/bMzxDrohujCDVGGG6KM7AzxWpa+M8hrWfPE79TF1pBVp7AHXlx0Q9CrvZ4he4rXssTWNcRrWXNG3Y1Rw2R3Y2gddEN04YYoIztDvJY1Z7yWJbYyxEsnc8YNEc8QvE75pXzC+MrFGRnk1d49xmtZYmvI8lrWnFF3Y9Qw2d0YWgetGZK+n93l7SpgSr+K7Sy2behCciEHU3BZ9qX/Bz9rQxckOTWl/VQ70RYC4uN1praWG0R+ftsBOHnyRiB+IrX0c9CwKVjaxawDZnxuYlOwRNpSbvJN1jzNIPnCzLZ5hX1CSI5B5I/L+1LZbHw5aUnDlJnMcBynCXoky6UL5On/+5lYcej5r/7lKnBv6ewjoSu4IcpwQ5ThhijDDVGGG6IMN0QZbogy3BBluCHKcEOU4YYoww1RhhuiDDdEGW6IMno07Befh8jbCp6HrBWehwz4wdAVen15vPSA6oc2DXmY3roVIv85/b4jz47uDF0BFka3Y+QrpSxZbMsQJHm96RPEHEjyTmlVxxXsy6u9pdFd8zBkvMvP4tmHMMqbGPlqcZkPvxa6xqEoDwDJX+0v75FCgyg/HVgY3Ra6CA6YkOTvtk3Aa20D+8Ne6DJAK08CyW9tmwHEPx6m4cG2j4cKDi6dvgOivJJWzs/PHL4KxL8g8QcY+RltqxH/AWTe2nrfnlnZAAAAAElFTkSuQmCC"
            ></img>
          </div>
        )}
        {step === 5 && (
          <div
            onClick={async () => {
              setActiveCart(false);

              setStep(0);
              setItems([]);
              setPage('home')
            }}
            className="flex flex-col items-center mb-40  h-full flex flex-col justify-center"
          >
            <img
              className="h-40 w-40 mb-10"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGeUlEQVR4nO2baYxTVRTHH264r7hhUFHUZBKBmXM7g3xw4IN8IJrgMskMPadl0THG4BJNFMSMRozggkpcglFRmHdOrRp3RI1BSAjGLSFRBKNGIaiAO6IOImNOO21fH6/Tvvb1tUVOcpLm3Xt73//37rvLufdZVsg2LpY8zZDcZUjeNSgf+XLitUDyChA/BGRPhu5XD7cayYDsyYZ4hyHpD8RRfjEkC8w0GWHVu5lpMgKQfw9MfD6IXYaEI8TGqlcD4rurIt7lgLwK0J5i9fQcYNWTGeQVYQDIgZBPm6f2nmHViwHya2ECSEEguSNTf4TkXCD+2vXaLAgNgEG5OWwABuX+bP1RmbN3Hu4LDUBrdNnRBvnbWgHQ1uCVxwrTWqPJJoP85f8WgNq4juRhgDLToDxjiJOlOCC/Y0i27xMAKgFnSB7+3wJIW/8QQ7w6NABNHckjDfK81HuLsgtIvtIJjXZoXvmbO3k4oNwCxE8b4se0qY+f8fJRVoBmiG8IBUCr9trEH3sVAuSNrZgc6cwP3YsPNiRb9r4J3gYxmRQUAAUcCgBAeWqwPwfkTTq5yOQfjUuPAJS/CtzILojxFRWLV8go66oOoEmbPnFfCZV8p0NbtpKYTDIkCyMo0wxKNxBvyAIj/sdgorNc8WOnJ080JC+F0gk2x3h06ZXwtlZMjPF8Yh3JYwzJ+w4IuyOYiPoRbqbaZwHJIwZ5py/xlQBoi8uZfioC5J9MNBEp1JcA8Zq814GSpxcTDjG7NTUHIN7tW3gQfYBB+dxfhfyrQRnv9V86EmSGLxUEMTnbu9b+IS0kFwPKe2WLDgoAaPQG5d+SWwHxnwb5gSIzwGsglpjoThs1a/lQHTKB+LNAhAcBQC1CfFVxCLzHoCzSTsryaedPtY8zyLMB+ftAhQcFQM1gYnohCECyGaIywfKyQSIyGqgAlAcDjQ9WC4CaISF3ZwQkX7g7s9G49CQgudUQrwRKdFgu05idxu5SQ2I1hQcNQA2i3OW48W8i8eQpzgmKCgeS31JwkO91QjEkr2uZUERXC4CaPlUdjwG5LW8GSPJmrmXwBgWSHQJRPgldeLUAqGlPPia+5Fj93d6+8iD36iwVkR0wQHm0ZuKrAaA9vuRQnf7qIilCz54AyHNdFa5zziYrmsTUIwBDclnuSfMqIPkhv0Kenc2Lsqim4tP3My9QAICyzFF4IUQTLYDyY+ZaW5d9Ti5woS2lpgC25y3UggHAGzMFI2Rf4Fg4bdUxXYXrtbZOPjlcsdyXmkWiPK8br9pZu4M2FQPo6Ege6JwQZTpCNSUNyMuzlUUTLVVs1n+nWiLy7EiMLzXR5HnaGRd9eJUCGDczebyD+A53eiTeO9YQN6cByIRKRKZfK14NxIsB+UZdQjvSt1hlWMUbI6NmLR+aWvGlC652p6dFc59BvsegfXlpQnmTIXlbo70Qs682ZLd7rSk01lgpAI1e5e9JpO/V8vUn8d6x+kT0hrwBDAgjXpNa1hLfB8gJjesDca9WqNEiXesXCqx6WRAAqm6Q1+x5ZZD/vR9A5/4WMHz/K0D7+4D+EDrBfp3CkiGekZnVQZc9THvwVE8+iKePsWVv8udi+f143oozNREqqdxc3/JB1/uZoSxqX6nXDHJPuNPa4FyHW18ADPF8xyTlzhQU95K3sZx8tgCWHACZOXAtXgdCyvOozPELYI2jBVyUuhZLTKy5kHId5XGfAGRzpnBm51f35moupEx3rlCLi+/WyG4mhMV7dCdHrzd1JA/xs0NUT66HJUsG0IrJkY7CW51pngcfGsL3XrYXNEN2e5Yc8Qf5aby29mLKc91+KwkAYCKWAyAv5KWRPFdrIeV6obMLHgA4N967dnl1XV9rIWU72peUCECeyBaKyvUuONc1LgC+tiQABvmtTCENNuYDsKfUXEjZzvNLBCDZEyEa1c0DUM0ob/WdSwNA8kcWQJc9zJmm22B1IKQs19ltqUfQ+lOOvNMbUJUPM1QNgGwuCqAlboMDwHpPAMjrG7QF7M5s15e06WmQV9TDNz9Buh77K/kAMhAvLjpMNphHYokLi7WAhTkAcpsnAJLbay2kbI8xDgoAkF8sFkXZpwMjgPJhroDd7plnXw6MgOOkh/s7gIw1cmDEoLwxKAAz8GGEjpl6DsArT/pAlB6EqANBvp2fHLwFRJedqqe/Cj39jA189taTjh43hgPxTfr9QyFR/wEg/nqxxS0F6gAAAABJRU5ErkJggg=="
            ></img>
            <h2 className="text-3xl font-bold text-primary">
              Muchas gracias por tu compra
            </h2>
            <h2 className="text-3xl font-bold text-primary">Vuelve Pronto</h2>
          </div>
        )}

        <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
        {(step !== 0 )  && (
          <button
            className="btn   btn-lg btn-secondary gap-2 text-2xl"
            onClick={() => {
              if (step === 0) setPage("home");
              else
                setStep(
                  step === 1
                    ? 0
                    : step === 2
                    ? 1
                    : step === 3
                    ? 2
                    : step === 4
                    ? 3
                    : step === 5
                    ? 4
                    : 0
                );
            }}
          >
            Regresar
          </button>
        ) }{ (step === 0 ) && (<span></span>)}
          {(step === 0 || step ===1 || step ===2)  && (
            <button
              className="btn btn-lg btn-secondary gap-2 text-2xl"
              onClick={() =>
                setStep(
                  step === 0
                    ? 1
                    : step === 1
                    ? 2
                    : step === 2
                    ? 3
                    : step === 3
                    ? 4
                    : step === 4
                    ? 5
                    : 1
                )
              }
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </CartItemList>
    </>
  );
};

export default Cart;
