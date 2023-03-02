
import styled, {keyframes} from "styled-components";

export const Main = styled.main`
  position: relative;
  height: 79.17vh;
`;

export const Slider = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const changeSlide = keyframes`
  0%{margin-left: 0;}
  20%{margin-left: 0;}

  25%{margin-left: -100%;}
  45%{margin-left: -100%;}

  50%{margin-left: -200%;}
  70%{margin-left: -200%;}

  75%{margin-left: -300%;}
  100%{margin-left: -300%;}
`;

export const SliderUl = styled.ul`
  display: flex;
  animation: ${changeSlide} 20s infinite
  alternate linear;
  height: 100%;
  width: 400%;
`;

export const SliderLi = styled.li`
  width: 100%;
  list-style: none;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Footer = styled.footer`
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: black;
`;