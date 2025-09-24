import { Component } from "@angular/core";
import { GameMechanics } from "../services/gamemechanics.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Score } from "../models/score.model";
import { WinCondition } from "../models/wincondition.model";

@Component({
  selector: "game-screen",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./gamescreen.component.html"
})
export class GameScreen {
  public guesses: number;
  public currentGuess: number;
  public currentHigh: number;
  public currentLow: number;
  public message: string;

  constructor(private game: GameMechanics, private router: Router) {
    this.guesses = 0;
    this.currentLow = 1;
    this.currentHigh = 100;
    this.currentGuess = 0;
    this.message = "Please enter a number between 1 and 100";
  }

  guess() {
    if(Number.isNaN(this.currentGuess)) {
      this.message = "Please enter a number";
      return;
    }
    if(this.currentGuess > this.currentHigh) {
      this.message = "Your guess was above the current maximum. Try again";
      return;
    }
    if(this.currentGuess < this.currentLow) {
      this.message = "Your guess was below the current minimum. Try again";
    }
    let temp: WinCondition = this.game.runGame(this.currentGuess);
    if(temp.type === "low") {
      this.message = "Your guess was too low. Low limit is now " + this.currentGuess + ". Guess again";
      this.guesses = temp.guesses;
      this.currentLow = this.currentGuess;
      this.currentGuess = 0;
    }
    if(temp.type === "high") {
      this.message = "Your guess was too high. High limit is now " + this.currentGuess + ". Guess again";
      this.guesses = temp.guesses;
      this.currentHigh = this.currentGuess;
      this.currentGuess = 0;
    }
    if(temp.type === "win") {
      alert("Congrats! You win in " + temp.guesses + " guesses")
      this.guesses = 0;
      this.currentLow = 1;
      this.currentHigh = 100;
      this.message = "Please enter a number between 1 and 100";
      this.router.navigate(["/start"]);
    }
  }
}