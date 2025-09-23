import { Component } from '@angular/core';
import { ContactList } from './components/contactlist.component';

@Component({
  selector: 'app-root',
  imports: [ContactList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
