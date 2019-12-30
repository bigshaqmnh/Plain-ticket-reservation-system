import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpMockRequestInterceptor } from './helpers/HttpMockRequestInterceptor';

import { environment } from '../environments/environment';

const isMock = environment.mock;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? HttpMockRequestInterceptor : null,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
