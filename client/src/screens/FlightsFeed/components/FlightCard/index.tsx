import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { IFlight } from '../../../../interfaces';
import { Typography } from '@material-ui/core';

interface IFlightCardProps {
  flightInfo: IFlight;
}

const FlightCard = ({ flightInfo }: IFlightCardProps) => {
  const { departureAirport, arrivalAirport, departureTime, arrivalTime, airplane } = flightInfo;

  return <Card className="flight-card">
    <CardContent>
      <Typography gutterBottom>
        Flight
      </Typography>
      <Typography className="depAirport">
        {departureAirport.name}
      </Typography>
      <Typography className="arrAirport">
        {arrivalAirport.name}
      </Typography>
      <Typography className="depTime">
        {departureTime}
      </Typography>
      <Typography className="arrTime">
        {arrivalTime}
      </Typography>
      <Typography className="airplane">
        {airplane.name}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Book</Button>
    </CardActions>
  </Card>;
};

export default FlightCard;
