document.addEventListener("DOMContentLoaded", () => {
    drawBoard();
    drawDecks();
});

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
        board.append(tile);
    }
    document.querySelector('#board-container').append(board);
} 

function drawDecks() {
    const decks = Array.from(document.querySelectorAll(".deck"));
    decks.forEach(d => {
        for(let i = 0; i < 7; i++) {
            const tile = document.createElement('div');
            d.append(tile);
            tile.classList.add("standard-tile");
        }
        
    })
}

