/// <reference path="../../node.ts"/>
import * as flight from 'flight';
import * as URL from 'url';
const myUrl = URL.parse('http://www.typescriptlang.org');

import { Component } from '@angular/core';

import { FlightService } from '../../shared/flight.service';

@Component({
  selector: 'app-search-page',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
})
export class SearchPageComponent {
  private flightData = {};
  private flightType = flight.FlightTypes.ONE_WAY;

  constructor(protected flightService: FlightService) {}

  search(params) {
    const flightsData = this.flightService.findFlights(params);
  }

  searchAirport(field, value) {
    console.log('SEARCH AIRPORT: ', field, value);
  }

}
