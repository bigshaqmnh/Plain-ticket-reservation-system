import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1>
      Page not found.
      <h1>
        <button routerLink="">
          Go home
        </button>
      </h1>
    </h1>
  `
})
export class NotFoundComponent {}
