import { Component } from '@angular/core';
import { Conditional } from './conditional.component';
import { PersonList } from './personlist.component';

@Component({
  selector: 'app-root',
  imports: [Conditional, PersonList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

}
