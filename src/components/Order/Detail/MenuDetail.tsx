import React, {useContext} from 'react';
import styled from 'styled-components';
import { MdSpanWhite, SmSpanBlack, SmSpanPrimary, XsSpanWhite } from '@/components/StyledText';
// import { menuTabItems, menuList } from '@/data/menu';
import { MenuContext, IItem } from '@/data/context';


const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 58.85vh;
`;

const MenuNav = styled.div`
  height: 5.21vh;
  padding: 0 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackBtn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlankDiv = styled.div`
  width: 85px;
`;

const MenuIntro = styled.div`
  height: 5.21vh;
  padding: 0 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuSub = styled.div`
  height: 32.81vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubMenuImg = styled.img`
  width: 23.15vw;
  margin: 20px;
`;
// const SubMenuBtn = styled.div`
//   margin: 60px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 175px;
//   height: 50px;
//   border-radius: 5px;
//   background-color: #000;
// `;

interface ISubmenu {
  item: IItem | null;
}

const SubMenu = (props: ISubmenu) => {
  const {item} = props;
  return <SubMenuWrapper>
    <SubMenuImg src={item?.img}/>
    <SmSpanBlack>{item?.menuName}</SmSpanBlack>
  </SubMenuWrapper>;
}
const MenuPrice = styled.div`
  height: 5.21vh;
  padding: 0 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const MenuButtonWrapper = styled.div`
  height: 10.42vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled.div`
  width: 74.07vw;
  height: 5.21vh;
  border-radius: 5px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepLabel = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 20px;
  }
`;

const StepLabelNo = styled.div`
  width: 50px;
  height: 50px;
  background-color: #000;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
`;

const MenuDetail = () => {
  const {item, setItem, items, setItems} = useContext(MenuContext);
  const onBackClicked = () => {
    setItem(null);
  }
  const addToCart = () => {
    if (item) {
      setItems(items.concat(item));
      setItem(null);
    }
  }
  return (
    <>
     <MenuWrapper>
        <MenuNav>
          <BackBtn>
            <SmSpanBlack onClick={onBackClicked}>{'<'} Atras</SmSpanBlack>
          </BackBtn>
          <SmSpanBlack>Confirmar selección</SmSpanBlack>
          <BlankDiv />
        </MenuNav>
        <MenuIntro>
          <StepLabel>
            <StepLabelNo><XsSpanWhite>1</XsSpanWhite></StepLabelNo>
            <SmSpanBlack>Menu seleccionado</SmSpanBlack>
          </StepLabel>
          <SmSpanBlack>
            {item?.setType === 'largeSet' && `${item?.menuName} large set ${parseInt(item?.price || '', 10) + 2700} $` }
            {item?.setType === 'set' && `${item?.menuName} set ${parseInt(item?.price || '', 10) + 2000} $` }
            {item?.setType === 'normal' && `${item?.menuName} ${item?.price}$` }
          </SmSpanBlack>
        </MenuIntro>
        <MenuSub>
          <SubMenu item={item}></SubMenu>
          {item?.setType === 'largeSet' && <>
            <SubMenu item={{img: 'menu/sidemenu_8.png', menuName: 'French Fries (L)'}}></SubMenu>
            <SubMenu item={{img: 'menu/drink_4.png', menuName: 'Coca-Cola (L)'}}></SubMenu>
          </>}
          {item?.setType === 'set' && <>
            <SubMenu item={{img: 'menu/sidemenu_8.png', menuName: 'French Fries (R)'}}></SubMenu>
            <SubMenu item={{img: 'menu/drink_4.png', menuName: 'Coca-Cola (R)'}}></SubMenu>
          </>}
        </MenuSub>
        <MenuPrice>
          <StepLabel>
            <StepLabelNo><XsSpanWhite>2</XsSpanWhite></StepLabelNo>
            <SmSpanBlack>Monto a ordenar</SmSpanBlack>
            <SmSpanPrimary>
              {item?.setType === 'largeSet' && `${parseInt(item?.price || '', 10) + 2700} $` }
              {item?.setType === 'set' && `${parseInt(item?.price || '', 10) + 2000} $` }
              {item?.setType === 'normal' && `${item?.price}$` }
            </SmSpanPrimary>
          </StepLabel>
        </MenuPrice>
        <MenuButtonWrapper>
          <MenuButton onClick={addToCart}>
            <MdSpanWhite>Agregar al carrito</MdSpanWhite>
          </MenuButton>
        </MenuButtonWrapper>
      </MenuWrapper>
    </>
  );
}

export default MenuDetail;