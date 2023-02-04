
import styled from 'styled-components';

export const SelectOrderTypeArea = styled.div`
  height: 58.85vh;
  background-color: #f2f2f2;
`;

export const StepTitle = styled.div`
  width: 100%;
  height: 19.79vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > span {
    line-height: 72px;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      line-height: 48px;
    }
  }
`;

export const OrderCancelArea = styled.div`
  height: 16.67vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderPriceArea = styled.div`
  width: calc(100% - 130px);
  height: 8.07vh;
  padding: 0 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OrderCancelButton = styled.div`
  position: relative;
  width: 71.3vw;
  height: 5.21vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #000;
`;

export const InsertImage = styled.img`
  display: block;
  margin: 0 auto;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 25.45vw;
  }
`
