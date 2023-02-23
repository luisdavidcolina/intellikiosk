import React, { useContext } from "react";
import styled from "styled-components";
import { MdSpanWhite, SmSpanBlack, XsSpanWhite } from "@/components/StyledText";
// import { menuTabItems, menuList } from '@/data/menu';
import { MenuContext, IItem } from "@/data/context";

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
  height: 22.81vh;
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
  const { item } = props;
  return (
    <SubMenuWrapper>
      <SubMenuImg src={item?.img} />
      <h2 className="text-3xl font-bold">{item?.menuName}</h2>
    </SubMenuWrapper>
  );
};
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
  const { item, setItem, items, setItems } = useContext(MenuContext);
  const onBackClicked = () => {
    setItem(null);
  };
  const addToCart = () => {
    if (item) {
      setItems(items.concat(item));
      setItem(null);
    }
  };
  return (
    <>
      <MenuWrapper>
        <MenuNav>
          <button className="btn btn-primary" onClick={onBackClicked}>
            {"<"} Atras
          </button>
          <h2 className="text-4xl font-bold">Confirmar selección</h2>
          <br />
        </MenuNav>
        <MenuIntro>
          <StepLabel>
            <StepLabelNo>
              <XsSpanWhite>1</XsSpanWhite>
            </StepLabelNo>
            <h2 className="text-2xl font-bold">Selección</h2>
          </StepLabel>
          <SmSpanBlack>
            {item?.setType === "largeSet" &&
              `${item?.menuName} large set ${
                parseInt(item?.price || "", 10) + 2700
              } $`}
            {item?.setType === "set" &&
              `${item?.menuName} set ${
                parseInt(item?.price || "", 10) + 2000
              } $`}
            {item?.setType === "normal" && `${item?.menuName} ${item?.price}$`}
          </SmSpanBlack>
        </MenuIntro>
        <MenuSub>
          <SubMenu item={item}></SubMenu>
        </MenuSub>
        <MenuIntro>
          {item?.type === "foods" && (
            <div className="flex flex-col">
              <StepLabel>
                <StepLabelNo>
                  <XsSpanWhite>2</XsSpanWhite>
                </StepLabelNo>
                <h2 className="text-2xl font-bold">Cremas</h2>
              </StepLabel>
              <div className="my-5 ml-40 w-full">
                <label
                  style={{ marginLeft: "20px" }}
                  onClick={() => {
                    if (item) {
                      setItem({
                        ...item,
                        modifiers: item.modifiers
                          ? item.modifiers.concat("Ketchup")
                          : ["Ketchup"],
                      });
                      console.log(item);
                    }
                  }}
                >
                  <input type="checkbox" value="val" name="name" />
                  Ketchup
                </label>
                <label
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    if (item) {
                      setItem({
                        ...item,
                        modifiers: item.modifiers
                          ? item.modifiers.concat("Mayonesa")
                          : ["Mayonesa"],
                      });
                      console.log(item);
                    }
                  }}
                >
                  <input type="checkbox" value="val" name="name2" />
                  Mayonesa
                </label>
                <label
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    if (item) {
                      setItem({
                        ...item,
                        modifiers: item.modifiers
                          ? item.modifiers.concat("Mostaza")
                          : ["Mostaza"],
                      });
                      console.log(item);
                    }
                  }}
                >
                  <input type="checkbox" value="val" name="name3" />
                  Mostaza
                </label>
              </div>
            </div>
          )}
        </MenuIntro>
        <MenuPrice>
          <StepLabel>
            <StepLabelNo>
              <XsSpanWhite>3</XsSpanWhite>
            </StepLabelNo>
            <h2 className="text-2xl font-bold">Monto a ordenar</h2>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-2xl font-semibold text-gray-700">
              {`S/ ${item?.price}$`}
            </span>
          </StepLabel>
        </MenuPrice>

        <MenuButtonWrapper>
          <button className="btn btn-primary btn-lg" onClick={addToCart}>
            Agregar al carrito
          </button>
        </MenuButtonWrapper>
      </MenuWrapper>
    </>
  );
};

export default MenuDetail;
