import styled from 'styled-components';
import Advertise from '../Advertise';
import Step from './Step';

const StepArea = styled.div`
  height: 80.73vh;
`;

const PaymentPage = () => {
  return (
    <>
       <Advertise />
      <StepArea>
        <Step />
      </StepArea>
    </>
  );
};

export default PaymentPage;