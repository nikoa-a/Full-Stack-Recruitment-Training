import { Component } from '@angular/core';
import { CapitalizePipe } from './capitalize.pipe';

@Component({
  selector: 'app-root',
  imports: [CapitalizePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
