import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { SearchPageComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: SearchPageComponent },
  ] },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class FlightRoutingModule { }
