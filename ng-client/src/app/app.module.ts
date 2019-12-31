import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketsSearchFormComponent } from './components/TicketsSearchForm/TicketsSearchForm.component';
import { HttpMockRequestInterceptor } from './helpers/HttpMockRequestInterceptor';

import { environment } from '../environments/environment';

const isMock = environment.mock;

const materialUIComponents = [
  MatFormFieldModule,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    TicketsSearchFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...materialUIComponents,
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? HttpMockRequestInterceptor : null,
    },
  ],
})
export class AppModule { }
