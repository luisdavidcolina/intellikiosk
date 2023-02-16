import { useContext, useEffect, useState } from "react";

import { LgSpanWhite, MdSpanWhite } from "@/components/StyledText";
import { Page, PageInnerWrapper } from "../Page";
import { PageContext, MenuContext, IItem } from "@/data/context";
import { menuTabItems, menuList } from "@/data/menu";

import {
  Main,
  Slider,
  SliderUl,
  SliderLi,
  MainImage,
  Footer,
} from "./Home.styles";

const images = [
  { url: "/images/index/bg_index.jpg" },
  { url: "/images/index/bg_index2.jpg" },
  { url: "/images/index/bg_index3.jpg" },
  { url: "/images/index/bg_index4.jpg" },
];

const HomePage = () => {
  const { setPage } = useContext(PageContext);
  const { orderId, setOrderId } = useContext(MenuContext);
  const handleClick = (e: any) => {
    e.preventDefault();
    orderId ? setOrderId(orderId + 1) : setOrderId(1);
    setPage("order");
  };

  const { items, setItems } = useContext(MenuContext);

  const addToCart = (item: IItem) => {
    if (item) {
      setItems([...items, item]);
      items.push(item);
    }
  };

  let text = "";

  useEffect(() => {
    const detectedKeyDown = (e: any) => {
      if ((e.key === "0") || (e.key === "1") || (e.key === "2") ||
       (e.key === "3") || (e.key === "4") || (e.key === "5") ||
        (e.key === "6") || (e.key === "7") || (e.key === "8") || (e.key === "9") ) {
        text = text + e.key;
      }
      console.log(text);
      if (text.length >= 4) {
        const itemFind = menuList.find((item) =>
          (text).includes(item.code)
        ) as IItem;
        if (itemFind) {
          text = "";
          addToCart(itemFind);
        }
      }
    };
    document.addEventListener("keydown", detectedKeyDown);
  }, [addToCart]);

  return (
    <Page>
      <PageInnerWrapper onClick={handleClick}>
        <Main>
          <Slider>
            <SliderUl>
              {images.map(({ url }) => (
                <SliderLi key={url}>
                  <MainImage src={url} />
                </SliderLi>
              ))}
            </SliderUl>
          </Slider>
        </Main>
        <Footer>
          <LgSpanWhite margin="10px">ORDENA AQUI</LgSpanWhite>
          <MdSpanWhite margin="8px">Tocar pantalla para iniciar</MdSpanWhite>
        </Footer>
      </PageInnerWrapper>
    </Page>
  );
};

export default HomePage;
