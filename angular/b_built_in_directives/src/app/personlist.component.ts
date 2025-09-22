import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "person-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./personlist.component.html"
})

export class PersonList {
  list = [
    {
      "firstname": "Sebastian",
      "lastname": "Lamb"
    },
    {
      "firstname": "Kennedy",
      "lastname": "Martinez"
    },
    {
      "firstname": "Alfonso",
      "lastname": "Blackburn"
    },
    {
      "firstname": "Abigail",
      "lastname": "Cantu"
    },
    {
      "firstname": "Noah",
      "lastname": "Mccullough"
    },
    {
      "firstname": "Tatyana",
      "lastname": "Cash"
    },
    {
      "firstname": "Sawyer",
      "lastname": "Ellis"
    },
    {
      "firstname": "Keelie",
      "lastname": "Daniel"
    },
    {
      "firstname": "Caryn",
      "lastname": "Mclean"
    },
    {
      "firstname": "Summer",
      "lastname": "Gregory"
    },
    {
      "firstname": "Audrey",
      "lastname": "Graham"
    },
    {
      "firstname": "Paul",
      "lastname": "Cervantes"
    },
    {
      "firstname": "Avram",
      "lastname": "Nash"
    },
    {
      "firstname": "Martina",
      "lastname": "Grant"
    },
    {
      "firstname": "Leroy",
      "lastname": "Talley"
    },
    {
      "firstname": "Yvette",
      "lastname": "Barry"
    },
    {
      "firstname": "Brooke",
      "lastname": "Roach"
    },
    {
      "firstname": "Abigail",
      "lastname": "Houston"
    },
    {
      "firstname": "Athena",
      "lastname": "Conner"
    },
    {
      "firstname": "Vernon",
      "lastname": "Sweeney"
    },
    {
      "firstname": "Demetria",
      "lastname": "Cooley"
    },
    {
      "firstname": "Shafira",
      "lastname": "Harris"
    },
    {
      "firstname": "Levi",
      "lastname": "Calhoun"
    },
    {
      "firstname": "Fletcher",
      "lastname": "Bartlett"
    },
    {
      "firstname": "Iola",
      "lastname": "Buckner"
    },
    {
      "firstname": "Alexandra",
      "lastname": "Henson"
    },
    {
      "firstname": "Vivien",
      "lastname": "Myers"
    },
    {
      "firstname": "Martha",
      "lastname": "Reid"
    },
    {
      "firstname": "Wallace",
      "lastname": "Noel"
    },
    {
      "firstname": "Leo",
      "lastname": "Stone"
    },
    {
      "firstname": "Silas",
      "lastname": "Campbell"
    },
    {
      "firstname": "Hayfa",
      "lastname": "Charles"
    },
    {
      "firstname": "Colton",
      "lastname": "William"
    },
    {
      "firstname": "Sopoline",
      "lastname": "Callahan"
    },
    {
      "firstname": "Laith",
      "lastname": "Cooley"
    },
    {
      "firstname": "Avram",
      "lastname": "Bentley"
    },
    {
      "firstname": "Stone",
      "lastname": "Mueller"
    },
    {
      "firstname": "Derek",
      "lastname": "Medina"
    },
    {
      "firstname": "Hammett",
      "lastname": "Winters"
    },
    {
      "firstname": "Dennis",
      "lastname": "Webb"
    },
    {
      "firstname": "Halee",
      "lastname": "Bishop"
    },
    {
      "firstname": "Miriam",
      "lastname": "Buckley"
    },
    {
      "firstname": "Kieran",
      "lastname": "Wilcox"
    },
    {
      "firstname": "Troy",
      "lastname": "Ashley"
    },
    {
      "firstname": "Lacota",
      "lastname": "Duke"
    },
    {
      "firstname": "Leilani",
      "lastname": "Campbell"
    },
    {
      "firstname": "Veronica",
      "lastname": "Mcpherson"
    },
    {
      "firstname": "Heather",
      "lastname": "Preston"
    },
    {
      "firstname": "Coby",
      "lastname": "Best"
    },
    {
      "firstname": "Brett",
      "lastname": "Glenn"
    },
    {
      "firstname": "Salvador",
      "lastname": "Welch"
    },
    {
      "firstname": "Kyla",
      "lastname": "Petty"
    },
    {
      "firstname": "Gabriel",
      "lastname": "Carter"
    },
    {
      "firstname": "Graiden",
      "lastname": "Ayers"
    },
    {
      "firstname": "Germane",
      "lastname": "Booker"
    },
    {
      "firstname": "Brenna",
      "lastname": "Hicks"
    },
    {
      "firstname": "Burton",
      "lastname": "Schroeder"
    },
    {
      "firstname": "William",
      "lastname": "Landry"
    },
    {
      "firstname": "Christen",
      "lastname": "Beach"
    },
    {
      "firstname": "Boris",
      "lastname": "Castaneda"
    },
    {
      "firstname": "Selma",
      "lastname": "Valencia"
    },
    {
      "firstname": "Erasmus",
      "lastname": "Jarvis"
    },
    {
      "firstname": "Patricia",
      "lastname": "Carroll"
    },
    {
      "firstname": "Shad",
      "lastname": "Daniels"
    },
    {
      "firstname": "Dora",
      "lastname": "Peck"
    },
    {
      "firstname": "Sean",
      "lastname": "Mcbride"
    },
    {
      "firstname": "Hilel",
      "lastname": "Bradford"
    },
    {
      "firstname": "Kane",
      "lastname": "Vang"
    },
    {
      "firstname": "Madeline",
      "lastname": "Pollard"
    },
    {
      "firstname": "Yuli",
      "lastname": "David"
    },
    {
      "firstname": "Brett",
      "lastname": "Silva"
    },
    {
      "firstname": "Nathaniel",
      "lastname": "Alvarado"
    },
    {
      "firstname": "Yasir",
      "lastname": "Preston"
    },
    {
      "firstname": "Bianca",
      "lastname": "Mooney"
    },
    {
      "firstname": "Caesar",
      "lastname": "Warren"
    },
    {
      "firstname": "Sydney",
      "lastname": "Bender"
    },
    {
      "firstname": "Dominic",
      "lastname": "Tyson"
    },
    {
      "firstname": "Vladimir",
      "lastname": "Newman"
    },
    {
      "firstname": "Karina",
      "lastname": "Zamora"
    },
    {
      "firstname": "Noelani",
      "lastname": "Pacheco"
    },
    {
      "firstname": "Mercedes",
      "lastname": "Johnston"
    },
    {
      "firstname": "Randall",
      "lastname": "Ward"
    },
    {
      "firstname": "Kennan",
      "lastname": "Ratliff"
    },
    {
      "firstname": "Walter",
      "lastname": "Ball"
    },
    {
      "firstname": "Hammett",
      "lastname": "Dickerson"
    },
    {
      "firstname": "Regina",
      "lastname": "Miranda"
    },
    {
      "firstname": "Ria",
      "lastname": "Merritt"
    },
    {
      "firstname": "Elaine",
      "lastname": "Willis"
    },
    {
      "firstname": "Ava",
      "lastname": "Irwin"
    },
    {
      "firstname": "Velma",
      "lastname": "Harper"
    },
    {
      "firstname": "Daryl",
      "lastname": "Morton"
    },
    {
      "firstname": "Ralph",
      "lastname": "Owen"
    },
    {
      "firstname": "Colt",
      "lastname": "Reyes"
    },
    {
      "firstname": "Kellie",
      "lastname": "Barton"
    },
    {
      "firstname": "Madeline",
      "lastname": "Rollins"
    },
    {
      "firstname": "Kiayada",
      "lastname": "Monroe"
    },
    {
      "firstname": "Hillary",
      "lastname": "Mullins"
    },
    {
      "firstname": "Jack",
      "lastname": "Waller"
    },
    {
      "firstname": "Myles",
      "lastname": "Holland"
    },
    {
      "firstname": "Sylvia",
      "lastname": "Gonzalez"
    }
  ]
}