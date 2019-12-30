function drawBoard() {
    const board = document.createElement('div');
    board.id = "board";
    
    for(let i = 0; i < 225; i++) {
        const tile = document.createElement('div');
        //tile.classList.add("tile");
        tile.classList.add("grid-item");
        tile.innerText = i;
        board.append(tile);
    }
    document.querySelector('body').append(board);
}   

drawBoard();