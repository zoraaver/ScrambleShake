
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("#submit-user");
    
    startButton.addEventListener('click', startGame);
    
    function startGame(e) {
        e.preventDefault();
        const login = document.querySelector("#sign-in-form");
        login.remove();

        startButton.classList.add("hidden");
        const gamePage = document.querySelector("#game-page");
        gamePage.classList.remove("hidden");

        const name1 = document.querySelector('#player1-name');
        name1.innerText = `Player 1: ${player1.name}`;

        const name2 = document.querySelector('#player2-name');
        name2.innerText = `Player 2: ${player2.name}`;
    }
})
