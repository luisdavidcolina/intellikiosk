import React, {useContext} from 'react';
import styled from 'styled-components';
import { SmSpanWhite } from './StyledText';
import {PageContext, MenuContext} from '@/data/context';

const Footer = styled.div`
  padding: 0 6.02vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 12.04vw);
  height: 100%;
  background-color: #000000;
`;

const NavButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #ffffff;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    & > img {
      width: 20px;
    }
  }
`;

const IconImg = styled.img`
`;

interface INavButtonItem {
  icon: string;
  text: string;
  align: string;
  onClick?: (e: any) => void;
}

const NavButtonItem = (props: INavButtonItem) => {
  const {icon, text, onClick, align} = props;
  return (
    <NavButton onClick={onClick} style={{alignSelf: align}}>
      <NavButtonIcon>
        <IconImg src={icon} />
      </NavButtonIcon>
      <SmSpanWhite margin="2px 0 0 0">{text}</SmSpanWhite>
    </NavButton>
  );
}

const NavFooter = () => {
  const {setItem, setItems} = useContext(MenuContext);
  const {setPage} = useContext(PageContext);
  const handleClick = (e: any) => {
    e.preventDefault();
    setPage("home");
    setItem(null);
    setItems([]);
  }
  return (
    <Footer>
       <NavButtonItem text='Usar cupon' align='left' icon="/images/order/ic_nav_coupon.png" />
       <NavButtonItem text='Información' align='right' icon="/images/order/ic_nav_info.png" />
       <NavButtonItem onClick={handleClick} text='Salir' align='right' icon="/images/order/ic_nav_arrow.png" />
     </Footer>
  );
}

export default NavFooter;