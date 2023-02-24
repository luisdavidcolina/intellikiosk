import { useContext } from "react";
import Advertise from "../Advertise";
import Menu from "./List/Menu";
import Read from "./../Read";
import MenuDetail from "./Detail/MenuDetail";
import { MenuContext } from "@/data/context";

const OrderPage = () => {
  const { item } = useContext(MenuContext);
  return (
    <>
      <Read />
      <Advertise />
      <div className="h-[58.85vh]">{!item ? <Menu /> : <MenuDetail />}</div>
    </>
  );
};

export default OrderPage;
