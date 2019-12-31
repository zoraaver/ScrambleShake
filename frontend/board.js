document.addEventListener("DOMContentLoaded", startGame);
let selectedTile = {selected: false, symbol: "", points: 0, id: 0};
const placedLetters = [];

function startGame(e, user1, user2) {
    const letters = createLetterBag();
    drawBoard();
    drawDecks(letters);
}

function drawBoard() {
    const board = document.createElement('div');
    board.id = "board";
    
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

function randomLetter(letters) {
    return Math.floor(Math.random() * letters.length);
}

function placeTile(e) {
    const previouslyPlaced = placedLetters.find(l => l.row == this.dataset.rowId && l.column == this.dataset.columnId);

    if (previouslyPlaced) {
        console.log(previouslyPlaced);
        const deckTile = document.querySelector(`div[data-deck-id="${previouslyPlaced.deck_id}"]`);
        deckTile.innerText = previouslyPlaced.symbol;
        const pointsSpan = document.createElement("span");
        pointsSpan.innerText = previouslyPlaced.points;
        deckTile.append(pointsSpan)
        deckTile.className = "standard-tile";
        this.className = previouslyPlaced.class;
        this.innerText = previouslyPlaced.text;
        placedLetters.splice(placedLetters.findIndex(e => e == previouslyPlaced), 1);
        return;
    }
    if (!selectedTile.selected) return;
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
    console.log(old);
    console.log(selectedTile);
    selectedTile.selected = false;
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
            tile.innerText = letter.sybmol;
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

    if (old && old.dataset.deckId == this.dataset.deckId) {
        old.classList.remove("selected");
        old.classList.add("standard-tile");
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
        
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "A", points: 1},
        {sybmol: "B", points: 3},
        {sybmol: "B", points: 3},
        {sybmol: "C", points: 3},
        {sybmol: "C", points: 3},
        {sybmol: "D", points: 2},
        {sybmol: "D", points: 2},
        {sybmol: "D", points: 2},
        {sybmol: "D", points: 2},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "E", points: 1},
        {sybmol: "F", points: 4},
        {sybmol: "F", points: 4},
        {sybmol: "G", points: 2},
        {sybmol: "G", points: 2},
        {sybmol: "G", points: 2},
        {sybmol: "H", points: 4},
        {sybmol: "H", points: 4},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "I", points: 1},
        {sybmol: "J", points: 8},
        {sybmol: "K", points: 5},
        {sybmol: "L", points: 1},
        {sybmol: "L", points: 1},
        {sybmol: "L", points: 1},
        {sybmol: "L", points: 1},
        {sybmol: "M", points: 3},
        {sybmol: "M", points: 3},
        {sybmol: "N", points: 1},
        {sybmol: "N", points: 1},
        {sybmol: "N", points: 1},
        {sybmol: "N", points: 1},
        {sybmol: "N", points: 1},
        {sybmol: "N", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "O", points: 1},
        {sybmol: "P", points: 3},
        {sybmol: "P", points: 3},
        {sybmol: "Q", points: 10},
        {sybmol: "R", points: 1},
        {sybmol: "R", points: 1},
        {sybmol: "R", points: 1},
        {sybmol: "R", points: 1},
        {sybmol: "R", points: 1},
        {sybmol: "R", points: 1},
        {sybmol: "S", points: 1},
        {sybmol: "S", points: 1},
        {sybmol: "S", points: 1},
        {sybmol: "S", points: 1},
        {sybmol: "T", points: 1},
        {sybmol: "T", points: 1},
        {sybmol: "T", points: 1},
        {sybmol: "T", points: 1},
        {sybmol: "T", points: 1},
        {sybmol: "T", points: 1},
        {sybmol: "U", points: 1},
        {sybmol: "U", points: 1},
        {sybmol: "U", points: 1},
        {sybmol: "U", points: 1},
        {sybmol: "V", points: 4},
        {sybmol: "V", points: 4},
        {sybmol: "W", points: 4},
        {sybmol: "W", points: 4},
        {sybmol: "X", points: 8},
        {sybmol: "Y", points: 4},
        {sybmol: "Y", points: 4},
        {sybmol: "Z", points: 10},
        {sybmol: "", points: 0},
        {sybmol: "", points: 0}
        
    ];
    return letters;
}

