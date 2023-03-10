import { useContext } from 'react';
import styled from 'styled-components';
import Advertise from '../Advertise';
import Cart from './Cart';
import Footer from '../Footer';
import Menu from './List/Menu';
import MenuDetail from './Detail/MenuDetail';
import { MenuContext } from '@/data/context';

const ADArea = styled.div`
  height: 13.02vh;
`;

const MenuArea = styled.div`
  height: 58.85vh;
`;

const CartArea = styled.div`
  height: 21.88vh;
`;

const FooterArea = styled.div`
  height: 6.25vh;
`;

const OrderPage = () => {
  const { item } = useContext(MenuContext);
  return (
    <>
      <ADArea>
        <Advertise />
      </ADArea>
      <MenuArea>
        {!item ? <Menu /> : <MenuDetail />}
      </MenuArea>
      <CartArea>
        <Cart />
      </CartArea>
      <FooterArea>
        <Footer />
      </FooterArea>
    </>
  );
}

export default OrderPage;