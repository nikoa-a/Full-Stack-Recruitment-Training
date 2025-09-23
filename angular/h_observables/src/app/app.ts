import { Component } from '@angular/core';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  message: string = "";
  constructor(private obsservice: ObservableService) {}

  startObserving() {
    this.obsservice.getObservable().subscribe({
      next: (value) => {this.message = "Observable value " + value},
      error: (error) => {this.message = error},
      complete: () => {this.message = "Done"},
    })
  }
}
