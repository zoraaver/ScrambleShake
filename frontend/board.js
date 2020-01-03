document.addEventListener("DOMContentLoaded", (e) => {
    startGame(e, user1, user2)
});

const user1 = {score: 0};
const user2 = {score: 0};
let selectedTile = {selected: false, symbol: "", points: 0, id: 0};
let rowPlaced = false;
let columnPlaced = false;
const placedLetters = [];
let turnCount = 0;
const showButtons = Array.from(document.querySelectorAll(".show-letters"));
const resetButtons = Array.from(document.querySelectorAll(".reset-letters"));
const shuffleButtons = Array.from(document.querySelectorAll(".shuffle"));
const playWord = Array.from(document.querySelectorAll("button.submit"));
const endButton = document.querySelector("#end-game");

showButtons.forEach((s) => s.addEventListener('click', deckToggle));
resetButtons.forEach(r => r.addEventListener('click', resetBoard));
playWord.forEach(b => b.addEventListener('click', placeWord));
shuffleButtons.forEach(s => s.addEventListener('click', shuffle));
endButton.addEventListener('click', endGame);


function endGame() {
    const firstUserObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: player1.id,
            score: user1.score,
            winner: user1.score > user2.score
        })
    };

    const secondUserObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: player2.id,
            score: user2.score,
            winner: user2.score > user1.score
        })
    };

    
    fetch("http://localhost:3000/user_games", firstUserObj)
        .then(resp => resp.json())
        .then(console.log);


    fetch("http://localhost:3000/user_games", secondUserObj)
        .then(resp => resp.json())
        .then(console.log);
    location.reload();
}

function startGame(e, user1, user2) {
    letters = createLetterBag();
    placedLetters.length = 0;
    drawBoard();
    drawDecks(letters);
    playTurn();
}

function playTurn() {
    const decks = Array.from(document.querySelectorAll(".deck"));
    showButtons.forEach(s => s.innerText = "Show Letters");
    fillDecks();
    decks.forEach(d => d.className = "hidden");
    const firstScore = document.querySelector("#user-1-points");
    const secondScore = document.querySelector("#user-2-points");
    firstScore.innerText = "";
    secondScore.innerText = "";
    turnCount ++;
}

function drawBoard() {
    const boardExists = document.querySelector("div#board");
    if (boardExists) return;
    const board = document.createElement('div');
    board.id = "board";
    board.innerHTML = "";
    for(let i = 0; i < 225; i++) {
        const tile = document.createElement('div');

        tile.dataset.rowId = Math.floor(i/15) + 1;
        tile.dataset.columnId = i%15 + 1;

        const r = tile.dataset.rowId;
        const c = tile.dataset.columnId;

        if ((r == 1 || r == 8 || r == 15) && (c == 1 || c == 8 || c == 15) && !(c == 8 && r == 8)) { // triple word tiles
            tile.classList.add("triple-word");
            tile.innerText = "TRIPLE WORD";
        } 
        else if ((r == 2 || r == 6 || r == 10 || r == 14) && (c == 2 || c == 6 || c == 10 || c == 14) && // triple letter tiles
         !(r == 2 && c == 2) && !(r == 14 && c == 14) && !(r == 14 && c == 2) && !(r == 2 && c == 14))
        {
            tile.classList.add("triple-letter");
            tile.innerText = "TRIPLE LETTER";
        } 
        else if (((r == c) || (r == 16 - c)) && // double word tiles
        (((r > 1 && r < 6) || (r > 10 && r < 15)) && ((c > 1 && c < 6) || (c > 10 && c < 15))))
        {
            tile.classList.add("double-word");
            tile.innerText = "DOUBLE WORD";
        }
        // rest deal with double letters... no real pattern on board
        else if ((r == 4 || r == 12) && (c == 1 || c == 8 || c == 15)) 
        {
            tile.classList.add("double-letter");
            tile.innerText = "DOUBLE LETTER";
        }
        else if((r == 1 || r == 15) && (c == 4 || c == 12)) {
            tile.classList.add("double-letter");
            tile.innerText = "DOUBLE LETTER";
        }
        else if ((r == 7 || r == 9) && (c == 3 || c == 7 || c== 9 || c == 13))
        {
            tile.classList.add("double-letter");
            tile.innerText = "DOUBLE LETTER";
        }
        else if ((r == 8) && (c == 4 || c == 12))
        {
            tile.classList.add("double-letter");
            tile.innerText = "DOUBLE LETTER";
        }
        else if ((c == 7 || c == 9) &&(r == 3 || r == 13))
        {
            tile.classList.add("double-letter");
            tile.innerText = "DOUBLE LETTER";
        }
        else if (r == 8 && c == 8) // centre star tile
        {
            tile.classList.add("centre-star");
            tile.innerHTML = "<span>&#9733;</span>";
        }
        else {
            tile.classList.add("standard-tile");
        }

        tile.classList.add("empty");
        tile.addEventListener("click", placeTile);
        board.append(tile);
    }
    document.querySelector('#board-container').append(board);
} 

function shuffle() {
    if (turnCount === 1) return;
    if (parseInt(this.id.slice(7)) !== turnCount%2) return;
    resetBoard.call(this.nextElementSibling);
    const deck = turnCount%2 == 1? document.querySelector("div#user1-deck") : document.querySelector("div#user2-deck");
    const tilesToGoBack = Array.from(deck.children);

    tilesToGoBack.forEach(t => {
        letters.push({symbol: t.innerHTML[0], points: parseInt(t.innerHTML[7])});
        t.innerText = "";
        t.className = "removed";
    })
    playTurn();
}

function resetBoard() {
    
    if (turnCount%2 !== parseInt(this.id.slice(5))) return;
    for (let i = placedLetters.length - 1; i >= 0; i --) {
        const letter = placedLetters.splice(i, 1)[0];

        const tile = document.querySelector(`div[data-deck-id="${letter.deck_id}"]`);
        tile.innerText = letter.symbol;
        tile.className = "standard-tile";
        const pSpan = document.createElement("span");
        pSpan.innerText = letter.points;
        tile.append(pSpan);

        const originalTile = document.querySelector(`div[data-row-id='${letter.row}'][data-column-id="${letter.column}"]`);
        originalTile.className = letter.class;
        originalTile.innerText = letter.text;
    }
    rowPlaced = false;
    columnPlaced = false;
    updateScore();
}

function randomLetter(letters) {
    return Math.floor(Math.random() * letters.length);
}

function updateScore() {
    const score = calculateScore();
    const firstScore = document.querySelector("#user-1-points");
    const secondScore = document.querySelector("#user-2-points");

    if (turnCount%2 === 1) {
        firstScore.innerText = `Your word scores ${score} points`;
    } else {
        secondScore.innerText = `Your word scores ${score} points`;
    }
    
}

function deckToggle(e) {
    
    if (turnCount%2 !== parseInt(this.id.slice(4))) return;
    if (this.previousElementSibling.className == "hidden") {
        this.previousElementSibling.className = "deck";
        this.innerText = "Hide letters";
    } else {
        this.previousElementSibling.className = "hidden";
        this.innerText = "Show letters";
    }
}

function fourTiles(tileDiv) {
    const up = document.querySelector(`div[data-row-id="${parseInt(tileDiv.dataset.rowId) - 1}"][data-column-id="${parseInt(tileDiv.dataset.columnId)}"]`);
    const down = document.querySelector(`div[data-row-id="${parseInt(tileDiv.dataset.rowId) + 1}"][data-column-id="${parseInt(tileDiv.dataset.columnId)}"]`);
    const right = document.querySelector(`div[data-column-id="${parseInt(tileDiv.dataset.columnId) + 1}"][data-row-id="${parseInt(tileDiv.dataset.rowId)}"]`);
    const left = document.querySelector(`div[data-column-id="${parseInt(tileDiv.dataset.columnId) - 1}"][data-row-id="${parseInt(tileDiv.dataset.rowId)}"]`);
    const tiles = [up, down, left, right];
    
    return tiles;
}

function testSurroundingTiles(tiles) {
    [up, down, left, right] = tiles;

    if ((left && (left.className === "selected" || left.className === "placed")) ||
        (right && (right.className === "selected" || right.className === "placed")) ||
        (up && (up.className === "selected" ||  up.className === "placed")) ||
        (down && (down.className === "selected" || down.className === "placed")))
        return true;
    else return false;
}

function validMove(tileDiv) {
    
    if (placedLetters.length === 0){
        if (parseInt(tileDiv.dataset.rowId) === 8 && parseInt(tileDiv.dataset.columnId) === 8 && turnCount === 1) return true;
        else if (turnCount > 1 && testSurroundingTiles(fourTiles(tileDiv))) {
            const surroundingTiles = fourTiles(tileDiv);
            if (surroundingTiles[0].className === "placed" || surroundingTiles[1].className === "placed") columnPlaced = true;
            else [rowPlaced, columnPlaced] = [true, false];
            return true;
        }
    }
    
    if (!testSurroundingTiles(fourTiles(tileDiv))) return false;
    if (placedLetters.length === 1) {
        
        if (tileDiv.dataset.rowId === placedLetters[0].row) {
            rowPlaced = true;
            columnPlaced = false;
            return true;
        } else if (tileDiv.dataset.columnId === placedLetters[0].column) {
            columnPlaced = true;
            rowPlaced = false;
            return true;
        } else return false;
    } 
    else if (placedLetters.length > 1) {
        if (rowPlaced && tileDiv.dataset.rowId !== placedLetters[placedLetters.length - 1].row)
            return false;
        else if (columnPlaced && tileDiv.dataset.columnId !== placedLetters[placedLetters.length - 1].column)
            return false;
        else return true;
    }
}

function placeWord(e) {
    if (turnCount%2 !== parseInt(this.id.slice(4))) return;
    if (placedLetters.length === 0) return;
    const score = calculateScore();
    const move = Array.from(document.querySelectorAll("#board .selected"));
    move.forEach(m => m.className = "placed");
    selectedTile = {selected: false, symbol: "", points: 0, id: 0};
    rowPlaced = false;
    columnPlaced = false;
    placedLetters.length = 0;
    const totalScored = Array.from(document.querySelectorAll("tr"));
    
    if (turnCount%2 === 1) {
        user1.score += score;
        totalScored[0].innerText = `${player1.name}'s score: ${user1.score} points.`
    } else {
        user2.score += score;
        totalScored[1].innerText = `${player2.name}'s score: ${user2.score} points.`
    }

    playTurn();
}
function placeTile(e) {
    const previouslyPlaced = placedLetters.find(l => l.row == this.dataset.rowId && l.column == this.dataset.columnId);
    
    if (previouslyPlaced) return;
    if (this.className === "placed") return;
    if (!selectedTile.selected) return;
    if (!validMove(this)) return;
    

    placedLetters.push({class: this.className,
                        row: this.dataset.rowId,
                        column: this.dataset.columnId,
                        deck_id: selectedTile.id,
                        symbol: selectedTile.symbol,
                        points: selectedTile.points,
                        text: this.innerText
                    });

    this.innerText = selectedTile.symbol;
    this.className = "selected";
    const pointSpan = document.createElement("span");
    pointSpan.innerText = selectedTile.points;
    this.append(pointSpan);

    const old = document.querySelector(`div[data-deck-id="${selectedTile.id}"]`);
    old.innerText = "";
    old.classList.remove("selected");
    old.classList.add("removed");
    selectedTile.selected = false;
    updateScore();
}

function tileScore(tileDiv, score, m, axis = true) {
    if (!tileDiv) return;
    const tilePoints = parseInt(tileDiv.innerText.slice(1));
    
    if (tileDiv.className === "selected") { 
        const p = placedLetters.find(l => l.row == tileDiv.dataset.rowId && l.column == tileDiv.dataset.columnId);
        const type = p.class;

        if (axis) score.axis_points += tilePoints;
        else score.off_axis_points += tilePoints*m;

        if (type === "triple-letter empty"){
            if (axis) score.axis_points += 2*tilePoints;
            else score.off_axis_points += 2*tilePoints;
        }
        else if (type === "double-letter empty") {
            if (axis) score.axis_points += tilePoints;
            else score.off_axis_points += tilePoints;
        }
        else if (type === "double-word empty") {
            if (axis) score.double_word_count += 1;
        }
        else if (type === "triple-word empty") {
            if (axis) score.triple_word_count += 1;
        }

    } else if (tileDiv.className === "placed") {
        if (axis) score.axis_points += tilePoints;
        else score.off_axis_points += tilePoints*m;
    }
}

function calculateScore() {
    
    const axis_score = {triple_word_count: 0, double_word_count: 0, axis_points: 0, off_axis_points: 0};
    if (placedLetters.length === 0) return 0;

    const l = placedLetters[0];
    let f = document.querySelector(`div[data-row-id="${parseInt(l.row)}"][data-column-id="${parseInt(l.column)}"]`)
    
    let i = rowPlaced? parseInt(l.column) - 1 : parseInt(l.row) - 1;

    while(f && (f.className === "selected" || f.className === "placed")) { // iterate through tiles to left of first placed tile
        
        if (rowPlaced)
            f = document.querySelector(`div[data-row-id="${l.row}"][data-column-id="${i}"]`);
        else 
            f = document.querySelector(`div[data-row-id="${i}"][data-column-id="${l.column}"]`);
        
        if (f && f.className === "selected") {
            let g = f;
            let j = parseInt(rowPlaced? f.dataset.rowId : f.dataset.columnId);
            let offTiles = 0;

            const temp = placedLetters.find(l => l.row === f.dataset.rowId && l.column === f.dataset.columnId);
            let m;

            if (temp.class === "triple-word empty") m = 3;
            else if (temp.class === "double-word empty") m = 2;
            else m = 1;
            
            while (g && (g.className === "selected" || g.className === "placed")) { 
                j--;
                if (!rowPlaced)
                    g = document.querySelector(`div[data-row-id="${i}"][data-column-id="${j}"]`);
                else 
                    g = document.querySelector(`div[data-row-id="${j}"][data-column-id="${i}"]`);
                tileScore(g, axis_score, m, false);
                offTiles++;
            }

            g = f;
            j = parseInt(rowPlaced? f.dataset.rowId : f.dataset.columnId);

            while (g && (g.className === "selected" || g.className === "placed")) {
                j++;
                if (!rowPlaced)
                    g = document.querySelector(`div[data-row-id="${i}"][data-column-id="${j}"]`);
                else {
                    g = document.querySelector(`div[data-row-id="${j}"][data-column-id="${i}"]`);
                }
                tileScore(g, axis_score, m, false)
                offTiles++;
            }

            if (offTiles > 2) tileScore(f, axis_score, m, false);
        }
        tileScore(f, axis_score, 1);
        i--;
    }

    f = document.querySelector(`div[data-row-id="${l.row}"][data-column-id="${parseInt(l.column)}"]`)
    i = rowPlaced? parseInt(l.column): parseInt(l.row);
    
    while(f && (f.className === "selected" || f.className === "placed")) { // iterate through tiles to right of first placed tile
        
        if (rowPlaced)
            f = document.querySelector(`div[data-row-id="${l.row}"][data-column-id="${i}"]`);
        else {
            f = document.querySelector(`div[data-row-id="${i}"][data-column-id="${l.column}"]`);
        }


        if (f && f.className === "selected") {
            let g = f;
            let j = parseInt(rowPlaced? f.dataset.rowId : f.dataset.columnId);
            let offTiles = 0;

            const temp = placedLetters.find(l => l.row === f.dataset.rowId && l.column === f.dataset.columnId);
            let m;

            if (temp.class === "triple-word empty") m = 3;
            else if (temp.class === "double-word empty") m = 2;
            else m = 1;
            
            while (g && (g.className === "selected" || g.className === "placed")) { 
                j--;
                if (!rowPlaced)
                    g = document.querySelector(`div[data-row-id="${i}"][data-column-id="${j}"]`);
                else 
                    g = document.querySelector(`div[data-row-id="${j}"][data-column-id="${i}"]`);
                tileScore(g, axis_score, m, false);
                offTiles++;
            
            }

            g = f;
            j = parseInt(rowPlaced? f.dataset.rowId : f.dataset.columnId);

            while (g && (g.className === "selected" || g.className === "placed")) {
                j++;
                if (!rowPlaced)
                    g = document.querySelector(`div[data-row-id="${i}"][data-column-id="${j}"]`);
                else {
                    g = document.querySelector(`div[data-row-id="${j}"][data-column-id="${i}"]`);
                }
                tileScore(g, axis_score, m, false)
                offTiles++;

            }

            if (offTiles > 2) tileScore(f, axis_score, m, false);
        }
        tileScore(f, axis_score, 1)
        i++;
    }
    let score;
    if (axis_score.triple_word_count > 0) {
        score = axis_score.axis_points*3 + axis_score.off_axis_points;
    } else if (axis_score.double_word_count > 0) {
        score = axis_score.axis_points*2 + axis_score.off_axis_points;
    } else score = axis_score.axis_points + axis_score.off_axis_points;

    return score;
}

function fillDecks() {
    const removedTiles = Array.from(document.querySelectorAll(".removed"));
    removedTiles.forEach(tile => {
        const letter = letters.splice(randomLetter(letters), 1)[0];
        

        const pointSpan = document.createElement("span");
        pointSpan.innerText = letter.points;
        
        tile.innerText = letter.symbol;
        tile.classList.add("standard-tile");
        tile.classList.remove("removed");
        tile.append(pointSpan);
    })
}

function drawDecks(letters) {
    const decks = Array.from(document.querySelectorAll(".deck"));
    decks.forEach((d, index) => {
        d.innerHTML = "";
        for(let i = 0; i < 7; i++) {
            const letter = letters.splice(randomLetter(letters), 1)[0];

            const pointSpan = document.createElement("span");
            pointSpan.innerText = letter.points;

            const tile = document.createElement('div');
            tile.innerText = letter.symbol;
            tile.dataset.deckId = i + index*7 + 1;
            tile.append(pointSpan);
            tile.classList.add("standard-tile");
            tile.addEventListener('click', selectTile);
            d.append(tile);
        } 
    })
}

function selectTile(e) {
    
    if (this.className == "removed") return;
    const old = document.querySelector(`div[data-deck-id="${selectedTile.id}"]`);

    if (old && old.className !== "removed") {
        old.classList.remove("selected");
        old.classList.add("standard-tile");
        if (old.dataset.deckId == this.dataset.deckId){ 
           selectedTile = {selected: false, symbol: "", points: 0, id: 0};
           return;
        }
    }
    
    this.classList.remove("standard-tile")
    this.classList.add("selected");
    selectedTile.selected = true;
    selectedTile.symbol = this.innerText.charAt(0);
    selectedTile.points = parseInt(this.innerText.slice(1));
    selectedTile.id = this.dataset.deckId;
    
}

function createLetterBag() {
    const letters = [
        
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "A", points: 1},
        {symbol: "B", points: 3},
        {symbol: "B", points: 3},
        {symbol: "C", points: 3},
        {symbol: "C", points: 3},
        {symbol: "D", points: 2},
        {symbol: "D", points: 2},
        {symbol: "D", points: 2},
        {symbol: "D", points: 2},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "E", points: 1},
        {symbol: "F", points: 4},
        {symbol: "F", points: 4},
        {symbol: "G", points: 2},
        {symbol: "G", points: 2},
        {symbol: "G", points: 2},
        {symbol: "H", points: 4},
        {symbol: "H", points: 4},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "I", points: 1},
        {symbol: "J", points: 8},
        {symbol: "K", points: 5},
        {symbol: "L", points: 1},
        {symbol: "L", points: 1},
        {symbol: "L", points: 1},
        {symbol: "L", points: 1},
        {symbol: "M", points: 3},
        {symbol: "M", points: 3},
        {symbol: "N", points: 1},
        {symbol: "N", points: 1},
        {symbol: "N", points: 1},
        {symbol: "N", points: 1},
        {symbol: "N", points: 1},
        {symbol: "N", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "O", points: 1},
        {symbol: "P", points: 3},
        {symbol: "P", points: 3},
        {symbol: "Q", points: 10},
        {symbol: "R", points: 1},
        {symbol: "R", points: 1},
        {symbol: "R", points: 1},
        {symbol: "R", points: 1},
        {symbol: "R", points: 1},
        {symbol: "R", points: 1},
        {symbol: "S", points: 1},
        {symbol: "S", points: 1},
        {symbol: "S", points: 1},
        {symbol: "S", points: 1},
        {symbol: "T", points: 1},
        {symbol: "T", points: 1},
        {symbol: "T", points: 1},
        {symbol: "T", points: 1},
        {symbol: "T", points: 1},
        {symbol: "T", points: 1},
        {symbol: "U", points: 1},
        {symbol: "U", points: 1},
        {symbol: "U", points: 1},
        {symbol: "U", points: 1},
        {symbol: "V", points: 4},
        {symbol: "V", points: 4},
        {symbol: "W", points: 4},
        {symbol: "W", points: 4},
        {symbol: "X", points: 8},
        {symbol: "Y", points: 4},
        {symbol: "Y", points: 4},
        {symbol: "Z", points: 10},
        {symbol: "*", points: 0},
        {symbol: "*", points: 0}
        
    ];
    return letters;
}

