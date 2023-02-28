import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SmSpanBlack, XsSpanLightGray } from "@/components/StyledText";
import { menuTabItems, menuList } from "@/data/menu";
import { IItem, MenuContext, ModalContext } from "@/data/context";

interface IMenuTab {
  index: number;
  onClick: (idx: number) => void;
}

const MenuTab = (props: IMenuTab) => {
  const { index, onClick } = props;
  return (
    <div className="flex h-full w-full  flex-col justify-center">
      <h2 className="text-4xl font-bold w-full text-center my-20">
        SELECCIONA TUS <br />
        PRODUCTOS
      </h2>

      <div className="flex flex-col  w-full h-2/4 px-20 grid grid-cols-2 gap-8 justify-center">
        {menuTabItems.map((tabItem, idx) => (
          <button
            className="rounded-2xl  h-40 w-full btn  btn-primary  p-104  text-2xl"
            key={idx}
            onClick={() => onClick(idx)}
          >
            {tabItem.title}
          </button>
        ))}
      </div>
    </div>
  );
};

interface IFlexable {
  size?: number;
}

const MenuListWrapper = styled.div<IFlexable>`
  gap: 1rem;
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
    <div className="flex flex-col m-3">
      <div className="flex items-center gap-3 grow mb-3">
        <span
          className="btn btn-secondary m-2 text-white rounded-full"
          onClick={() => setMenuTabIndex(99)}
        >
          {"<"} Atras
        </span>
        <h1 className="text-4xl">Selecciona un producto</h1>
      </div>
      <MenuListWrapper className="grid" size={menuLength}>
        {menus.map((menu, idx) => (
          <div
            key={idx}
            onClick={() =>
              onMenuClick(
                Object.assign(menu, {
                  img: `/images/menu/${menu?.code}.png`,
                  setImg: `/images/menu/${menu?.code}.png`,
                })
              )
            }
            className="max-w-sm btn-primary rounded rounded-2xl overflow-hidden p-3"
          >
            <MenuListImage
              src={`/images/menu/${menu.code}.png`}
              className="-m-3"
              size={menuLength}
            />
            <div className="px-2 py-4">
              <div className="font-bold text-xl mb-2">{menu.menuName}</div>
              {menu.menuInfo && (
                <p className="text-gray-700 text-base">{menu.menuInfo}</p>
              )}
            </div>
            <span className="inline-block bg-gray-200 rounded-full px-2 text-lg text-sm font-semibold text-gray-700">
              S/. {menu.price}
            </span>
          </div>
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
      <div className="flex flex-col h-full">
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
