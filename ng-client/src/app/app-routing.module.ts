import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsSearchFormComponent } from './components/TicketsSearchForm/TicketsSearchForm.component';

const routes: Routes = [
  { path: '', component: TicketsSearchFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
