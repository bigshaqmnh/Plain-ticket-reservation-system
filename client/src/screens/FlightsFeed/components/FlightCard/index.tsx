import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IFlight } from '../../../../interfaces';

import FlightIcon from '../../../../assets/img/flight.png';

import './style.scss';

interface IFlightCardProps {
  flightInfo: IFlight;
  isChosen: boolean;
  handleFlightChoose: (id: number) => void;
}

const FlightCard = ({ flightInfo, isChosen, handleFlightChoose }: IFlightCardProps) => {
  const { id, departureAirport, arrivalAirport, departureTime, arrivalTime, airplane } = flightInfo;

  return <Card className="flight-card">
    <CardContent className="content">
      <div className="flight-info">
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            From:
          </Typography>
          <Typography>
            {`Departure airport: ${departureAirport.name}`}
          </Typography>
          <Typography>
            Departure time:
            <br/>
            {departureTime}
          </Typography>
          <Typography>
            {`Airplane: ${airplane.name}`}
          </Typography>
        </div>
        <img className="flight-icon" src={FlightIcon} alt=""/>
        <div>
          <Typography variant="h6" align="center" gutterBottom>
            To:
          </Typography>
          <Typography>
            {`Arrival airport: ${arrivalAirport.name}`}
          </Typography>
          <Typography>
            Arrival time:
            <br/>
            {arrivalTime}
          </Typography>
        </div>
      </div>
    </CardContent>
    <CardActions className="actions">
      <Button
        size="large"
        onClick={() => handleFlightChoose(id)}
        disabled={isChosen as boolean}
      >
        {isChosen ? 'Booked' : 'Book'}
      </Button>
    </CardActions>
  </Card>;
};

export default FlightCard;
