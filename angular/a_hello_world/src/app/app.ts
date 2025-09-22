import { Component } from '@angular/core';
import { HelloWorld } from './helloworld.component';

@Component({
  selector: 'app-root',
  imports: [HelloWorld],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
