import React from 'react';
import styled from 'styled-components';
import { SmSpanBlack, XsSpanBoldGray } from '@/components/StyledText';

const StepperWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

interface IPassable {
  passed: boolean;
}

const StepItem = styled.div<IPassable>`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 65px;
  background-color: ${props => props.passed ? '#eec2c2' : '#ffffff'}
`;

const paymentSteps = [
  {no: 1, name: 'Confirmar orden'},
  {no: 2, name: 'Metodo de pago'},
  {no: 3, name: 'Pago con Tarjeta'},
  {no: 4, name: 'Orden completa'},
];

interface IStepper {
  step: number;
}

const Stepper = (props: IStepper) => {
  const {step} = props;
  return (<StepperWrapper>
    {paymentSteps.map((paymentStep, idx) => (
      <StepItem key={idx} passed={idx <= step}>
        <XsSpanBoldGray>PASO {paymentStep.no}</XsSpanBoldGray>
        {step === idx && <SmSpanBlack margin="10px 0 0">{paymentStep.name}</SmSpanBlack>}
      </StepItem>
    ))}
  </StepperWrapper>);
}

export default Stepper;