import { useContext } from "react";
import Advertise from "../Advertise";
import Menu from "./List/Menu";
import Read from "./../Read";
import MenuDetail from "./Detail/MenuDetail";
import { MenuContext, PageContext } from "@/data/context";

const OrderPage = () => {
  const { item } = useContext(MenuContext);
  const { setPage } = useContext(PageContext);
  return (
    <div className="h-full w-full flex flex-col">
      <Read />
      <Advertise />
      {!item ? <Menu /> : <MenuDetail />}
      <div className="flex w-full justify-between text-4xl font-bold px-12 pb-5">
        <span/>
        <button
          className="btn btn-lg btn-secondary gap-2 text-2xl"
          onClick={() => setPage('cart')}
        >
          Carrito
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
    </div>
  );
};

export default OrderPage;
