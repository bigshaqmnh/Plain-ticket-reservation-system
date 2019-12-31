import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { TicketsSearchFormComponent } from './components/TicketsSearchForm/TicketsSearchForm.component';

const routes: Routes = [
  { path: '', component: TicketsSearchFormComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
