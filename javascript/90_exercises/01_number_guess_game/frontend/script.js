let guesses;
let number;
let closestHigh;
let closestLow;

window.onload = function() {
    guesses = 0;
    number = Math.floor(Math.random() * 100);
}

function guess() {
    guessedNumber = document.getElementById("guessedNumber").value;

    if(guessedNumber <= closestLow || guessedNumber >= closestHigh) {
        document.getElementById("hint").textContent = "Can't guess that!";
        return;
    }

    if(guessedNumber < 1 || guessedNumber > 100) {
        document.getElementById("hint").textContent = "Can't guess that!";
        return;
    }

    guesses += 1;
    document.getElementById("guessAmount").textContent = "Guesses: " + guesses;

    if(guessedNumber > number) {
        document.getElementById("hint").textContent = "Lower!";
        closestHigh = guessedNumber;
    } else if (guessedNumber < number) {
        document.getElementById("hint").textContent = "Higher!";
        closestLow = guessedNumber;
    } else if (guessedNumber == number) {
        alert("CORRECT! The number was: " + number + ". Guesses: " + guesses);
    }
}

function reset() {
    window.location.reload();
}
