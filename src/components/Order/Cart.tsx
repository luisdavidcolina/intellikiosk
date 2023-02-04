import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import {MdSpanWhite, SmSpanBlack, SmSpanLightGray, SmSpanPrimary, SmSpanWhite} from '@/components/StyledText';
import {IItem, MenuContext, PageContext, ModalContext} from '@/data/context';

interface IActivable {
  active?: boolean;
}

interface ISlideItems {
  position?: number;
  itemLength?: number;
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
  background-color: ${props => props.active ? '#000000' : '#bdbdbd'};
`;

const PaymentButton = styled.div<IActivable>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.active ? '#de0000' : '#828282'};
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CartInfo = styled.div`
  display: flex;
  height: 5.21vh;
  background-color: #e0e0e0;
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
  background-color: ${props => props.active ? '#de0000' : '#828282'};
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
  color: ${props => props.active ? '#de0000' : '#828282'};
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

const CartItemList = styled.div`
  height: 11.46vh;
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
`;

const CartItemsController = styled.div<IActivable>`
  width: 6vw;
  height: 6vw;
  background-color: ${(props) => props.active ? '#000000' : '#bdbdbd'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 900;
  color: #ffffff;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 25px;
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow: hidden;
`;

const CartItemsWrapper = styled.div<ISlideItems>`
  width: ${props => props.itemLength ? props.itemLength * 34.25 + 'vw' : '0'};
  transform: translateX(${props => props.position ? `-${props.position * 34.25}vw` : '0px'});
  transition: .2s transform;
`

const CartItemWrapper = styled.div`
  float: left;
  position: relative;
  margin-left: 1.85vw;
  padding: 1.85vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  width: 28.7vw;
  height: 7.3vh;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

const CartItemClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 900;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
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
  const {item, idx} = props;
  const {menuName, price, setType} = item;

  const menu = useContext(MenuContext);
  const {items, setItems} = menu;
  const onClickDelete = () => {
    const temp = Object.assign([], items);
    temp.splice(idx,1)
    setItems(temp);
  }
  const getPrice = () => {
    switch(setType) {
      case 'largeSet':
        return parseInt(price || '', 10) + 2700;
      case 'set':
        return parseInt(price || '', 10) + 2000;
      case 'normal':
      default:
        return parseInt(price || '', 10);
    }
  }
  const menuPrice = getPrice();
  return (
    <CartItemWrapper>
      <CartItemClose onClick={onClickDelete}>X</CartItemClose>
      <SmSpanBlack>{menuName} {setType === 'largeSet' && '라지세트'}{setType === 'set' && '세트'}</SmSpanBlack>
      <SmSpanPrimary>S/. {menuPrice}</SmSpanPrimary>
    </CartItemWrapper>
  );
}

const Cart = () => {
  const {items, setItems, setItem} = useContext(MenuContext);
  const {openModal} = useContext(ModalContext);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [arrowActivate, setArrowActivate] = useState({left: false, right: false});
  const onClickLeftArrow = () => {
    if(arrowActivate?.left) {
      setPosition(position - 1);
    }
  };
  const onClickRightArrow = () => {
    if(arrowActivate?.right) {
      setPosition(position + 1);
    }
  }
  const setPaymentOrder = (e: any) => {
    if(active) {
      e.preventDefault();
      openModal('packing');
    }
  }

  const clearItems = () => {
    if(active) {
      setItem(null);
      setItems([]);
    }
  }
  useEffect(() => {
    setActive(items.length !== 0);
  }, [items]);

  useEffect(() => {
    const leftActivate = position !== 0;
    const rightActivate = items.length > position + 2;
    setArrowActivate({
      left: leftActivate,
      right: rightActivate
    });
    if (position > items.length - 2 && items.length - 2 >= 0) {
      setPosition(items.length - 2);
    }
  }, [position, items]);
  
  const price = items.reduce((total, item) => {
    switch(item?.setType) {
      case "largeSet":
        return total + parseInt(item?.price || '', 10) + 2700;
      case "set":
        return total + parseInt(item?.price || '', 10) + 2000;
      case "normal":
      default:
        return total + parseInt(item?.price || '', 10);
    }
  }, 0);
  
  return (
    <CartWrapper>
      <CartInfo>
        <ItemSize>
          <SmSpanBlack>Carrito</SmSpanBlack>
          <ItemBadge active={items.length !== 0}>
            <SmSpanWhite>{items.length}</SmSpanWhite>
          </ItemBadge>
        </ItemSize>
        <ItemsPrice>
          <SmSpanBlack>Monto total</SmSpanBlack>
          <Price active={items.length !== 0}>S/. {price}</Price>
        </ItemsPrice>
      </CartInfo>
      <CartItemList>
        <CartItemsController active={arrowActivate.left} onClick={onClickLeftArrow}>{'<'}</CartItemsController>
        <CartItems>
          {items.length === 0 ?
            <CartItemsEmptyWrapper>
              <SmSpanLightGray>No hay productos en el carrito</SmSpanLightGray>
            </CartItemsEmptyWrapper>
            :
            <CartItemsWrapper position={position} itemLength={items.length}>
              {items.map((item, idx) => <CartItem key={idx} idx={idx} item={item}/>)}
            </CartItemsWrapper>
          }
        </CartItems>
        <CartItemsController active={arrowActivate.right} onClick={onClickRightArrow}>{'>'}</CartItemsController>
      </CartItemList>
      <PaymentWrapper>
         <CancelButton active={active} onClick={clearItems}>
           <MdSpanWhite>Cancelar</MdSpanWhite>
         </CancelButton>
         <PaymentButton active={active} onClick={setPaymentOrder}>
           <MdSpanWhite>Pagar</MdSpanWhite>
         </PaymentButton>
       </PaymentWrapper>
    </CartWrapper>
  );
}

export default Cart;