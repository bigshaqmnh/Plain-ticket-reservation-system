import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface IFlightChooseStepperProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

const steps = ['Select forward flight', 'Select backward flight'];

const FlightChooseStepper = ({ activeStep, setActiveStep }: IFlightChooseStepperProps) => {
  console.log('active step: ', activeStep);
  const handleNextStep = () =>
    setActiveStep(activeStep + 1);

  const handleBackStep = () =>
    setActiveStep(activeStep - 1);

  const handleResetStepper = () =>
    setActiveStep(0);

  return (
    <div className="flight-choose-stepper">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={this.handleResetStepper}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBackStep}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={this.handleNextStep}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightChooseStepper;
