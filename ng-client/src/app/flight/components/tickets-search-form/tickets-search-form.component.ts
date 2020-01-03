import { Component } from '@angular/core';
import { Input } from '@angular/core';
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

  @Input() autocompleteField;
  @Input() autocompleteOptions;
  @Input() formType;

  @Output() flightType = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() searchAirport = new EventEmitter();

  onFlightTypeChange() {
    this.flightType.emit();
  }

  onAirportInputChange(field: string, value: string) {
    this.searchAirport.emit({ field, value });
  }

  onSearchClick() {
    this.search.emit({
      arrivalAirport: this.arrivalAirport.value,
      departureAirport: this.departureAirport.value,
    });
  }
}
