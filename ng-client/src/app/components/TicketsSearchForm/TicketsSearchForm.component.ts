import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tickets-search-form',
  templateUrl: './TicketsSearchForm.component.html',
  styleUrls: ['./TicketsSearchForm.component.scss']
})
export class TicketsSearchFormComponent {
  departureAirport = new FormControl('');
  arrivalAirport = new FormControl('');
}
