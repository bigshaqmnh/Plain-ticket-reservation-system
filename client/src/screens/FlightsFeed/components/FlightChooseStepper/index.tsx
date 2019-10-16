import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

interface IFlightChooseStepperProps {
  steps: string[];
  activeStep: number;
}

const FlightChooseStepper = ({ steps, activeStep }: IFlightChooseStepperProps) => (
      <Stepper className="flight-choose-stepper" activeStep={activeStep} alternativeLabel>
        {steps.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );

export default FlightChooseStepper;
