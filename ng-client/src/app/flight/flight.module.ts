import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { TicketsSearchFormComponent } from './components/tickets-search-form/tickets-search-form.component';
import { FlightRoutingModule } from './flight-routing.module';
import { SearchPageComponent } from './pages/search/search.component';
import { FlightService } from './shared/flight.service';

const materialUIComponents = [
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
];

@NgModule({
  declarations: [
    SearchPageComponent,
    TicketsSearchFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FlightRoutingModule,
    ...materialUIComponents,
  ],
  providers: [
    FlightService
  ],
})
export class FlightModule { }
