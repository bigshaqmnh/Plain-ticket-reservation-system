import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBackward from '@material-ui/icons/ArrowBackIos';
import TicketIcon from '../../assets/img/flight-ticket.svg';

import { IDispatch, IFlight, IState } from '../../interfaces';
import { IFlightsFeedProps, IFlightsFeedState } from './interfaces';

import { setChosenFlights } from './actionCreators';

import FlightCard from './components/FlightCard';
import FlightChooseStepper from './components/FlightChooseStepper';

import navigateTo from '../../helpers/navigateTo';

import './style.scss';

const steps = ['Select forward flight', 'Select backward flight'];

class FlightsFeed extends React.PureComponent<IFlightsFeedProps, IFlightsFeedState> {
  constructor(props: IFlightsFeedProps) {
    super(props);
    this.state = {
      activeStep: 0,
      chosenForwardFlight: null,
      chosenBackwardFlight: null
    };
  }

  private handleFlightChoose = (flightId: number) => {
    if (this.state.activeStep) {
      this.setState({
        chosenBackwardFlight: flightId
      });
    } else {
      this.setState({
        chosenForwardFlight: flightId
      });
    }
  };

  private handleNextStep = () => {
    const isFinalStep = !this.props.showBackwardFlights || this.state.activeStep === steps.length - 1;

    if (isFinalStep) {
      const { chosenForwardFlight, chosenBackwardFlight } = this.state;

      this.props.setChosenFlights([chosenForwardFlight, chosenBackwardFlight]);

      navigateTo('/configurator');
    } else {
      this.setState(({ activeStep: prevActiveStep }: IFlightsFeedState) => ({
        activeStep: prevActiveStep + 1
      }));
    }
  };

  private handleBackStep = () =>
    this.setState(({ activeStep: prevActiveStep }: IFlightsFeedState) => ({
      activeStep: prevActiveStep - 1
    }));

  public render() {
    const { isLoading, flights, showBackwardFlights } = this.props;
    const { activeStep, chosenForwardFlight, chosenBackwardFlight } = this.state;
    const displayBackwardFlights: boolean = showBackwardFlights && activeStep > 0;
    const displayedFlights: IFlight[] = displayBackwardFlights ? flights.backward : flights.forward;
    const isNextStepDisabled: boolean = !chosenForwardFlight as boolean
      || (!!activeStep && !chosenBackwardFlight as boolean);
    const isFinalStep: boolean = !showBackwardFlights || activeStep === steps.length - 1;

    return !isLoading &&
      <>
        <Box className="header">
          <img src={TicketIcon} alt=""/>
          <Typography align="center" variant="h2">
            Flights Feed
          </Typography>
          <img src={TicketIcon} alt=""/>
        </Box>
        {showBackwardFlights &&
        <FlightChooseStepper steps={steps} activeStep={activeStep}/>
        }
        <Typography align="center" variant="h3">
          {displayBackwardFlights ? 'Backward Flights' : 'Forward Flights'}
        </Typography>
        <div className="flights-feed">
          {displayedFlights.map((flight: IFlight) => {
            const { id } = flight;
            const isChosen: boolean = (id === chosenForwardFlight) || (id === chosenBackwardFlight);

            return <FlightCard
              key={id}
              flightInfo={flight}
              handleFlightChoose={this.handleFlightChoose}
              isChosen={isChosen}
            />;
          })}
          {displayBackwardFlights &&
          <Button
            className="backward-btn"
            disabled={!activeStep as boolean}
            onClick={this.handleBackStep}
          >
            <ArrowBackward/>
            Back
          </Button>
          }
          <Button
            className="forward-btn"
            variant="contained"
            color="primary"
            onClick={this.handleNextStep}
            disabled={isNextStepDisabled}
          >
            {isFinalStep ? 'Continue' : 'Next'}
            <ArrowForward/>
          </Button>
        </div>
      </>;
  }
}

const mapStateToProps = ({ main }: IState) => ({
  isLoading: main.flights.isFetching,
  flights: main.flights.data,
  showBackwardFlights: main.flights.needBackwardTicket
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
  setChosenFlights: (flightIds: number[]) => dispatch(setChosenFlights(flightIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightsFeed);
