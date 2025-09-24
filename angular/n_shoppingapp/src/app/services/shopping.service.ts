import { Injectable } from "@angular/core";
import { ShoppingItem } from "../models/shoppingitem.model";
import { LoginService } from "./login.service";
import { BackendMessage } from "../models/backendmessage.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ShoppingService {
  constructor(private http: HttpClient, private login: LoginService) {}

  getList() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "token": this.login.getToken()
      })
    }
    return this.http.get<ShoppingItem[]>("/api/shopping", httpOptions);
  }

  addItem(item: ShoppingItem) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "token": this.login.getToken()
      })
    }
    return this.http.post<ShoppingItem[]>("/api/shopping", item, httpOptions);
  }

  removeItem(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "token": this.login.getToken()
      })
    }
    return this.http.delete<ShoppingItem[]>("/api/shopping"+id, httpOptions);
  }
}