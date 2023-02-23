import { useContext } from "react";
import styled from "styled-components";
import Advertise from "../Advertise";
import Cart from "./Cart";
import Menu from "./List/Menu";
import Read from "./../Read";
import MenuDetail from "./Detail/MenuDetail";
import { MenuContext } from "@/data/context";

const MenuArea = styled.div`
  height: 58.85vh;
`;

const OrderPage = () => {
  const { item } = useContext(MenuContext);
  return (
    <>
      <Read />
      <Advertise />
      <MenuArea>{!item ? <Menu /> : <MenuDetail />}</MenuArea>
      <Cart />
    </>
  );
};

export default OrderPage;
