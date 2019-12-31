import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { TicketsSearchFormComponent } from './components/tickets-search-form/tickets-search-form.component';
import { SearchPageComponent } from './pages/search/search.component';
import { AirportService } from './shared/airport.service';
import { TicketsRoutingModule } from './tickets-routing.module';

const materialUIComponents = [
  MatFormFieldModule,
];

@NgModule({
  declarations: [
    SearchPageComponent,
    TicketsRoutingModule,
    TicketsSearchFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ...materialUIComponents,
  ],
  providers: [
    AirportService
  ],
})
export class AppModule { }
