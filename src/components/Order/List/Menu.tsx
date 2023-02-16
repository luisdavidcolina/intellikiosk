import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { SmSpanBlack, SmSpanPrimary, XsSpanLightGray } from '@/components/StyledText';
import { menuTabItems, menuList } from '@/data/menu';
import { IItem, MenuContext, ModalContext } from '@/data/context';

interface IActivable {
  active?: boolean;
}

const MenuTabWrapper = styled.div`
  display: grid;
  height: 10.42vh;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
`;

const MenuTabItem = styled.div<IActivable>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px rgba(0, 0, 0, 0.4);
  font-family: S-CoreDream-7;
  font-size: 30px;
  font-weight: 800;
  overflow: hidden;
  color: ${props => props.active ? '#de0000' : 'rgba(0, 0, 0, 0.4)'};
  border-bottom: ${props => props.active ? '10px solid #de0000' : ''};
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

interface IMenuTab {
  index: number;
  onClick: (idx: number) => void;
}

const MenuTab = (props: IMenuTab) => {
  const {index, onClick} = props;
  return (
    <MenuTabWrapper>
      {menuTabItems.map((tabItem, idx) => 
        <MenuTabItem key={idx} onClick={() => onClick(idx)} active={idx === index}>{tabItem.title}</MenuTabItem>
      )}
    </MenuTabWrapper>
  )
}

interface IFlexable {
  size?: number;
}

const MenuListWrapper = styled.div<IFlexable>`
  height: 48.44vh;
  display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: ${props => props.size === 6 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'};
`;

const MenuListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MenuListImage = styled.img<IFlexable>`
  margin: 10px;
  width: ${props => props.size === 6 ? '23.15vw' : '18.5vw'};
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: ${props => props.size === 6 ? '23.15vw' : '10vw'};
    margin: 5px;
  }
`;

interface IMenuList {
  index: number;
}

const setableMenuTypes = ['premium', 'whopper', 'burger', 'chicken'];

const MenuList = (props: IMenuList) => {
  const {index} = props;
  const [menus, setMenus] = useState<IItem[]>([]);
  const [menuLength, setMenuLength] = useState(0);
  const {setItem} = useContext(MenuContext);
  const {openModal} = useContext(ModalContext);
  const onMenuClick = (menu: IItem) => {
    if(setableMenuTypes.includes(menu?.type || '')){
      openModal('selectSet', { menu });
    } else {
      setItem(menu);
    }
  };
  useEffect(() => {
    setMenus(menuList.filter((menu) => menu.type == menuTabItems[index].type));
    setMenuLength(menuTabItems[index].itemLength);
  }, [index]);
  return (
    <MenuListWrapper size={menuLength}>
      {menus.map((menu, idx) => 
        <MenuListItem key={idx} onClick={() => onMenuClick(Object.assign(menu, {img: `/images/menu/${menu?.type}_${idx}.png`, setImg: `/images/menu/${menu?.type}_set_${idx}.png`}))}>
          <MenuListImage src={`/images/menu/${menu?.type}_${idx}.png`} size={menuLength}/>
          <SmSpanBlack margin="10px">{menu?.menuName}</SmSpanBlack>
          {menu?.menuInfo && <XsSpanLightGray margin="0 10px 10px">{menu?.menuInfo}</XsSpanLightGray>}
          <SmSpanPrimary>S/. {menu?.price}</SmSpanPrimary>
          
        </MenuListItem>
      )}
    </MenuListWrapper>
  )
}

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = () => {
  const [menuTabIndex, setMenuTabIndex] = useState(0);
  const selectMenuTab = (index: number) => {
    setMenuTabIndex(index);
  };
  return (
    <>
      <MenuWrapper>
        <MenuTab index={menuTabIndex} onClick={selectMenuTab}></MenuTab>
        <MenuList index={menuTabIndex}></MenuList>
      </MenuWrapper>
    </>
  );
}

export default Menu;