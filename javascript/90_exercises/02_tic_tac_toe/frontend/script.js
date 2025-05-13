let turn = 'X';

const winPatterns = [
    ['0', '1', '2'],
    ['0', '3', '6'],
    ['0', '4', '8'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['2', '4', '6'],
    ['3', '4', '5'],
    ['6', '7', '8']
];

function clicked(id) {
    document.getElementById(id).textContent = turn;
    checkWinner();
    if(turn == 'X') {
        turn = 'O';
    } else if (turn == 'O') {
        turn = 'X';
    }
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1Val = document.getElementById([pattern[0]])
        let pos2Val = document.getElementById([pattern[1]])
        let pos3Val = document.getElementById([pattern[2]])

        console.log(pos1Val, pos2Val, pos3Val); 

        if (pos1Val !== "" && pos2Val!=="" && pos3Val!=="" 
            && pos1Val === pos2Val && pos2Val === pos3Val) {
            alert(turn + " WON!");
            return;
        }
    }
    console.log("No winner yet.")
}