import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class FlightService {
  private airports;

  constructor(http: HttpClient) {
    const url = `${environment.apiUrl}/airports`;

    http.get(url).subscribe(res => {
      this.airports = res;
    });
  }

  findFlights(params) {
    // params =
    // arrivalAirport,
    // arrivalDate,
    // departureAirport,
    // departureDate,
    // numberOfAdults,
    // numberOfChildren,
    // twoWays
  }

  findFlightsForComplexRoute(params) {

  }

  getAirports(amount: number) {
    return this.airports.slice(0, amount);
  }
}
