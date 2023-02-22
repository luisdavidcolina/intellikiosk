import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  SmSpanBlack,
  SmSpanPrimary,
  XsSpanLightGray,
} from "@/components/StyledText";
import { menuTabItems, menuList } from "@/data/menu";
import { IItem, MenuContext, ModalContext } from "@/data/context";

interface IMenuTab {
  index: number;
  onClick: (idx: number) => void;
}

const MenuTab = (props: IMenuTab) => {
  const { index, onClick } = props;
  return (
    <div className="flex flex-col w-full h-full justify-center">
      {menuTabItems.map((tabItem, idx) => (
        <button
          className="btn btn-primary m-2 mx-20 text-white text-2xl"
          key={idx}
          onClick={() => onClick(idx)}
        >
          {tabItem.title}
        </button>
      ))}
    </div>
  );
};

interface IFlexable {
  size?: number;
}

const MenuListWrapper = styled.div<IFlexable>`
  height: 48.44vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: ${(props) =>
    props.size === 6 ? "repeat(2, 1fr)" : "repeat(3, 1fr)"};
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
  width: ${(props) => (props.size === 6 ? "23.15vw" : "18.5vw")};
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: ${(props) => (props.size === 6 ? "23.15vw" : "10vw")};
    margin: 5px;
  }
`;

interface IMenuList {
  index: number;
  setMenuTabIndex: any;
}

const setableMenuTypes = ["premium", "whopper", "burger", "chicken"];

const MenuList = (props: IMenuList) => {
  const { index, setMenuTabIndex } = props;
  const [menus, setMenus] = useState<IItem[]>([]);
  const [menuLength, setMenuLength] = useState(0);
  const { setItem } = useContext(MenuContext);
  const { openModal } = useContext(ModalContext);
  const onMenuClick = (menu: IItem) => {
    if (setableMenuTypes.includes(menu?.type || "")) {
      openModal("selectSet", { menu });
    } else {
      setItem(menu);
    }
  };
  useEffect(() => {
    setMenus(menuList.filter((menu) => menu.type == menuTabItems[index].type));
    setMenuLength(menuTabItems[index].itemLength);
  }, [index]);
  return (
    <div className="flex flex-col">
      <button
        className="btn btn-primary m-2 mx-20 text-white w-30  text-2xl"
        onClick={() => setMenuTabIndex(99)}
      >
        Volver
      </button>
      <MenuListWrapper size={menuLength}>
        {menus.map((menu, idx) => (
          <MenuListItem
            key={idx}
            onClick={() =>
              onMenuClick(
                Object.assign(menu, {
                  img: `/images/menu/${menu?.code}.png`,
                  setImg: `/images/menu/${menu?.code}.png`,
                })
              )
            }
          >
            <MenuListImage
              src={`/images/menu/${menu?.code}.png`}
              size={menuLength}
            />
            <SmSpanBlack margin="10px">{menu?.menuName}</SmSpanBlack>
            {menu?.menuInfo && (
              <XsSpanLightGray margin="0 10px 10px">
                {menu?.menuInfo}
              </XsSpanLightGray>
            )}
            <SmSpanPrimary>S/. {menu?.price}</SmSpanPrimary>
          </MenuListItem>
        ))}
      </MenuListWrapper>
    </div>
  );
};

const Menu = () => {
  const [menuTabIndex, setMenuTabIndex] = useState(99);
  const selectMenuTab = (index: number) => {
    setMenuTabIndex(index);
  };
  return (
    <>
      <div className="flex h-full">
        {(menuTabIndex === 99 && (
          <MenuTab index={0} onClick={selectMenuTab}></MenuTab>
        )) || (
          <MenuList
            index={menuTabIndex}
            setMenuTabIndex={setMenuTabIndex}
          ></MenuList>
        )}
      </div>
    </>
  );
};

export default Menu;
