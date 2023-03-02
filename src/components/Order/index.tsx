import { useContext } from "react";
import Advertise from "../Advertise";
import Menu from "./List/Menu";
import Read from "./../Read";
import MenuDetail from "./Detail/MenuDetail";
import { MenuContext, PageContext } from "@/data/context";

const OrderPage = () => {
  const {items, item } = useContext(MenuContext);
  const { setPage } = useContext(PageContext);
  return (
    <div className="h-full w-full flex flex-col">
      <Read />
      <Advertise />
      {!item ? <Menu /> : <MenuDetail />}
      <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
        <span />
        <div className="indicator">
          <span className="indicator-item badge  h-10 w-10 text-xl ">
            {items.length}
          </span>
          <div
            className={`${
              items.length > 0
                ? "tooltip-primary tooltip tooltip-left tooltip-open"
                : ""
            }`}
            data-tip="Visualiza tus productos"
          >
            <button
              className="btn btn-lg btn-secondary gap-2 text-2xl"
              onClick={() => setPage("cart")}
            >
              Carrito
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nN2UvwqBURiHD4MkBsmmTC6AXIQ/ZXIr7kGuQVFyCTbFbjRbMMhgIgw8klcR3+c9PvLnNz+/9zmd93SM+YtwncY7BPsLwQaIv1xyDNDBe3rGKUDxBYKhm8APjAQsOIK3vQgwk17pEVwRsGMhqEqnr4GjwEoWn1LwiQs+qz1RU05UU7BtYVuq4VLKSGkBhFy4NLAD1kBSLZDywOLlVG2Hx4C5YvBarihoK6jLgC7gsyorhoflu9hqXtEzggCw5IkYC0lZuYOrmK8Jp09vCkyAvFfuXvFYOGfslfuIIC/lMZDzyv12DiLMmTXG+gXzAAAAAElFTkSuQmCC" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
