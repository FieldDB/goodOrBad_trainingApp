import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: '<h1>Good or Bad: {{title}}</h1>'
})

export class AppComponent {
	title = 'Plz display me!!!';
}