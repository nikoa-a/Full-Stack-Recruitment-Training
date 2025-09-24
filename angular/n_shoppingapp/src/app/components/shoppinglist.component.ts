import { Component, OnInit } from "@angular/core";
import { ShoppingItem } from "../models/shoppingitem.model";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ShoppingService } from "../services/shopping.service";
import { LoginService } from "../services/login.service";

@Component({
  selector: "shopping-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./shoppinglist.component.html"
})
export class ShoppingList implements OnInit {
  list: ShoppingItem[] = [];

  constructor(private shopping: ShoppingService, private login: LoginService, private router: Router) {}

  ngOnInit() {
    if(this.login.isUserLogged()) {
      this.getList();
    } else {
      this.router.navigate(["/"]);
    }
  }

  getList() {
    this.shopping.getList().subscribe({
      next: (data) => this.list = data,
      error: (error) => {
        if(error.status === 403) {
          this.login.setLoginState(false, "");
          this.router.navigate(["/"]);
        } else {
          console.log(error)
        }
      },
      complete: () => console.log("done")
    })
  }

  removeItem(id: number) {
    this.shopping.removeItem(id).subscribe({
      next: (data) => this.getList(),
      error: (error) => {
        if(error.status === 403) {
          this.login.setLoginState(false, "");
          this.router.navigate(["/"]);
        } else {
          console.log(error)
        }
      },
      complete: () => console.log("done")
    })
  }
}