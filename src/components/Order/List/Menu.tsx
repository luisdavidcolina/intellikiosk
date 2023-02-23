import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  SmSpanBlack,
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
    <div className="flex h-full w-full  flex-col justify-center mt-20">
      <h2 className="text-4xl font-bold w-full text-center mt-40">
        SELECCIONA O <br />
        ESCANEA TUS PRODUCTOS
      </h2>
      <div className="flex mt-5 px-20">
      <img
       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADQklEQVR4nO2a229NQRSHt9TlgVRcUhQhFRpEFFGhT/wR3v0hfSLEJWmliTQeJOJBaaQPhAgSwYNLaUPVJR4EbRNV6pK4tflkHb9T2+nep/vsPbtnu/ySnZyZzl5rvs7MOmtmjuf9118oYC3QBPQAn/TY58PAGi/rAqYDLcAI4RoV0AwvwxCX1NnPQDNQD8zUUy+AL2pzMQ4McBToBBanBWIjYXoBrCvSbj3wUm2bY/g5r3efANWJOx6wJkY0EjkIYAnQDnzQcwZYqb/VAV81zVaX6GsOcFcwj4FFLkFsYZuafBBDAetjKD8lfCMYZ1TmAl16/xGw0BXIQxndrLKNhOmsdVzPOdWdUputKt+P6XMe0C0b5n+BCxCbOqZZBeWxBQksVd2wypW4VQ9QlRTkrYxVqpxTQLuxemC2Y5AHLkAsHJq2lACyTcVOR1OrKhGEjB6SwZYSQI6oeDAmRJfe73WyPmS4RuH3G7BhIhBgE/Bd7WtiRKx7ziOWz8E+Ge+PADKQYDRu+L4Q3X2H+BxUKNyOKaCNX9a2Ioafbq0Jt9/qATC7I4DsBaZ6WRcRFvsfIf4VEOAYMKjc66TlZl4WRbTF7lcfsBE4rqg3KMCa8hAUdDisPiSZDNIAsDzLIEHJZBjgBcuYgTeF+5qyg8QADN3XZBIkrJ4i+5pUVaRjt4A7AfU3gdthdiiyr4nTuVrt/Pr12OfaUkBi+MzJmX1BvGO8hvN7ECeOxtu5DlxzZt+3B7ejmGrN1Y4wGFcgYUoCkk/NxzJOS/qAtiCYLIP06d3fQl4YTJZBTuvdjsL0OwgmyyCrfIu9LQJMNkFMSuryp4ftATC2qTrhD2leSiKpfU2b4YgjM+qi00Fy8o+KCGPHQ3sSOSreh5xcGCo6zdIWkitjZYPBJUg5YXANUg4Yfp3iv0/DeNEA4NhXnfz0puVgUmCARvloTcN+GMy0FKbVa9nf4dL2RDBXgfmO7E7xbSeuuLAZNQDkr6BfAbviHFgXjEQewk5TVniTJbu3sN1dPlQCz4ADNiWAZRP9WMDuI/l519Lom04G0TBpEAXTYSfwlOS6nIWTR8uMG4D9uqh57vspR5g+6h6kFdheVoD/8pLrByGIy5kBEzpaAAAAAElFTkSuQmCC"
       className="w-40 h-40 p-5 mx-auto"
      ></img>
       <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEYElEQVR4nO2bXYhVVRTH99SUo+nkJ4hUzkRkoZWaGWZgTuBXpJn55INh4IuQFKHRp/rgpBSB1UMf4kOCYBAiJT2YRh8UkYVCpqiQmhCMidLLZB+/2HP/u7s4nXs8d87Y3DPtP2y453/22mvtdfdeZ++z13EuIiKirABuBW7JuN8GzAXu6GvFTcDVOeu29KnyarvjgYsqNyTuNQOvAn9SxR5gTFGlzcBLwAUp/gAYl1F/mYzYUkhxettjgF+As8DoxL3nSMeeokqfTmn084z6G1RnbyHFtdsf5kuCuwI4L71fAHcBbxt7byui8JAaOQi8axptr1F/ELCk8NCrz8ZWY9cT4qYbbl5fOWC7abTNNRCAH2XXT94JwJe69tPx+jwNtAAjU/i1KVPgs8vQgVT9dcg/UiMGvJJH+ErgKNANTE4Jghs1x3wQ3J0VBHtpvNU/paATwkg4Bzzj7c8jeBXQJcFZRR+DvTD8kvp7EROa6hW6Dpjq+gn9rT8iZbi3A3eWrLTVPfQtgKHAi8BpyotTwAvANa4eADcCPzBw8H2txdq/AFwLHDHC+4DlwMwGGNZ5i7f1UeAT0w//h7bmccAmI/SsKzk0BQI2Xqpys3ZYHh+6AQLgI/XpbOZiCJhqvPWQ2dCMUGkyS9UezsgOFjfccEPEtSaC6wi7i9OuznNDEwsYzw0x3HBxgw0XbGsxT63ADRL3sOnX5CwHLDAVJ4pbYbiefTewJhApU6fLcFvFHTHcruQ22v8Wt8twIQ5tNVxYIW4yXMAaXY823GPiJhluQZYDFpmKEwaQAyYYblF0QC0QRwBxChBjwD+IQdDFp4CLj0HiOoC4EKKKuBJ0cSns4l6AuBki7gYRzEYqboepIL4PcNVREV+IUEF8I+SqoyK+EqOC+E7Q/Q9eik4DltrEJB1beW624WaLm2m4eeKmlcUB85VD+Ly7TPBtS8f8hnNAf6GhHEBFuR+2NxvOH609oHZuN0dmbwHHga+AexLtdAILzVGXT8s74ZOnGtYBwIPKy/N40vB7gd+BX5WnN0OdWqe578/ut5v6K9XGKl23S87HhPsbxQFjw1m8kX0KeC3FAZOU2Owd5LHM3HtdJ7b36dqntf4sp6wyB5sXdb7fmWJzyAkY+585oBZ0ypt0gD813qy8v20+Dc7cW6Lh/bLqnVSd74B3fGqLgmunEq//ShsFCRsKOaDDVOz5dzVMd6oMy5C9CXhcsjtDjh/wvrj3NLzvVh7CemAx8LXO70cC36h0yxnjgDnKVQoOmJXjTwj2dpjHcUBHlvB4U3F1lqIU2aXKyAxlizK3uxK8n/ujgB3AMWB/MiNUIyD8e/cq69vX3VCPTaY9ny8ckJ0rTEU5yg4b5UoOTYkz6tOBPAKLjbcOhFhQRvjPaYBvTX8W5hV8wwj9AXyq4PRmSco22extD8j/1QqV57TPrvqN8qNbn9DUnzVKZRHig9bHwGGtxspQDsvmdY32MUdEREREhGsg/A1qBDKeYtVTPgAAAABJRU5ErkJggg=="
        className="w-40 h-40 mx-auto"
      ></img>
      </div>
     
      <div className="flex flex-col  w-full h-full mt-10 px-20 grid grid-cols-2 gap-8 justify-center">
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
        <h1 className="text-4xl">
          Selecciona un producto
        </h1>
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
            className="max-w-sm btn-primary rounded overflow-hidden p-3"
          >
            <MenuListImage
              src={`/images/menu/${menu.code}.png`}
              className="-m-3"
              size={menuLength}
            />
            <div className="px-2 py-4">
              <div className="font-bold text-xl mb-2">{menu.menuName}</div>
              {menu.menuInfo && <p className="text-gray-700 text-base">{menu.menuInfo}</p>}
            </div>
              <span className="inline-block bg-gray-200 rounded-full px-2 text-lg text-sm font-semibold text-gray-700">S/. {menu.price}</span>
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
