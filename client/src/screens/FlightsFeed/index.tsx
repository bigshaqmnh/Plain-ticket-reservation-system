import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import Typography from '@material-ui/core/Typography';

import { IFlightState, IFlight, IDispatch, IState } from '../../interfaces';

import FlightCard from './components/FlightCard';
import FlightChooseStepper from './components/FlightChooseStepper';

import { setActiveStep } from './actionCreators';

import flightData from './data';

interface IFlightsFeedProps {
  readonly history: History;
  isLoading: boolean;
  flights: IFlightState;
  activeStep: number;
  setActiveStep: (step: number) => void;
  readonly dispatch: IDispatch;
}

class FlightsFeed extends React.PureComponent<IFlightsFeedProps> {
  public render() {
    const { isLoading, flights, activeStep, setActiveStep } = this.props;
    const twoWays: boolean = !isLoading && (!!flights.backward.length);

    return !isLoading &&
      <>
        <Typography align="center" variant="h2" gutterBottom>
          Flights Feed
        </Typography>
        {twoWays &&
        <FlightChooseStepper activeStep={activeStep} setActiveStep={setActiveStep}/>
        }
        <Typography variant="h3">
          {twoWays ? 'Forward Flights' : 'Flights'}
        </Typography>
        {flights.forward && flights.forward.map((flight: IFlight) =>
          <FlightCard key={flight.id} flightInfo={flight}/>)
        }
        {twoWays &&
        <>
          <Typography variant="h3">
            Backward Flights
          </Typography>
          {flights.backward && flights.backward.map((flight: IFlight) =>
            <FlightCard key={flight.id} flightInfo={flight}/>)
          }}
        </>
        }
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
