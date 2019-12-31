import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tickets-search-form',
  styleUrls: ['./tickets-search-form.component.scss'],
  templateUrl: './tickets-search-form.component.html',
})
export class TicketsSearchFormComponent {
  private departureAirport = new FormControl('');
  private arrivalAirport = new FormControl('');

  @Output() search = new EventEmitter();
  onSearchClick() {
    this.search.emit({
      arrivalAirport: this.arrivalAirport,
      departureAirport: this.departureAirport,
    });
  }

}
