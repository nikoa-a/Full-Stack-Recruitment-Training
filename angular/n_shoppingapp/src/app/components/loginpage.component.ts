import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";
import { FormsModule } from "@angular/forms";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "login-page",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./loginpage.component.html",
  styleUrl: "./loginpage.component.css"
})
export class LoginPage implements OnInit {
  user: User = new User("", "");
  message: string = "";

  constructor(private login: LoginService, private router: Router) {}

  ngOnInit() {
    if(this.login.isUserLogged()) {
      this.router.navigate(["/list"]);
    }
  }

  register() {
    this.login.register(this.user).subscribe({
      next: (data) => this.message = data.message,
      error: (error) => {
        if(error.status === 409) {
          this.message = "Username already in use"
        } else {
          this.message = error.message
        }
      },
      complete: () => console.log("Register done")
    })
  }

  onLogin() {
    this.login.login(this.user).subscribe({
      next: (data) => {
        this.message = "Login success",
        this.login.setLoginState(true, data.token),
        this.router.navigate(["/list"])
      },
      error: (error) => {
        this.message = error.message
      },
      complete: () => console.log("Login done")
    })
  }
}