import styled from 'styled-components';

export const CompleteOrderArea = styled.div`
  height: 75.52vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const CompleteOrderTitle = styled.div`
  margin: 100px;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 50px; 
  }
`;

export const CompleteOrderNo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > span {
    margin: 20px;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      margin: 10px;
    }
  }
  & > span:nth-child(2) {
    font-family: S-CoreDream-9;
    font-size: 200px;
    font-weight: 900;
    color: #df0000;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 140px;
    }
  }
`;

export const CompleteOrderMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > span {
    display: block;
    line-height: 36px;
    @media only screen and (min-width: 768px) and (max-width: 1024px) {
      line-height: 24px;
    }
  }
`;

export const CompleteOrderImage = styled.img`
  margin: 120px;
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
    width: 180px;
    margin: 55px;
  }
`

export const PaymentWrapper = styled.div`
height: 5.21vh;
display: flex;
`;

interface IAct {
  active?: boolean;
}

export const PaymentButton = styled.div<IAct>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.active ? '#de0000' : '#828282'};
  padding: 40px;
`;