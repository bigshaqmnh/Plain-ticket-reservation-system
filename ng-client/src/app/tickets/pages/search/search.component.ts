import { Component } from '@angular/core';

import { AirportService } from '../../shared/airport.service';

@Component({
  template: `<app-presentation *ngIf="data" [data]="data"></app-presentation>`
})
export class SearchPageComponent {
  constructor(protected airportService: AirportService) {}

  search(searchData) {
    console.log('SEARCH DATA: ', searchData);
  }
}
