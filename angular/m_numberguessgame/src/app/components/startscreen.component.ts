import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GameMechanics } from "../services/gamemechanics.service";
import { Router } from "@angular/router";
import { Score } from "../models/score.model";

@Component({
  selector: "start-screen",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./startscreen.component.html"
})
export class StartScreen implements OnInit {
  public name: string = "";
  public topList: Score[] = [];

  constructor(private game: GameMechanics, private router: Router) {}

  ngOnInit() {
    let temp = localStorage.getItem("toplist");
    if(temp) {
      this.topList = JSON.parse(temp);
    }
  }

  startGame() {
    if(!this.name) {
      return;
    }
    this.game.startGame(this.name);
    this.name = "";
    this.router.navigate(["/game"]);
  }
}