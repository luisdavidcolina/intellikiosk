import styled from 'styled-components';
import Advertise from '../Advertise';
import Step from './Step';
import Footer from '../Footer';

const HeaderArea = styled.div`
  height: 13.02vh;
`;

const FooterArea = styled.div`
  height: 6.25vh;
`;

const StepArea = styled.div`
  height: 80.73vh;
`;

const PaymentPage = () => {
  return (
    <>
      <HeaderArea>
        <Advertise />
      </HeaderArea>
      <StepArea>
        <Step />
      </StepArea>
      <FooterArea>
        <Footer />
      </FooterArea>
    </>
  );
};

export default PaymentPage;