import React, {useState} from 'react';
import {StepContext} from '@/data/context';
import styled from 'styled-components';
import Stepper from './Stepper';
import Confirm from './Confirm';
import Type from './Type';
import Pay from './Pay'
import Complete from './Complete';

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepArea = styled.div`
  height: 5.21vh;
`;

const renderStep = (index: number) => {
  switch(index) {
    case 0:
    default:
      return <Confirm />;
    case 1:
      return <Type />;
    case 2:
      return <Pay />;
    case 3:
      return <Complete />;
  }
}

const Step = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const stepContext = {step: stepIndex, setStep: setStepIndex};
  return (
    <>
      <StepWrapper>
        <StepContext.Provider value={stepContext}>
          <StepArea>
            <Stepper step={stepIndex} />
          </StepArea>
          {renderStep(stepIndex)}
        </StepContext.Provider>
      </StepWrapper>
    </>
  );
}

export default Step;