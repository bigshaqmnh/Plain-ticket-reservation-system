import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBackward from '@material-ui/icons/ArrowBackIos';
import TicketIcon from '../../assets/img/flight-ticket.svg';

import { IFlightState, IFlight, IDispatch, IState } from '../../interfaces';

import FlightCard from './components/FlightCard';
import FlightChooseStepper from './components/FlightChooseStepper';

import { setActiveStep } from './actionCreators';

import flightData from './data';

import './style.scss';

interface IFlightsFeedProps {
  readonly history: History;
  isLoading: boolean;
  flights: IFlightState;
  activeStep: number;
  setActiveStep: (step: number) => void;
  readonly dispatch: IDispatch;
}

const steps = ['Select forward flight', 'Select backward flight'];

class FlightsFeed extends React.PureComponent<IFlightsFeedProps> {
  private handleNextStep = () =>
    this.props.setActiveStep(this.props.activeStep + 1);

  private handleBackStep = () =>
    this.props.setActiveStep(this.props.activeStep - 1);

  public render() {
    const { isLoading, flights, activeStep } = this.props;
    const renderStepper: boolean = !isLoading && (!!flights.backward.length);
    const displayBackwardFlights = renderStepper && activeStep > 0 && activeStep < steps.length;
    const displayedFlights = displayBackwardFlights ? flights.backward : flights.forward;

    return !isLoading &&
      <>
        <Box className="header">
          <img src={TicketIcon} alt=""/>
          <Typography align="center" variant="h2">
            Flights Feed
          </Typography>
          <img src={TicketIcon} alt=""/>
        </Box>
        {renderStepper &&
        <FlightChooseStepper steps={steps} activeStep={activeStep}/>
        }
        <Typography align="center" variant="h3">
          {displayBackwardFlights ? 'Backward Flights' : 'Forward Flights'}
        </Typography>
        <div className="flights-feed">
          {displayedFlights.map((flight: IFlight) =>
            <FlightCard key={flight.id} flightInfo={flight}/>)
          }
          {displayBackwardFlights &&
          <Button
            className="backward-btn"
            disabled={!activeStep}
            onClick={this.handleBackStep}
          >
            <ArrowBackward/>
            Back
          </Button>
          }
          <Button className="forward-btn" variant="contained" color="primary" onClick={this.handleNextStep}>
            {displayBackwardFlights ? 'Continue' : 'Next'}
            <ArrowForward/>
          </Button>
        </div>
      </>;
  }
}

const mapStateToProps = ({ flightsFeed }: IState) => ({
  isLoading: false,
  flights: flightData,
  activeStep: flightsFeed.activeStep
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
  setActiveStep: (step: number) => dispatch(setActiveStep(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightsFeed);
