import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-menu",
  standalone: true,
  templateUrl: "./menu.component.html"
})
export class AppMenu {
  @HostListener('click', ['$event.target'])
  onClick(target: any) {
    console.log("Menu clicked item " + target.id)
  }
}