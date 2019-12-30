function drawBoard() {
    const board = document.createElement('div');
    board.id = "board";
    
    for(let i = 0; i < 225; i++) {
        const tile = document.createElement('div');

        
        tile.classList.add("empty");
        tile.dataset.rowId = Math.floor(i/15) + 1;
        tile.dataset.columnId = i%15 + 1;

        const r = tile.dataset.rowId;
        const c = tile.dataset.columnId;

        if((r == 1 || r == 8 || r == 15) && (c == 1 || c == 8 || c == 15) && !(c == 8 && r == 8)) { //triple word tiles
            tile.classList.add("triple-word");
            tile.innerText = "TRIPLE WORD"
        } else {
            tile.classList.add("standard-tile");
        }

        board.append(tile);
    }
    document.querySelector('body').append(board);
}   

drawBoard();