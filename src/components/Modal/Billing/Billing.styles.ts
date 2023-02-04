import styled from "styled-components";

export const ModalHeader = styled.div`
  height: 11.46vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalFooter = styled.div`
  height: 11.46vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Option = styled.div`
  width: 35.65vw;
  height: 24.48vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OptionImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

export const OptionImg = styled.img`
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 11.11vw;
  }
`;

export const SelectedImg = styled.img`
  position: absolute;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 11.11vw;
  }
`;

interface IAct {
  active?: boolean;
}

export const ModalFooterBtn = styled.div<IAct>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 71.3vw;
  height: 5.21vh;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#000" : "#e0e0e0")};
`;

export const KeyboardBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5vh;
  height: 5vh;
  border-radius: 5px;
  color: #fff;
  background-color: #ff0000;
  font-family: S-CoreDream-7;
  font-size: 20px;
  font-weight: 800;
  margin: 5px;
`;
