import { useContext } from "react";

import { LgSpanWhite, MdSpanWhite } from "@/components/StyledText";
import { Page, PageInnerWrapper } from "../Page";
import { PageContext, MenuContext } from "@/data/context";
import Advertise from "../Advertise";
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
    setPage("cart");
  };
  return (
    <Page>
      <PageInnerWrapper onClick={handleClick}>
      <Advertise />
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
