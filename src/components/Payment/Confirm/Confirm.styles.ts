
import styled from "styled-components";

export const OrderedItemWrapper = styled.div`
height: 21.87vh;
  background-color: #fff;
`;

export const OrderedItemTitle = styled.div`
  position: relative;
  padding: 0 65px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 11.46vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  & > span {
    margin: 14px 0;
  }
  & > img {
    position: absolute;
    right: 85px;
    height: 80%;
  }
`;

export const OrderedItemSize = styled.div`
  padding: 0 65px;
  height: 5.21vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderedItemPrice = styled.div`
  padding: 0 65px;
  height: 5.21vh;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export const OrderedItemImg = styled.img``;


export const OrderedMenuArea = styled.div`
  height: calc(58.85vh - 60px);
  overflow: scroll;
  padding: 30px 65px;
  background-color: #f2f2f2;
`;

export const PriceArea = styled.div`
  height: 11.46vh;
  padding: 0 65px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const OrderPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const DiscountPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const TotalPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const ButtonArea = styled.div`
  height: 5.21vh;
  display: flex;
`;

export const CancelButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

export const OrderButton = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #de0000;
`;